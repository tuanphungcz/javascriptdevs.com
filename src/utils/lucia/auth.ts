"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_REDIRECT_COOKIE } from "@/constants";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { lucia, validateRequest } from "./lucia";
import { authProviders } from "./providers";

interface LoginOptions {
  provider: keyof typeof authProviders;
  redirectTo?: string;
}

export const login = async ({ provider, redirectTo }: LoginOptions) => {
  if (!provider || !(provider in authProviders)) {
    throw new Error("Invalid OAuth Provider");
  }

  const cookiesStore = await cookies();

  if (redirectTo) {
    cookiesStore.set(AUTH_REDIRECT_COOKIE, redirectTo, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
  }

  const url = await authProviders[provider].createAuthorizationURL({
    scopes:
      provider === "google"
        ? ["profile", "email"]
        : provider === "github"
          ? ["user:email"]
          : undefined,
  });

  redirect(url);
};

export const logout = async (): Promise<ActionResult> => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const cookiesStore = await cookies();

  const sessionCookie = lucia.createBlankSessionCookie();
  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return {
    error: null,
  };
};

interface ActionResult {
  error: string | null;
}

export const signUp = async (values: {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}) => {
  const payload = await getPayloadHMR({ config });

  const cookiesStore = await cookies();

  try {
    let existingUser;

    const { docs } = await payload.find({
      collection: "users",
      where: {
        or: [
          {
            email: {
              equals: values.email,
            },
          },
          {
            username: {
              equals: values.username,
            },
          },
        ],
      },
    });

    existingUser = docs?.at(0) || null;

    if (existingUser) {
      return {
        error: "User already exists",
      };
    }

    const newProfile = await payload.create({
      collection: "profiles",
      data: {},
    });

    const user = await payload.create({
      collection: "users",
      data: {
        email: values.email,
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        provider: "email",
        password: values.password,
        profile: newProfile.id,
      },
    });

    await payload.update({
      collection: "profiles",
      id: newProfile.id,
      data: {
        user: user.id,
      },
    });

    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        userId: user.id,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: { email: string; password: string }) => {
  const payload = await getPayloadHMR({ config });

  try {
    let existingUser;

    const { docs } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: values.email,
        },
      },
    });

    existingUser = docs?.at(0) || null;

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL!}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      },
    );
    const data = await response.json();

    if (data?.errors) {
      throw new Error("Invalid credentials");
    }

    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookiesStore = await cookies();

    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: "Logged in successfully",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    const cookiesStore = await cookies();

    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

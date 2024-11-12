import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { fetchJson } from "@/utils/fetchJson";
import { generateCodeVerifier, generateState, GitHub, Google } from "arctic";
import { User } from "payload";

const callbackUrl = (provider: keyof typeof authProviders): string => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/${provider}`;
};

const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  callbackUrl("google"),
);

const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  {
    redirectURI: callbackUrl("github"),
  },
);

export const authProviders = {
  google: {
    cookieName: "google_oauth_state",
    createAuthorizationURL: async (options?: any) => {
      const state = generateState();
      const codeVerifier = generateCodeVerifier();
      const url = await google.createAuthorizationURL(
        state,
        codeVerifier,
        options,
      );
      const cookiesStore = await cookies();
      cookiesStore.set(authProviders.google.cookieName, state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      });

      cookiesStore.set("codeVerifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      });

      return url.toString();
    },
    exchangeCodeForUser: async (
      request: NextRequest,
    ): Promise<{
      data: Pick<User, "provider" | "providerAccountId" | "metadata">;
      email: string;
    }> => {
      const code = request.nextUrl.searchParams.get("code");
      if (!code) throw new Error("Authorization code not found.");

      const cookiesStore = await cookies();

      const codeVerifier = cookiesStore.get("codeVerifier")?.value ?? "";

      try {
        const tokens = await google.validateAuthorizationCode(
          code,
          codeVerifier,
        );

        const googleUser = await fetchJson(
          "https://openidconnect.googleapis.com/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );

        return {
          data: {
            provider: "google",
            providerAccountId: String(googleUser.sub),
            metadata: googleUser,
          },
          email: googleUser.email,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to validate authorization code.");
      }
    },
  },
  github: {
    cookieName: "github_oauth_state",
    createAuthorizationURL: async (options?: any) => {
      const state = generateState();
      const url = await github.createAuthorizationURL(state, options);
      const cookiesStore = await cookies();
      cookiesStore.set(authProviders.github.cookieName, state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      });

      return url.toString();
    },
    exchangeCodeForUser: async (
      request: NextRequest,
    ): Promise<{
      data: Pick<User, "provider" | "providerAccountId" | "metadata">;
      email: string;
    }> => {
      const code = request.nextUrl.searchParams.get("code");
      if (!code) throw new Error("Authorization code not found.");

      try {
        const tokens = await github.validateAuthorizationCode(code);

        const githubUser = await fetchJson("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });

        const githubEmail = await fetchJson(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );

        const primaryEmail = githubEmail.find(
          (email: any) => email.primary,
        )?.email;

        return {
          data: {
            provider: "github",
            providerAccountId: String(githubUser.id),
            metadata: githubUser,
          },
          email: primaryEmail || githubUser.email,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to validate authorization code.");
      }
    },
  },
};

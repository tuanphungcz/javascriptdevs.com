import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { AUTH_REDIRECT_COOKIE } from "@/constants";
import { lucia } from "@/utils/lucia/lucia";
import { authProviders } from "@/utils/lucia/providers";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { OAuth2RequestError } from "arctic";

type Params = Promise<{ provider: keyof typeof authProviders }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
): Promise<Response> {
  const { provider } = await params;
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookiesStore = await cookies();
  const storedState =
    cookiesStore.get(authProviders[provider].cookieName)?.value ?? null;
  const providerConfig = authProviders[provider] ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
      statusText: "Invalid OAuth State...",
    });
  }

  try {
    const payload = await getPayloadHMR({ config });

    const userData = await providerConfig.exchangeCodeForUser(request);

    const { data, email } = userData;

    let user;

    const { docs } = await payload.find({
      collection: "users",
      where: {
        and: [
          {
            provider: {
              equals: data.provider,
            },
          },
          {
            providerAccountId: {
              equals: data.providerAccountId,
            },
          },
        ],
      },
    });

    user = docs?.at(0) || null;

    if (user) {
      const updatedUser = await payload.update({
        collection: "users",
        id: user.id,
        data: {
          email: email,
          /** @ts-ignore */
          firstName: data.metadata.name.split(" ")[0],
          lastName: data.metadata.name.split(" ").slice(1).join(" "),
          username: data.metadata.login,
          metadata: data.metadata,
        },
      });

      user = updatedUser;
    } else {
      const avatarResponse = await fetch(data.metadata.avatar_url);
      const avatarBuffer = await avatarResponse.arrayBuffer();
      const avatarBufferObject = Buffer.from(avatarBuffer);

      const avatar = await payload.create({
        collection: "media",
        data: {
          title: `${data.metadata.name}'s avatar`,
        },
        file: {
          data: avatarBufferObject,
          name: `avatar-${data.metadata.name}-image.jpg`,
          mimetype: "image/jpeg",
          size: avatarBufferObject.byteLength,
        },
      });

      const newProfile = await payload.create({
        collection: "profiles",
        data: {
          description: data.metadata.bio,
          content: "",
          githubUrl: data.metadata.html_url,
          linkedinUrl: data.metadata.linkedin,
          twitterUrl: data.metadata.twitter,
          websiteUrl: data.metadata.website,
        },
      });

      user = await payload.create({
        collection: "users",
        data: {
          email: email,
          password: crypto.randomUUID(),
          firstName: data.metadata.name.split(" ")[0],
          lastName: data.metadata.name.split(" ").slice(1).join(" "),
          avatar: avatar.id,
          provider: data.provider,
          providerAccountId: data.providerAccountId,
          metadata: data.metadata,
          username: data.metadata.login,
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
    }

    if (!user) {
      throw new Error("Failed to create or update user...");
    }

    //ignored, because payload incorrectly types the update operation as a bulk update, even when it's a single update
    /** @ts-ignore */
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    const redirectTo = cookiesStore.get(AUTH_REDIRECT_COOKIE)?.value ?? null;
    cookiesStore.delete(AUTH_REDIRECT_COOKIE);

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectTo ? decodeURIComponent(redirectTo) : "/",
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

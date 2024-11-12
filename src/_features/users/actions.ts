"use server";

import { cache } from "react";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import { getPayload } from "@/utils/payload";

import { validateRequest } from "../../utils/lucia/lucia";

export const getUsers = cache(async () => {
  const payload = await getPayload();

  return await payload.find({
    collection: "users",
  });
});

export const getUserBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload();

  return await payload.find({
    collection: "users",
    where: {
      username: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });
});

export const getCurrentUser = cache(async () => {
  const payload = await getPayload();
  const { user, session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await payload.find({
    collection: "users",
    where: {
      email: {
        equals: user.email,
      },
    },
    limit: 1,
    depth: 2,
  });
});

export const updateUserTimezone = async ({
  timezone,
  timezoneOffset,
}: {
  timezone: string;
  timezoneOffset: string;
}) => {
  const payload = await getPayload();
  const { user, session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        timezone,
        timezoneOffset,
      },
    });
  } catch (error) {
    console.error("Failed to update user timezone:", error);
  }
};

interface FormData {
  firstName: string;
  lastName: string;
}

export const updateUser = async (formData: FormData) => {
  try {
    const payload = await getPayload();
    const { user, session } = await validateRequest();

    const { firstName, lastName } = formData;

    if (!session) {
      throw new Error("Unauthorized");
    }

    await payload.update({
      collection: "users",
      where: {
        id: { equals: user.id },
      },
      data: {
        firstName,
        lastName,
      },
    });

    revalidateTag("users");
    revalidatePath("/profiles");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

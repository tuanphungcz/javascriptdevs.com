"use server";

import { cache } from "react";
import { revalidatePath, revalidateTag } from "next/cache";

import { validateRequest } from "@/utils/lucia/lucia";
import { getPayload } from "@/utils/payload";

interface FormData {
  content: string;
  linkedinUrl?: string;
  githubUrl?: string;
  // careerStartYear: number;
  categories: string[];
  // hourlyRate: number;
  twitterUrl?: string;
  websiteUrl?: string;
  description?: string;
}

export const updateProfile = async (formData: FormData) => {
  try {
    const payload = await getPayload();
    const { user, session } = await validateRequest();

    const {
      content,
      categories: categoryIds = [],
      // careerStartYear,
      // hourlyRate,
      githubUrl,
      linkedinUrl,
      description,
      twitterUrl,
      websiteUrl,
    } = formData;

    if (!session) {
      throw new Error("Unauthorized");
    }

    const profile = await payload.find({
      collection: "profiles",
      where: {
        user: { equals: user.id },
      },
    });

    if (!profile.docs.length) {
      throw new Error("Profile not found");
    }

    await payload.update({
      collection: "profiles",
      where: {
        user: { equals: user.id },
      },
      data: {
        categories: categoryIds,
        description,
        content,
        // careerStartYear,
        // hourlyRate,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        websiteUrl,
      },
    });

    revalidatePath("/profile/edit");
    revalidatePath("/profiles");

    revalidateTag("users");

    // revalidatePath(`/profile/${user.username}`)
    revalidatePath(`/`);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getProfilesCategories = cache(async () => {
  const payload = await getPayload();

  return await payload.find({
    collection: "profilesCategories",
    where: {
      subcategory: {
        in: ["role", "searchStatus", "openTo", "timeCapacity", "technology"],
      },
    },
    limit: 100,
  });
});

export const getProfiles = cache(async () => {
  const payload = await getPayload();

  return await payload.find({
    collection: "profiles",
  });
});

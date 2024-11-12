import {
  initProfileCategories,
  initProfiles,
} from "@/_features/profiles/initData";
import { Payload } from "payload";

export const seedProfiles = async (payload: Payload) => {
  const profilesCategories = await Promise.all(
    initProfileCategories.map(async (category) => {
      return await payload.create({
        collection: "profilesCategories",
        data: category,
      });
    }),
  );

  const technologyCategories = profilesCategories.filter(
    (userCategory) => userCategory.subcategory === "technology",
  );

  const profiles = await Promise.all(
    initProfiles.map(async (user, index) => {
      return await payload.create({
        collection: "profiles",
        data: {
          ...user,
          categories: [technologyCategories[index].id],
        },
      });
    }),
  );

  const { docs: users } = await payload.find({
    collection: "users",
    limit: 1,
  });

  await Promise.all(
    users.map(async (user, index) => {
      await payload.update({
        collection: "users",
        id: user.id,
        data: {
          profile: profiles[index].id,
        },
      });
    }),
  );
};

import fs from "fs";
import path from "path";

import { initUsers } from "@/_features/globals/initData";
import { Payload } from "payload";

export const seedGlobal = async (payload: Payload) => {
  console.log("Creating site settings...");
  await payload.updateGlobal({
    slug: "settings",
    data: {
      homepage: {
        title: "Payload Tailwind Blog Starter",
        description: "This is a blog starter built with PayloadCMS",
      },
      navbar: {
        title: "Payload Tailwind Blog Starter",
      },
      footer: {
        text: "© 2024 Payload Tailwind Blog Starter",
      },
      socials: {
        github: "https://github.com/tuanphungcz/payloadcms-blog",
        twitter: "https://github.com/tuanphungcz/payloadcms-blog",
        linkedin: "https://github.com/tuanphungcz/payloadcms-blog",
      },
      seo: {
        metaTitle: "Payload Tailwind Blog Starter",
        metaDescription: "This is a starter blog built with PayloadCMS",
      },
    },
  });

  const userImagePaths = [
    path.join(
      process.cwd(),
      "src",
      "_features",
      "globals",
      "media",
      "user-01-avatar.jpg",
    ),
    path.join(
      process.cwd(),
      "src",
      "_features",
      "globals",
      "media",
      "user-02-avatar.jpg",
    ),
    path.join(
      process.cwd(),
      "src",
      "_features",
      "globals",
      "media",
      "user-03-avatar.jpg",
    ),
    path.join(
      process.cwd(),
      "src",
      "_features",
      "globals",
      "media",
      "user-04-avatar.jpg",
    ),
  ];

  const userImages = await Promise.all(
    userImagePaths.map(async (imagePath, index) => {
      const fileBuffer = fs.readFileSync(imagePath);
      return await payload.create({
        collection: "media",
        data: {
          title: `User ${index + 1} Avatar`,
        },
        file: {
          data: fileBuffer,
          name: `user-0${index + 1}-avatar.jpg`,
          mimetype: "image/jpeg",
          size: fileBuffer.byteLength,
        },
      });
    }),
  );

  await Promise.all(
    initUsers.map(
      async (user, index) =>
        await payload.create({
          collection: "users",
          data: {
            ...user,
            avatar: userImages[index].id,
          },
        }),
    ),
  );
};

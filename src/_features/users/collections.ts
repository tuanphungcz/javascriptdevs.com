import { CollectionConfig } from "payload";

const User: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "firstName",
      type: "text",
      saveToJWT: true,
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "username",
      type: "text",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media", // required
      required: false,
    },
    {
      name: "provider",
      type: "text",
    },
    {
      name: "providerAccountId",
      type: "text",
    },
    {
      name: "metadata",
      type: "json",
    },
    {
      name: "timezone",
      type: "text",
    },
    {
      name: "timezoneOffset",
      type: "text",
    },

    {
      name: "role",
      type: "select",
      options: ["admin", "user"],
      saveToJWT: true,
    },

    {
      name: "stripeCustomerId",
      type: "text",
    },
    {
      name: "profile",
      type: "relationship",
      relationTo: "profiles",
      hasMany: false,
    },
  ],
};

export const UsersCollections = [User];

import { isAdmin, isAnyone } from "@/utils/access";
import { formatSlug } from "@/utils/helpers";
import { CollectionConfig } from "payload";

const Profiles: CollectionConfig = {
  slug: "profiles",
  fields: [
    {
      name: "description",
      type: "text",
    },
    {
      name: "content",
      type: "textarea",
    },
    {
      name: "githubUrl",
      type: "text",
    },
    {
      name: "twitterUrl",
      type: "text",
    },
    {
      name: "linkedinUrl",
      type: "text",
    },
    {
      name: "websiteUrl",
      type: "text",
    },
    {
      name: "careerStartYear",
      type: "number",
    },
    {
      name: "hourlyRate",
      type: "number",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "profilesCategories",
      hasMany: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },
  ],
};

const ProfilesCategories: CollectionConfig = {
  slug: "profilesCategories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "subcategory",
      type: "text",
      required: true,
    },
    {
      name: "label",
      type: "text",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
    },
  ],
};

export const ProfilesCollections = [Profiles, ProfilesCategories];

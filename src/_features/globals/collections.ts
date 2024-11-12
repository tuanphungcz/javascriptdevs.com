import { isAdmin, isAnyone } from "@/utils/access";
import { addContentHashToFile } from "@/utils/addContentHashToFile";
import { handleSvgUpload } from "@/utils/handleSvgUpload";
import { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
    ],
    adminThumbnail: ({ doc: media }) =>
      (media?.sizes as any)?.thumbnail?.url || media.url,
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeOperation: [addContentHashToFile],
    afterChange: [handleSvgUpload],
  },
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        style: { display: "none" },
        readOnly: true,
      },
    },
    {
      name: "rawContent",
      type: "textarea",
      admin: {
        disabled: true,
        readOnly: true,
      },
    },
  ],
};

const Session: CollectionConfig = {
  slug: "session",
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      index: true,
      unique: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
    },
  ],
};

export const GlobalsCollections = [Media, Session];

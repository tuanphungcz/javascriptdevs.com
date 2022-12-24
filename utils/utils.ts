import type { Site } from "@prisma/client";
import slugify from "slugify";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getSiteBySlug = (slug: string, sites: Site[]) => {
  if (!sites) return "";

  return sites.find(
    (site: Site) => slugify(stripUrl(site.websiteUrl)) === slug
  );
};

export const getGithubUsername = (url: string | null) => {
  if (!url) return "";
  const match = url.match(/github\.com\/([^/]+)\/?/);
  return match && match[1];
};

export const getKeys = (sites: Site[]) => {
  const object: {
    [key: string]: string;
  } = {};

  if (sites.length > 0) {
    for (const item of sites) {
      if (
        item?.category &&
        !object[item.category] &&
        item?.category?.length > 0
      ) {
        object[item.category] = item.category;
      }
    }
  }

  return Object.keys(object);
};

export const stripUrl = (url: string | null) => {
  if (!url) {
    return "";
  }
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace("www.", "");
};

export const mainTechSlugs = [
  // "html",
  // "css",
  // "frontend",
  // "fullstack",
  // "backend",
  "react",
  "javascript",
  "typescript",
  "react native",
  "tailwind",
  "angular",
];


export const sanitize = (text: string) => {
  const re = new RegExp(/[-[\]{}@()!=*+?.,\\^$|#\s]/, "g");
  return text.replace(re, "\\$&");
};
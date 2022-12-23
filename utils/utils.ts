import slugify from "slugify";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getBlogBySlug = (slug: string, blogs: any) => {
  if (!blogs) return null;

  return blogs.find(
    (blog: any) => slugify(stripUrl(blog.websiteUrl)) === slug
  ) as any;
};

export const getGithubUsername = (url: string) => {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/?/);
  return match && match[1];
};

export const getKeys = (dataset: any) => {
  const object: {
    [key: string]: string;
  } = {};

  if (dataset.length > 0) {
    for (const item of dataset) {
      if (!object[item.category] && item?.category?.length > 0) {
        object[item.category] = item.category;
      }
    }
  }

  return Object.keys(object);
};

export const stripUrl = (url: any) => {
  if (!url) {
    return null;
  }
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace("www.", "");
};

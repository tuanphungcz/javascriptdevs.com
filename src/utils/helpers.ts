import type { ClassValue } from "clsx";

import { APP_URL } from "@/constants";
import { clsx } from "clsx";
import { FieldHook } from "payload";
import { twMerge } from "tailwind-merge";

export const formatOptions = (obj: Record<string, string>) =>
  Object.entries(obj).map(([key, value]) => ({ value: key, label: value }));

export const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-/]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string") {
      return format(value);
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }

    return value;
  };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    // .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
    .replace(/\./g, "-"); // replace periods with hyphens
  return str;
}

export const slugifyHeading = (str: string) => `heading-${slugify(str)}`;

export const stripUrl = (url: string | null) => {
  if (!url) {
    return "";
  }
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace("www.", "");
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getOgImageUrl = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const ogImageUrl = new URL(`${APP_URL}/api/og`);
  ogImageUrl.searchParams.append("title", title);
  ogImageUrl.searchParams.append("description", description);

  return ogImageUrl.toString();
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertToTitleCase = (value: string) => {
  // First, split the string at uppercase letters
  const words = value.split(/(?=[A-Z])/).map((word) => word.toLowerCase());

  // Then capitalize the first letter of each word and join them
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getCategoryOptions = ({ subcategory, categories }: any) => {
  return categories
    .filter((category: any) => category.subcategory === subcategory)
    .sort((a: any, b: any) => a.name.localeCompare(b.name))
    .map((category: any) => ({
      label: category.label || convertToTitleCase(category.name),
      value: category.id.toString(),
    }));
};

export const truncateString = (
  str: string,
  maxLength: number = 150,
): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
};

export const getReturnUrl = () => {
  return isBrowser()
    ? [window.location.origin, window.location.pathname].join("")
    : "/";
};
export const isBrowser = () => {
  return typeof window !== "undefined";
};

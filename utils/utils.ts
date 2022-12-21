import slugify from "slugify";
import { BlogType } from "../types/types";
import supabase from "./supabase";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getBlogBySlug = async (slug: string) => {
  const { data: blogs } = await supabase.from("blogs").select("*");

  if (!blogs) return null;

  return blogs.find(
    (blog: BlogType) =>
      slugify(blog.website_url.replace(/^https:\/\/|\/$/g, "")) === slug
  );
};

export const getGithubUsername = (url: string) => {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/?/);
  return match && match[1];
};

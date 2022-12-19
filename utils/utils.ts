import slugify from "slugify";
import { BlogType } from "../types/supabase";
import supabase from "./supabase";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getBlogBySlug = async (slug: string) => {
  const { data: blogs } = await supabase.from("blogs").select("*");

  if (!blogs) return null;

  return blogs.find(
    (blog: BlogType) => slugify(blog.name.toLowerCase()) === slug
  );
};

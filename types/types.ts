import { Database } from "./supabase";

export type BlogType = Database["public"]["Tables"]["blogs"]["Row"];

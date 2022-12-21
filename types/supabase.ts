export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          website_url: string;
          name: string;
          github_url: string;
          id: number;
          created_at: string | null;
          image_url: string | null;
        };
        Insert: {
          website_url: string;
          name: string;
          github_url: string;
          id: number;
          created_at?: string | null;
          image_url?: string | null;
        };
        Update: {
          website_url?: string;
          name?: string;
          github_url?: string;
          id?: number;
          created_at?: string | null;
          image_url?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America";
    };
  };
}

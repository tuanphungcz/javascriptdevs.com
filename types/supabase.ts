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
          websiteUrl: string;
          name: string;
          githubUrl: string;
          id: number;
          created_at: string | null;
          imageUrl: string | null;
        };
        Insert: {
          websiteUrl: string;
          name: string;
          githubUrl: string;
          id: number;
          created_at?: string | null;
          imageUrl?: string | null;
        };
        Update: {
          websiteUrl?: string;
          name?: string;
          githubUrl?: string;
          id?: number;
          created_at?: string | null;
          imageUrl?: string | null;
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

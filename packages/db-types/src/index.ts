// Auto-generated types from Supabase schema
// Project: hzanbozezpvivsclkspg
// Regenerate with: npx supabase gen types typescript --project-id hzanbozezpvivsclkspg > packages/db-types/src/index.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      sites: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          claim: string | null;
          genre: string | null;
          location: string | null;
          email: string | null;
          founded_year: number | null;
          description: string | null;
          accent_color: string | null;
          hero_image_url: string | null;
          og_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["sites"]["Row"], "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["sites"]["Insert"]>;
      };

      site_admins: {
        Row: {
          id: string;
          site_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["site_admins"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["site_admins"]["Insert"]>;
      };

      pages: {
        Row: {
          id: string;
          site_id: string;
          slug: string;
          title: string | null;
          description: string | null;
          hero_image_url: string | null;
          content: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pages"]["Row"], "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["pages"]["Insert"]>;
      };

      events: {
        Row: {
          id: string;
          site_id: string;
          date: string;           // ISO date string "YYYY-MM-DD"
          event_name: string;
          venue: string | null;
          location: string | null;
          event_type: string | null;
          visible: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };

      media_videos: {
        Row: {
          id: string;
          site_id: string;
          youtube_id: string;
          title: string;
          description: string | null;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["media_videos"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["media_videos"]["Insert"]>;
      };

      media_images: {
        Row: {
          id: string;
          site_id: string;
          src: string;
          alt: string | null;
          credit: string | null;
          position: number;
          category: string | null; // e.g. 'hero', 'gallery', 'about', 'carousel'
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["media_images"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["media_images"]["Insert"]>;
      };

      products: {
        Row: {
          id: string;
          site_id: string;
          title: string;
          description: string | null;
          price: string | null;
          features: string[] | null;
          visible: boolean;
          position: number;
          image_url: string | null;
          category: string | null; // e.g. 'service', 'merch', 'cd'
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };

      referenzen: {
        Row: {
          id: string;
          site_id: string;
          client_name: string;
          event_type: string | null;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["referenzen"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["referenzen"]["Insert"]>;
      };

      besetzung_gruppen: {
        Row: {
          id: string;
          site_id: string;
          name: string;
          subtitle: string | null;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["besetzung_gruppen"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["besetzung_gruppen"]["Insert"]>;
      };

      besetzung_eintraege: {
        Row: {
          id: string;
          gruppe_id: string;
          name: string;
          lineup: string;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["besetzung_eintraege"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["besetzung_eintraege"]["Insert"]>;
      };

      social_links: {
        Row: {
          id: string;
          site_id: string;
          platform: string;
          url: string;
          handle: string | null;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["social_links"]["Row"], "id" | "created_at"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["social_links"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// Convenience row types
export type Site           = Database["public"]["Tables"]["sites"]["Row"];
export type SiteAdmin      = Database["public"]["Tables"]["site_admins"]["Row"];
export type Page           = Database["public"]["Tables"]["pages"]["Row"];
export type Event          = Database["public"]["Tables"]["events"]["Row"];
export type MediaVideo     = Database["public"]["Tables"]["media_videos"]["Row"];
export type MediaImage     = Database["public"]["Tables"]["media_images"]["Row"];
export type Product        = Database["public"]["Tables"]["products"]["Row"];
export type Referenz       = Database["public"]["Tables"]["referenzen"]["Row"];
export type BesetzungGruppe = Database["public"]["Tables"]["besetzung_gruppen"]["Row"];
export type BesetzungEintrag = Database["public"]["Tables"]["besetzung_eintraege"]["Row"];
export type SocialLink     = Database["public"]["Tables"]["social_links"]["Row"];

// Extended types with relations
export type BesetzungGruppeWithEintraege = BesetzungGruppe & {
  besetzung_eintraege: BesetzungEintrag[];
};

// Auto-generated types from Supabase schema
// Project: hzanbozezpvivsclkspg (VMP-Bands)
// Last synced: 2026-06-06

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
          domain: string | null;
          logo_url: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["sites"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["sites"]["Insert"]>;
      };

      site_admins: {
        Row: {
          site_id: string;
          user_id: string;
          role: "editor" | "admin" | null;
        };
        Insert: Database["public"]["Tables"]["site_admins"]["Row"];
        Update: Partial<Database["public"]["Tables"]["site_admins"]["Insert"]>;
      };

      pages: {
        Row: {
          id: string;
          site_id: string | null;
          slug: string;
          content: Json;
          updated_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["pages"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["pages"]["Insert"]>;
      };

      events: {
        Row: {
          id: string;
          site_id: string | null;
          name: string;
          date: string;           // ISO date "YYYY-MM-DD"
          location: string | null;
          link: string | null;
          visible: boolean | null;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };

      media_videos: {
        Row: {
          id: string;
          site_id: string | null;
          title: string | null;
          youtube_url: string;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["media_videos"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["media_videos"]["Insert"]>;
      };

      media_images: {
        Row: {
          id: string;
          site_id: string | null;
          url: string;
          caption: string | null;
          credit: string | null;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["media_images"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["media_images"]["Insert"]>;
      };

      products: {
        Row: {
          id: string;
          site_id: string | null;
          name: string;
          description: string | null;
          price: string | null;
          image_url: string | null;
          image_url_back: string | null;
          tag: string | null;
          subtitle: string | null;
          email_subject: string | null;
          position: number | null;
          visible: boolean | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };

      referenzen: {
        Row: {
          id: string;
          site_id: string | null;
          name: string;
          type: string | null;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["referenzen"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["referenzen"]["Insert"]>;
      };

      besetzung_gruppen: {
        Row: {
          id: string;
          site_id: string | null;
          name: string;
          beschreibung: string | null;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["besetzung_gruppen"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["besetzung_gruppen"]["Insert"]>;
      };

      besetzung_eintraege: {
        Row: {
          id: string;
          gruppe_id: string | null;
          name: string;
          beschreibung: string | null;
          position: number | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["besetzung_eintraege"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["besetzung_eintraege"]["Insert"]>;
      };

      social_links: {
        Row: {
          id: string;
          site_id: string | null;
          platform: "instagram" | "facebook" | "youtube" | "spotify" | "tiktok";
          url: string;
          position: number | null;
        };
        Insert: Omit<Database["public"]["Tables"]["social_links"]["Row"], "id"> & { id?: string };
        Update: Partial<Database["public"]["Tables"]["social_links"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// Convenience row types
export type Site                 = Database["public"]["Tables"]["sites"]["Row"];
export type SiteAdmin            = Database["public"]["Tables"]["site_admins"]["Row"];
export type Page                 = Database["public"]["Tables"]["pages"]["Row"];
export type Event                = Database["public"]["Tables"]["events"]["Row"];
export type MediaVideo           = Database["public"]["Tables"]["media_videos"]["Row"];
export type MediaImage           = Database["public"]["Tables"]["media_images"]["Row"];
export type Product              = Database["public"]["Tables"]["products"]["Row"];
export type Referenz             = Database["public"]["Tables"]["referenzen"]["Row"];
export type BesetzungGruppe      = Database["public"]["Tables"]["besetzung_gruppen"]["Row"];
export type BesetzungEintrag     = Database["public"]["Tables"]["besetzung_eintraege"]["Row"];
export type SocialLink           = Database["public"]["Tables"]["social_links"]["Row"];

// Extended types with relations
export type BesetzungGruppeWithEintraege = BesetzungGruppe & {
  besetzung_eintraege: BesetzungEintrag[];
};

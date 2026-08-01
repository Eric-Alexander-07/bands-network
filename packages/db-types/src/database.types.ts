/**
 * Aus dem Supabase-Schema generiert (Projekt hzanbozezpvivsclkspg "VMP-Bands").
 *
 * NICHT von Hand bearbeiten. Nach Schemaaenderungen neu erzeugen:
 *   supabase gen types typescript --project-id hzanbozezpvivsclkspg
 *
 * Handgeschriebene Typen fuehren hier zu subtilen Problemen: supabase-js
 * verlangt je Tabelle ein `Relationships`-Tupel und den Block
 * `__InternalSupabase`; fehlt etwas davon, faellt die Typinferenz stillschweigend
 * auf `never` zurueck (was frueher die vielen `// @ts-nocheck` noetig machte).
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type SiteFk<N extends string> = [
  {
    foreignKeyName: N;
    columns: ["site_id"];
    isOneToOne: false;
    referencedRelation: "sites";
    referencedColumns: ["id"];
  },
];

type GruppeFk<N extends string, R extends string> = [
  {
    foreignKeyName: N;
    columns: ["gruppe_id"];
    isOneToOne: false;
    referencedRelation: R;
    referencedColumns: ["id"];
  },
];

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.5" };
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
        Insert: {
          id?: string;
          slug: string;
          name: string;
          domain?: string | null;
          logo_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          domain?: string | null;
          logo_url?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      site_admins: {
        Row: { site_id: string; user_id: string; role: string | null };
        Insert: { site_id: string; user_id: string; role?: string | null };
        Update: { site_id?: string; user_id?: string; role?: string | null };
        Relationships: SiteFk<"site_admins_site_id_fkey">;
      };
      pages: {
        Row: { id: string; site_id: string | null; slug: string; content: Json; updated_at: string | null };
        Insert: { id?: string; site_id?: string | null; slug: string; content?: Json; updated_at?: string | null };
        Update: { id?: string; site_id?: string | null; slug?: string; content?: Json; updated_at?: string | null };
        Relationships: SiteFk<"pages_site_id_fkey">;
      };
      events: {
        Row: {
          id: string; site_id: string | null; name: string; date: string;
          location: string | null; link: string | null; visible: boolean | null;
          position: number | null; created_at: string | null;
        };
        Insert: {
          id?: string; site_id?: string | null; name: string; date: string;
          location?: string | null; link?: string | null; visible?: boolean | null;
          position?: number | null; created_at?: string | null;
        };
        Update: {
          id?: string; site_id?: string | null; name?: string; date?: string;
          location?: string | null; link?: string | null; visible?: boolean | null;
          position?: number | null; created_at?: string | null;
        };
        Relationships: SiteFk<"events_site_id_fkey">;
      };
      media_videos: {
        Row: { id: string; site_id: string | null; title: string | null; youtube_url: string; position: number | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; title?: string | null; youtube_url: string; position?: number | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; title?: string | null; youtube_url?: string; position?: number | null; created_at?: string | null };
        Relationships: SiteFk<"media_videos_site_id_fkey">;
      };
      media_images: {
        Row: { id: string; site_id: string | null; url: string; caption: string | null; credit: string | null; position: number | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; url: string; caption?: string | null; credit?: string | null; position?: number | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; url?: string; caption?: string | null; credit?: string | null; position?: number | null; created_at?: string | null };
        Relationships: SiteFk<"media_images_site_id_fkey">;
      };
      products: {
        Row: {
          id: string; site_id: string | null; name: string; description: string | null;
          price: string | null; image_url: string | null; image_url_back: string | null;
          tag: string | null; subtitle: string | null; email_subject: string | null;
          position: number | null; visible: boolean | null; created_at: string | null;
        };
        Insert: {
          id?: string; site_id?: string | null; name: string; description?: string | null;
          price?: string | null; image_url?: string | null; image_url_back?: string | null;
          tag?: string | null; subtitle?: string | null; email_subject?: string | null;
          position?: number | null; visible?: boolean | null; created_at?: string | null;
        };
        Update: {
          id?: string; site_id?: string | null; name?: string; description?: string | null;
          price?: string | null; image_url?: string | null; image_url_back?: string | null;
          tag?: string | null; subtitle?: string | null; email_subject?: string | null;
          position?: number | null; visible?: boolean | null; created_at?: string | null;
        };
        Relationships: SiteFk<"products_site_id_fkey">;
      };
      referenzen: {
        Row: { id: string; site_id: string | null; name: string; type: string | null; position: number | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; name: string; type?: string | null; position?: number | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; name?: string; type?: string | null; position?: number | null; created_at?: string | null };
        Relationships: SiteFk<"referenzen_site_id_fkey">;
      };
      besetzung_gruppen: {
        Row: { id: string; site_id: string | null; name: string; beschreibung: string | null; position: number | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; name: string; beschreibung?: string | null; position?: number | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; name?: string; beschreibung?: string | null; position?: number | null; created_at?: string | null };
        Relationships: SiteFk<"besetzung_gruppen_site_id_fkey">;
      };
      besetzung_eintraege: {
        Row: { id: string; gruppe_id: string | null; name: string; beschreibung: string | null; position: number | null; created_at: string | null };
        Insert: { id?: string; gruppe_id?: string | null; name: string; beschreibung?: string | null; position?: number | null; created_at?: string | null };
        Update: { id?: string; gruppe_id?: string | null; name?: string; beschreibung?: string | null; position?: number | null; created_at?: string | null };
        Relationships: GruppeFk<"besetzung_eintraege_gruppe_id_fkey", "besetzung_gruppen">;
      };
      social_links: {
        Row: { id: string; site_id: string | null; platform: string; url: string; position: number | null };
        Insert: { id?: string; site_id?: string | null; platform: string; url: string; position?: number | null };
        Update: { id?: string; site_id?: string | null; platform?: string; url?: string; position?: number | null };
        Relationships: SiteFk<"social_links_site_id_fkey">;
      };
      band_members: {
        Row: { id: string; site_id: string | null; name: string; role: string | null; image_url: string | null; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; name: string; role?: string | null; image_url?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; name?: string; role?: string | null; image_url?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: SiteFk<"band_members_site_id_fkey">;
      };
      partner_gruppen: {
        Row: { id: string; site_id: string | null; name: string; beschreibung: string | null; kind: string; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; name: string; beschreibung?: string | null; kind?: string; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; name?: string; beschreibung?: string | null; kind?: string; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: SiteFk<"partner_gruppen_site_id_fkey">;
      };
      partner_eintraege: {
        Row: { id: string; gruppe_id: string | null; name: string; url: string | null; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; gruppe_id?: string | null; name: string; url?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; gruppe_id?: string | null; name?: string; url?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: GruppeFk<"partner_eintraege_gruppe_id_fkey", "partner_gruppen">;
      };
      occasions: {
        Row: { id: string; site_id: string | null; icon: string | null; title: string; description: string | null; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; icon?: string | null; title: string; description?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; icon?: string | null; title?: string; description?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: SiteFk<"occasions_site_id_fkey">;
      };
      inquiry_questions: {
        Row: { id: string; site_id: string | null; text: string; in_template: boolean | null; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; text: string; in_template?: boolean | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; text?: string; in_template?: boolean | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: SiteFk<"inquiry_questions_site_id_fkey">;
      };
      section_images: {
        Row: { id: string; site_id: string | null; section_key: string; url: string; alt: string | null; position: number | null; visible: boolean | null; created_at: string | null };
        Insert: { id?: string; site_id?: string | null; section_key: string; url: string; alt?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Update: { id?: string; site_id?: string | null; section_key?: string; url?: string; alt?: string | null; position?: number | null; visible?: boolean | null; created_at?: string | null };
        Relationships: SiteFk<"section_images_site_id_fkey">;
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

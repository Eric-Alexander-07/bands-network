/**
 * Data layer for Spirit of Soul.
 * Fetches from Supabase via @bands/band-data.
 * Falls back to static band.ts data when Supabase is not configured or returns empty.
 *
 * Usage in Server Components:
 *   import { fetchEvents, fetchVideos } from "@/lib/data";
 *   const events = await fetchEvents();
 */

import {
  getSite,
  getEvents,
  getMediaVideos,
  getMediaImages,
  getProducts,
  getReferenzen,
  getBesetzung,
  getSocialLinks,
  type Event,
  type MediaVideo,
  type MediaImage,
  type Product,
  type Referenz,
  type SocialLink,
  type BesetzungGruppeWithEintraege,
} from "@bands/band-data";
import { SITE_SLUG } from "./site";
import { band } from "@/config/band";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith("<");

// ─── Events / Spieltermine ───────────────────────────────────────
export async function fetchEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured) {
    // Fallback: convert static band.dates to Event shape
    return band.dates.map((d, i) => ({
      id: String(i),
      site_id: "",
      date: d.date,
      event_name: d.event,
      venue: d.venue,
      location: d.location,
      event_type: d.type,
      visible: true,
      created_at: new Date().toISOString(),
    }));
  }
  const events = await getEvents(SITE_SLUG);
  if (events.length === 0) {
    return band.dates.map((d, i) => ({
      id: String(i), site_id: "", date: d.date, event_name: d.event,
      venue: d.venue, location: d.location, event_type: d.type,
      visible: true, created_at: new Date().toISOString(),
    }));
  }
  return events;
}

// ─── Videos ──────────────────────────────────────────────────────
export async function fetchVideos(): Promise<MediaVideo[]> {
  if (!isSupabaseConfigured) {
    return band.videos.map((v, i) => ({
      id: String(i), site_id: "", youtube_id: v.id, title: v.title,
      description: v.description ?? null, position: i,
      created_at: new Date().toISOString(),
    }));
  }
  const videos = await getMediaVideos(SITE_SLUG);
  if (videos.length === 0) {
    return band.videos.map((v, i) => ({
      id: String(i), site_id: "", youtube_id: v.id, title: v.title,
      description: v.description ?? null, position: i,
      created_at: new Date().toISOString(),
    }));
  }
  return videos;
}

// ─── Images ──────────────────────────────────────────────────────
export async function fetchImages(category?: string): Promise<MediaImage[]> {
  if (!isSupabaseConfigured) return [];
  const images = await getMediaImages(SITE_SLUG);
  if (!category) return images;
  return images.filter((img) => img.category === category);
}

// ─── Products ────────────────────────────────────────────────────
export async function fetchProducts(category?: string): Promise<Product[]> {
  if (!isSupabaseConfigured) return [];
  const products = await getProducts(SITE_SLUG);
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

// ─── Referenzen ──────────────────────────────────────────────────
export async function fetchReferenzen(): Promise<Referenz[]> {
  if (!isSupabaseConfigured) {
    return band.references.map((r, i) => ({
      id: String(i), site_id: "", client_name: r.client,
      event_type: r.type, position: i,
      created_at: new Date().toISOString(),
    }));
  }
  const refs = await getReferenzen(SITE_SLUG);
  if (refs.length === 0) {
    return band.references.map((r, i) => ({
      id: String(i), site_id: "", client_name: r.client,
      event_type: r.type, position: i,
      created_at: new Date().toISOString(),
    }));
  }
  return refs;
}

// ─── Besetzung ───────────────────────────────────────────────────
export async function fetchBesetzung(): Promise<BesetzungGruppeWithEintraege[]> {
  if (!isSupabaseConfigured) return [];
  return getBesetzung(SITE_SLUG);
}

// ─── Social Links ────────────────────────────────────────────────
export async function fetchSocialLinks(): Promise<SocialLink[]> {
  if (!isSupabaseConfigured) return [];
  return getSocialLinks(SITE_SLUG);
}

// ─── Site info ───────────────────────────────────────────────────
export async function fetchSite() {
  if (!isSupabaseConfigured) return null;
  return getSite(SITE_SLUG);
}

// Re-export types
export type { Event, MediaVideo, MediaImage, Product, Referenz, SocialLink, BesetzungGruppeWithEintraege };

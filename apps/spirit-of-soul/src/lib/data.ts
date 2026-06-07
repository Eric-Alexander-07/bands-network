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
  getPage,
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

function getYtId(input: string): string {
  const m = input?.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? input;
}

async function fetchYouTubeTitle(ytId: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytId}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return "";
    const data = await res.json() as { title?: string };
    return data.title ?? "";
  } catch {
    return "";
  }
}

// ─── Events / Spieltermine ───────────────────────────────────────
export async function fetchEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured) return [];
  // When Supabase is configured, always return DB data — empty = no events shown
  return getEvents(SITE_SLUG);
}

// ─── Videos ──────────────────────────────────────────────────────
export async function fetchVideos(): Promise<MediaVideo[]> {
  let videos: MediaVideo[];

  if (!isSupabaseConfigured) {
    videos = band.videos.map((v, i) => ({
      id: String(i), site_id: "", youtube_url: v.id, title: v.title ?? null,
      position: i, created_at: null,
    }));
  } else {
    const db = await getMediaVideos(SITE_SLUG);
    videos = db.length > 0 ? db : band.videos.map((v, i) => ({
      id: String(i), site_id: "", youtube_url: v.id, title: v.title ?? null,
      position: i, created_at: null,
    }));
  }

  // Auto-fill empty titles from YouTube oEmbed (cached 24h)
  return Promise.all(videos.map(async v => {
    if (v.title) return v;
    const title = await fetchYouTubeTitle(getYtId(v.youtube_url));
    return { ...v, title: title || null };
  }));
}

// ─── Images ──────────────────────────────────────────────────────
export async function fetchImages(): Promise<MediaImage[]> {
  if (!isSupabaseConfigured) return [];
  return getMediaImages(SITE_SLUG);
}

// ─── Products ────────────────────────────────────────────────────
export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return [];
  return getProducts(SITE_SLUG);
}

// ─── Referenzen ──────────────────────────────────────────────────
export async function fetchReferenzen(): Promise<Referenz[]> {
  if (!isSupabaseConfigured) return [];
  return getReferenzen(SITE_SLUG);
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

// ─── Page content ────────────────────────────────────────────────
export async function fetchPageContent(slug: string): Promise<Record<string, string>> {
  if (!isSupabaseConfigured) return {};
  const page = await getPage(SITE_SLUG, slug);
  if (!page?.content) return {};
  return Object.fromEntries(
    Object.entries(page.content as Record<string, unknown>).map(([k, v]) => [k, String(v ?? "")])
  );
}

// ─── Site info ───────────────────────────────────────────────────
export async function fetchSite() {
  if (!isSupabaseConfigured) return null;
  return getSite(SITE_SLUG);
}

// Re-export types
export type { Event, MediaVideo, MediaImage, Product, Referenz, SocialLink, BesetzungGruppeWithEintraege };

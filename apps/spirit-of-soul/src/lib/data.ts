/**
 * Datenschicht fuer Spirit of Soul.
 *
 * Alle Inhalte stammen aus GENAU EINER Datenbankabfrage: `getSiteBundle()`
 * laedt Texte, Bilder und Listen gebuendelt und legt sie unter dem Cache-Tag
 * `site-bundle` ab. Die Zugriffsfunktionen unten lesen nur noch aus diesem
 * Bundle — mehrere Aufrufe innerhalb eines Renders loesen daher keine
 * zusaetzlichen Abfragen aus.
 *
 * Verwendung in Server Components:
 *   import { fetchBundle } from "@/lib/data";
 *   const bundle = await fetchBundle();
 */

import {
  getSiteBundle,
  sectionImages as pickSectionImages,
  EMPTY_BUNDLE,
  type SiteBundle,
  type Event,
  type MediaVideo,
  type MediaImage,
  type Product,
  type Referenz,
  type SocialLink,
  type BesetzungGruppeWithEintraege,
  type BandMember,
  type PartnerGruppeWithEintraege,
  type Occasion,
  type InquiryQuestion,
  type SectionImage,
} from "@bands/band-data";
import { SITE_SLUG } from "./site";
import { band } from "@/config/band";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith("<");

/** Der komplette Seiteninhalt — eine Abfrage, danach aus dem Cache. */
export async function fetchBundle(): Promise<SiteBundle> {
  if (!isSupabaseConfigured) return EMPTY_BUNDLE;
  return getSiteBundle(SITE_SLUG);
}

// ─── Zugriffe auf den Bundle ─────────────────────────────────────
// Bewusst synchron: sie erhalten den bereits geladenen Bundle und
// fuehren garantiert keine weitere Abfrage aus.

export function pageContent(bundle: SiteBundle, slug: string): Record<string, string> {
  return bundle.pages[slug] ?? {};
}

export const events        = (b: SiteBundle): Event[] => b.events;
export const images        = (b: SiteBundle): MediaImage[] => b.images;
export const products      = (b: SiteBundle): Product[] => b.products;
export const referenzen    = (b: SiteBundle): Referenz[] => b.referenzen;
export const socialLinks   = (b: SiteBundle): SocialLink[] => b.socialLinks;
export const besetzung     = (b: SiteBundle): BesetzungGruppeWithEintraege[] => b.besetzung;
export const members       = (b: SiteBundle): BandMember[] => b.members;
export const partnerGruppen = (b: SiteBundle): PartnerGruppeWithEintraege[] => b.partnerGruppen;
export const occasions     = (b: SiteBundle): Occasion[] => b.occasions;
export const inquiryQuestions = (b: SiteBundle): InquiryQuestion[] => b.inquiryQuestions;
export const sectionImages = (b: SiteBundle, key: string): SectionImage[] =>
  pickSectionImages(b, key);

// ─── Videos ──────────────────────────────────────────────────────
// Einziger Sonderfall: fehlende Titel werden per YouTube-oEmbed ergaenzt.
// Das ist ein externer HTTP-Aufruf (24 h gecached), keine Datenbankabfrage.

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

export async function videosWithTitles(bundle: SiteBundle): Promise<MediaVideo[]> {
  const fallback: MediaVideo[] = band.videos.map((v, i) => ({
    id: String(i), site_id: "", youtube_url: v.id, title: v.title ?? null,
    position: i, created_at: null,
  }));
  const list = bundle.videos.length > 0 ? bundle.videos : fallback;

  return Promise.all(list.map(async v => {
    if (v.title) return v;
    const title = await fetchYouTubeTitle(getYtId(v.youtube_url));
    return { ...v, title: title || null };
  }));
}

export type {
  SiteBundle, Event, MediaVideo, MediaImage, Product, Referenz, SocialLink,
  BesetzungGruppeWithEintraege, BandMember, PartnerGruppeWithEintraege,
  Occasion, InquiryQuestion, SectionImage,
};

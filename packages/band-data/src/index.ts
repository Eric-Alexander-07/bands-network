import { unstable_cache } from "next/cache";
import { createPublicClient } from "@bands/supabase/public";
import type {
  Site,
  Page,
  Event,
  MediaVideo,
  MediaImage,
  Product,
  Referenz,
  SocialLink,
  BesetzungGruppeWithEintraege,
} from "@bands/db-types";

// ─── Internal helper ─────────────────────────────────────────────
async function getSiteId(siteSlug: string): Promise<string | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("sites")
    .select("id")
    .eq("slug", siteSlug)
    .single<{ id: string }>();
  return data?.id ?? null;
}

// ─── getSite ─────────────────────────────────────────────────────
export const getSite = unstable_cache(
  async (siteSlug: string): Promise<Site | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("sites")
      .select("*")
      .eq("slug", siteSlug)
      .single();
    return data ?? null;
  },
  ["site"],
  { tags: ["site"], revalidate: 86400 }
);

// ─── getPages ────────────────────────────────────────────────────
export const getPages = unstable_cache(
  async (siteSlug: string): Promise<Page[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("site_id", siteId)
      .order("slug");
    return data ?? [];
  },
  ["pages"],
  { tags: ["pages"], revalidate: 3600 }
);

// ─── getPage ─────────────────────────────────────────────────────
export const getPage = unstable_cache(
  async (siteSlug: string, pageSlug: string): Promise<Page | null> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return null;
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("site_id", siteId)
      .eq("slug", pageSlug)
      .single();
    return data ?? null;
  },
  ["page"],
  { tags: ["pages"], revalidate: 3600 }
);

// ─── getEvents ───────────────────────────────────────────────────
export const getEvents = unstable_cache(
  async (siteSlug: string): Promise<Event[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("site_id", siteId)
      .eq("visible", true)
      .order("date", { ascending: true });
    return data ?? [];
  },
  ["events"],
  { tags: ["events"], revalidate: 3600 }
);

// ─── getMediaImages ──────────────────────────────────────────────
export const getMediaImages = unstable_cache(
  async (siteSlug: string): Promise<MediaImage[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("media_images")
      .select("*")
      .eq("site_id", siteId)
      .order("position", { ascending: true });
    return data ?? [];
  },
  ["media-images"],
  { tags: ["media-images"], revalidate: 3600 }
);

// ─── getMediaVideos ──────────────────────────────────────────────
export const getMediaVideos = unstable_cache(
  async (siteSlug: string): Promise<MediaVideo[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("media_videos")
      .select("*")
      .eq("site_id", siteId)
      .order("position", { ascending: true });
    return data ?? [];
  },
  ["media-videos"],
  { tags: ["media-videos"], revalidate: 3600 }
);

// ─── getProducts ─────────────────────────────────────────────────
export const getProducts = unstable_cache(
  async (siteSlug: string): Promise<Product[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("site_id", siteId)
      .eq("visible", true)
      .order("position", { ascending: true });
    return data ?? [];
  },
  ["products"],
  { tags: ["products"], revalidate: 3600 }
);

// ─── getReferenzen ───────────────────────────────────────────────
export const getReferenzen = unstable_cache(
  async (siteSlug: string): Promise<Referenz[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("referenzen")
      .select("*")
      .eq("site_id", siteId)
      .order("position", { ascending: true });
    return data ?? [];
  },
  ["referenzen"],
  { tags: ["referenzen"], revalidate: 3600 }
);

// ─── getBesetzung ────────────────────────────────────────────────
export const getBesetzung = unstable_cache(
  async (siteSlug: string): Promise<BesetzungGruppeWithEintraege[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("besetzung_gruppen")
      .select("*, besetzung_eintraege(id, name, beschreibung, position)")
      .eq("site_id", siteId)
      .order("position", { ascending: true })
      .order("position", { ascending: true, referencedTable: "besetzung_eintraege" });
    return (data as BesetzungGruppeWithEintraege[]) ?? [];
  },
  ["besetzung"],
  { tags: ["besetzung"], revalidate: 86400 }
);

// ─── getSocialLinks ──────────────────────────────────────────────
export const getSocialLinks = unstable_cache(
  async (siteSlug: string): Promise<SocialLink[]> => {
    const siteId = await getSiteId(siteSlug);
    if (!siteId) return [];
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .eq("site_id", siteId)
      .order("position", { ascending: true });
    return data ?? [];
  },
  ["social-links"],
  { tags: ["social-links"], revalidate: 86400 }
);

// Re-export types for convenience
export type {
  Site,
  Page,
  Event,
  MediaVideo,
  MediaImage,
  Product,
  Referenz,
  SocialLink,
  BesetzungGruppeWithEintraege,
} from "@bands/db-types";

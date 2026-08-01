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
  BandMember,
  PartnerGruppeWithEintraege,
  Occasion,
  InquiryQuestion,
  SectionImage,
} from "@bands/db-types";

/**
 * EIN Cache-Tag fuer den gesamten Seiteninhalt.
 *
 * Jede Admin-Aenderung invalidiert genau diesen Tag; danach wird der Bundle
 * einmal neu geladen und bedient wieder alle Seiten. Siehe `getSiteBundle`.
 */
export const SITE_BUNDLE_TAG = "site-bundle";

/** Vollstaendiger Inhalt einer Bandseite — Ergebnis genau einer Abfrage. */
export interface SiteBundle {
  site: Site | null;
  /** Seiteninhalte nach `pages.slug`. */
  pages: Record<string, Record<string, string>>;
  events: Event[];
  images: MediaImage[];
  videos: MediaVideo[];
  products: Product[];
  referenzen: Referenz[];
  socialLinks: SocialLink[];
  besetzung: BesetzungGruppeWithEintraege[];
  members: BandMember[];
  partnerGruppen: PartnerGruppeWithEintraege[];
  occasions: Occasion[];
  inquiryQuestions: InquiryQuestion[];
  sectionImages: SectionImage[];
}

export const EMPTY_BUNDLE: SiteBundle = {
  site: null,
  pages: {},
  events: [],
  images: [],
  videos: [],
  products: [],
  referenzen: [],
  socialLinks: [],
  besetzung: [],
  members: [],
  partnerGruppen: [],
  occasions: [],
  inquiryQuestions: [],
  sectionImages: [],
};

/**
 * Eine einzige PostgREST-Abfrage mit eingebetteten Relationen. Supabase
 * uebersetzt das in EINE SQL-Abfrage mit Lateral Joins — also ein Roundtrip
 * fuer den kompletten Seiteninhalt inklusive aller Bilder und Texte.
 *
 * Sortiert wird bewusst in JavaScript statt per `.order(referencedTable)`:
 * die Listen sind klein, und so bleibt die Abfrage eine einzige lesbare
 * Select-Zeichenkette.
 */
const SELECT = `
  id, slug, name, domain, logo_url, created_at,
  pages ( id, site_id, slug, content, updated_at ),
  events ( id, site_id, name, date, location, link, visible, position, created_at ),
  media_images ( id, site_id, url, caption, credit, position, created_at ),
  media_videos ( id, site_id, title, youtube_url, position, created_at ),
  products ( id, site_id, name, description, price, image_url, image_url_back, tag, subtitle, email_subject, position, visible, created_at ),
  referenzen ( id, site_id, name, type, position, created_at ),
  social_links ( id, site_id, platform, url, position ),
  besetzung_gruppen ( id, site_id, name, beschreibung, position, created_at,
    besetzung_eintraege ( id, gruppe_id, name, beschreibung, position, created_at ) ),
  band_members ( id, site_id, name, role, image_url, position, visible, created_at ),
  partner_gruppen ( id, site_id, name, beschreibung, kind, position, visible, created_at,
    partner_eintraege ( id, gruppe_id, name, url, position, visible, created_at ) ),
  occasions ( id, site_id, icon, title, description, position, visible, created_at ),
  inquiry_questions ( id, site_id, text, in_template, position, visible, created_at ),
  section_images ( id, site_id, section_key, url, alt, position, visible, created_at )
`;

type Positioned = { position?: number | null };
const byPosition = <T extends Positioned>(rows: T[] | null | undefined): T[] =>
  [...(rows ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

const visibleOnly = <T extends { visible?: boolean | null }>(rows: T[]): T[] =>
  rows.filter(r => r.visible !== false);

export const getSiteBundle = unstable_cache(
  async (siteSlug: string): Promise<SiteBundle> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("sites")
      .select(SELECT)
      .eq("slug", siteSlug)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error("[band-data] getSiteBundle:", error.message);
      return EMPTY_BUNDLE;
    }

    const row = data as unknown as Record<string, unknown>;

    // pages[] -> { slug: content }
    const pages: Record<string, Record<string, string>> = {};
    for (const p of (row.pages as Page[] | null) ?? []) {
      const content = p.content;
      pages[p.slug] =
        content && typeof content === "object" && !Array.isArray(content)
          ? (content as Record<string, string>)
          : {};
    }

    const besetzung = byPosition(
      (row.besetzung_gruppen as BesetzungGruppeWithEintraege[] | null) ?? []
    ).map(g => ({ ...g, besetzung_eintraege: byPosition(g.besetzung_eintraege) }));

    const partnerGruppen = visibleOnly(
      byPosition((row.partner_gruppen as PartnerGruppeWithEintraege[] | null) ?? [])
    ).map(g => ({
      ...g,
      partner_eintraege: visibleOnly(byPosition(g.partner_eintraege)),
    }));

    return {
      site: {
        id: row.id as string,
        slug: row.slug as string,
        name: row.name as string,
        domain: (row.domain as string | null) ?? null,
        logo_url: (row.logo_url as string | null) ?? null,
        created_at: (row.created_at as string | null) ?? null,
      },
      pages,
      // Events: chronologisch, nicht nach position
      events: [...(((row.events as Event[] | null) ?? []).filter(e => e.visible !== false))].sort(
        (a, b) => a.date.localeCompare(b.date)
      ),
      images: byPosition(row.media_images as MediaImage[] | null),
      videos: byPosition(row.media_videos as MediaVideo[] | null),
      products: visibleOnly(byPosition(row.products as Product[] | null)),
      referenzen: byPosition(row.referenzen as Referenz[] | null),
      socialLinks: byPosition(row.social_links as SocialLink[] | null),
      besetzung,
      members: visibleOnly(byPosition(row.band_members as BandMember[] | null)),
      partnerGruppen,
      occasions: visibleOnly(byPosition(row.occasions as Occasion[] | null)),
      inquiryQuestions: visibleOnly(byPosition(row.inquiry_questions as InquiryQuestion[] | null)),
      sectionImages: visibleOnly(byPosition(row.section_images as SectionImage[] | null)),
    };
  },
  ["site-bundle"],
  { tags: [SITE_BUNDLE_TAG], revalidate: 3600 }
);

/** Bilder einer Sektion (z. B. "tribute", "social_grid") in Reihenfolge. */
export function sectionImages(bundle: SiteBundle, key: string): SectionImage[] {
  return bundle.sectionImages.filter(i => i.section_key === key);
}

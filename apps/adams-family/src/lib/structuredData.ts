/**
 * Strukturierte Daten (schema.org / JSON-LD) fuer THE ADAMS FAMILY.
 *
 * Alle Angaben stammen aus der Datenbank bzw. den sichtbaren Seitentexten.
 * Nichts hier ist erfunden: fehlt ein Wert (z. B. keine Termine), wird das
 * jeweilige Schema gar nicht erst ausgegeben.
 */

import type { BandMember, Event } from "@bands/band-data";

/** Domain der Band — identisch mit `layout.tsx`, `robots.ts` und `sitemap.ts`. */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://theadamsfamily.de";

export const BAND_NAME = "The Adams Family";

/** Verweis auf die Band als Entitaet (wird in Event/WebSite wiederverwendet). */
const bandRef = { "@type": "MusicGroup", name: BAND_NAME, url: BASE_URL };

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BAND_NAME,
    url: BASE_URL,
    inLanguage: "de-DE",
    publisher: bandRef,
  };
}

/** Brotkrumen fuer Unterseiten: Startseite > Seite. */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BAND_NAME, item: BASE_URL },
      { "@type": "ListItem", position: 2, name, item: `${BASE_URL}${path}` },
    ],
  };
}

/** Bandmitglieder als `member` der MusicGroup (nur sichtbare Eintraege). */
export function memberSchemas(members: BandMember[]) {
  return members
    .filter((m) => m.visible !== false && m.name)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => ({
      "@type": "Person",
      name: m.name,
      ...(m.role ? { jobTitle: m.role } : {}),
    }));
}

/**
 * Kommende Konzerte als `Event`. Vergangene und ausgeblendete Termine
 * entfallen — Google wertet nur zukuenftige Veranstaltungen aus.
 */
export function eventSchemas(events: Event[], now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return events
    .filter((e) => e.visible && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      name: e.name,
      startDate: e.date,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      performer: bandRef,
      ...(e.location
        ? { location: { "@type": "Place", name: e.location, address: e.location } }
        : {}),
      ...(e.link ? { url: e.link } : {}),
    }));
}

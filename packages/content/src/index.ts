export * from "./types";

import type {
  ContentField,
  ContentPage,
  PageContent,
  SiteContentSchema,
} from "./types";

/** Alle Felder einer Seite ueber alle Gruppen hinweg. */
export function fieldsOf(page: ContentPage): ContentField[] {
  return page.groups.flatMap(g => g.fields);
}

/** Standardwerte einer Seite als flaches Objekt (Seed- und Fallback-Quelle). */
export function defaultsOf(page: ContentPage): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fieldsOf(page)) out[f.key] = f.default;
  return out;
}

/** Seite im Schema suchen. */
export function pageOf(schema: SiteContentSchema, slug: string): ContentPage | undefined {
  return schema.pages.find(p => p.slug === slug);
}

/**
 * Liefert eine Lesefunktion, die den Datenbankwert bevorzugt und sonst auf den
 * im Schema hinterlegten Standardtext zurueckfaellt.
 *
 * Leere Strings gelten als "nicht gesetzt" — sonst wuerde ein versehentlich
 * geleertes Admin-Feld die Seite mit einer Luecke ausliefern.
 */
export function contentReader(page: ContentPage, content?: PageContent) {
  const defaults = defaultsOf(page);
  return (key: string): string => {
    const value = content?.[key];
    if (typeof value === "string" && value.trim() !== "") return value;
    return defaults[key] ?? "";
  };
}

/**
 * Wie `contentReader`, aber ohne Fallback: gibt `""` zurueck, wenn der Wert
 * bewusst geleert wurde. Fuer optionale Bloecke, die verschwinden duerfen.
 */
export function rawReader(content?: PageContent) {
  return (key: string): string => {
    const value = content?.[key];
    return typeof value === "string" ? value : "";
  };
}

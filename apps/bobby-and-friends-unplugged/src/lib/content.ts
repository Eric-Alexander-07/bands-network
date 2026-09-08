/**
 * Zugriff auf Seitentexte.
 *
 * `resolve(bundle, "home")` liefert ein einfaches Objekt, in dem jeder im
 * Schema deklarierte Schluessel enthalten ist: der Wert aus der Datenbank,
 * sonst der Standardtext aus dem Schema.
 *
 * Bewusst ein Objekt und keine Funktion: die Werte werden an Client-
 * Komponenten weitergereicht, und ueber die Server/Client-Grenze lassen sich
 * nur serialisierbare Daten uebergeben — Funktionen nicht.
 */

import { defaultsOf, pageOf } from "@bands/content";
import { contentSchema } from "@/config/contentSchema";
import type { SiteBundle } from "@bands/band-data";

/** Aufgeloeste Seitentexte: Schluessel -> fertiger Text. */
export type Content = Record<string, string>;

export function resolve(bundle: SiteBundle, pageSlug: string): Content {
  const stored = bundle.pages[pageSlug] ?? {};
  const page = pageOf(contentSchema, pageSlug);
  const out: Content = page ? defaultsOf(page) : {};

  for (const [key, value] of Object.entries(stored)) {
    // Leere Felder gelten als "nicht gesetzt", damit ein versehentlich
    // geleertes Admin-Feld keine Luecke auf der Seite hinterlaesst.
    if (typeof value === "string" && value.trim() !== "") out[key] = value;
  }
  return out;
}

/** Nur die Standardtexte aus dem Schema (ohne Datenbank). */
export function defaultContent(pageSlug: string): Content {
  const page = pageOf(contentSchema, pageSlug);
  return page ? defaultsOf(page) : {};
}

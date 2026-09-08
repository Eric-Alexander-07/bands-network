"use client";

import { createContext, useContext } from "react";

/**
 * Die Site-ID wird EINMAL im Admin-Layout aufgeloest und von hier aus an alle
 * Unterseiten weitergereicht.
 *
 * Vorher holte sich jede Admin-Seite die Zeile aus `sites` selbst — bei jedem
 * Seitenwechsel also erneut, obwohl sich der Wert nie aendert. Gemessen waren
 * das drei `sites`-Abfragen pro Seitenaufruf zusaetzlich zu den eigentlichen
 * Inhaltsdaten.
 *
 * `null` bedeutet: noch nicht geladen oder in der Datenbank nicht vorhanden.
 * Die Seiten unterscheiden das ueber `loading` aus dem Layout, das ihre
 * Kinder erst nach der Aufloesung rendert.
 */
export const AdminSiteContext = createContext<string | null>(null);

/** Site-ID der aktuellen Band. Nur innerhalb des Admin-Layouts verwendbar. */
export function useSiteId(): string | null {
  return useContext(AdminSiteContext);
}

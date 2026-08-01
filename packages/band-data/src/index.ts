/**
 * Datenzugriff fuer die Bandseiten.
 *
 * Der gesamte Seiteninhalt wird ueber `getSiteBundle()` in EINER Abfrage
 * geladen und unter EINEM Cache-Tag (`site-bundle`) abgelegt. Jede Seite
 * liest anschliessend nur noch aus diesem Bundle — es gibt also pro
 * Revalidierung genau eine Datenbankabfrage fuer die komplette Website.
 *
 * Frueher besass jede Tabelle eine eigene `unstable_cache`-Funktion; das
 * ergab pro Seitenaufruf mehrere Roundtrips (Startseite: Site + Events +
 * Referenzen). Diese Einzelfunktionen wurden bewusst entfernt, damit sie
 * nicht versehentlich wieder verwendet werden.
 */

export {
  getSiteBundle,
  sectionImages,
  SITE_BUNDLE_TAG,
  EMPTY_BUNDLE,
  type SiteBundle,
} from "./bundle";

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
  BesetzungGruppe,
  BesetzungEintrag,
  BesetzungGruppeWithEintraege,
  BandMember,
  PartnerGruppe,
  PartnerEintrag,
  PartnerGruppeWithEintraege,
  Occasion,
  InquiryQuestion,
  SectionImage,
} from "@bands/db-types";

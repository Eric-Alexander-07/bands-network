/**
 * Schema-Typen fuer editierbare Seiteninhalte.
 *
 * Eine Band beschreibt in ihrer Schema-Datei EINMAL, welche Texte und Bilder
 * es gibt. Aus dieser Deklaration entstehen automatisch:
 *   1. die Formulare im Admin-Bereich,
 *   2. die Standardwerte (= der heute im Code stehende Text),
 *   3. der Seed, mit dem die Datenbank befuellt wird.
 *
 * Dadurch koennen DB-Inhalt und Code-Fallback nicht auseinanderlaufen.
 */

/** Feldtypen fuer Einzelwerte in `pages.content`. */
export type FieldType =
  | "text"      // einzeilig
  | "textarea"  // mehrzeilig
  | "image"     // Bild-URL mit Upload
  | "url";      // Link

export interface ContentField {
  /** Schluessel innerhalb von `pages.content` (snake_case). */
  key: string;
  /** Beschriftung im Admin. */
  label: string;
  type: FieldType;
  /**
   * Aktueller Live-Wert. Dient als Fallback im Code UND als Seed-Wert
   * fuer die Datenbank.
   */
  default: string;
  /** Kurzer Hinweis unter dem Feld. */
  help?: string;
  /** Zeilen fuer `textarea`. */
  rows?: number;
}

/** Optische Gruppierung innerhalb einer Seite (z. B. "Hero", "Kontakt-CTA"). */
export interface ContentGroup {
  title: string;
  description?: string;
  fields: ContentField[];
}

/** Ein Feld einer Listenzeile (Tabellen wie events, band_members, ...). */
export interface ListField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url" | "date" | "boolean" | "select";
  /** Auswahlmoeglichkeiten fuer `select`. */
  options?: string[];
  placeholder?: string;
  rows?: number;
  /** Relative Spaltenbreite in der Listenansicht. */
  flex?: number;
}

/**
 * Eine editierbare Liste (eigene Datenbanktabelle mit position/visible).
 * `child` bildet zweistufige Listen ab (Gruppe -> Eintraege), wie sie
 * Besetzung und Partner verwenden.
 */
export interface ListSpec {
  key: string;
  title: string;
  description?: string;
  /** Datenbanktabelle. */
  table: string;
  fields: ListField[];
  /** Standardwerte fuer eine neu angelegte Zeile. */
  newRow?: Record<string, unknown>;
  /** Zeile besitzt eine `visible`-Spalte (Ein-/Ausblenden im Admin). */
  hasVisible?: boolean;
  /**
   * Hoechstzahl an Eintraegen. Ist sie erreicht, blendet der Admin die
   * Schaltflaeche zum Hinzufuegen aus. Fuer Bildreihen, die im Layout eine
   * feste Anzahl haben (z. B. dreiteiliges Karussell, ein Social-Bild).
   * Ohne Angabe unbegrenzt — etwa Galerie, Saenger oder Termine.
   */
  maxItems?: number;
  /** Feste Filterspalte, z. B. `section_key` bei section_images. */
  filter?: { column: string; value: string };
  child?: {
    table: string;
    /** Fremdschluesselspalte in der Kindtabelle. */
    foreignKey: string;
    title: string;
    fields: ListField[];
    newRow?: Record<string, unknown>;
    hasVisible?: boolean;
  };
}

/** Eine Seite im Admin — entspricht einem Eintrag in der Tabelle `pages`. */
export interface ContentPage {
  /** `pages.slug`. */
  slug: string;
  /** Beschriftung in der Admin-Navigation. */
  title: string;
  /** Oeffentlicher Pfad — wird nach dem Speichern revalidiert. */
  path: string;
  description?: string;
  groups: ContentGroup[];
  /** Listen, die auf dieser Seite gepflegt werden. */
  lists?: ListSpec[];
}

export interface SiteContentSchema {
  pages: ContentPage[];
}

/** Rohinhalt einer Seite, wie er aus `pages.content` kommt. */
export type PageContent = Record<string, string | undefined | null>;

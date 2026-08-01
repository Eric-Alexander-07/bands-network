/**
 * Datenbanktypen der Bandseiten.
 *
 * Das eigentliche Schema liegt in `database.types.ts` (generiert). Hier stehen
 * nur die bequemen Kurznamen, die im Projektcode verwendet werden.
 */

export type { Json, Database } from "./database.types";

import type { Database } from "./database.types";

type Row<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Site               = Row<"sites">;
export type SiteAdmin          = Row<"site_admins">;
export type Page               = Row<"pages">;
export type Event              = Row<"events">;
export type MediaVideo         = Row<"media_videos">;
export type MediaImage         = Row<"media_images">;
export type Product            = Row<"products">;
export type Referenz           = Row<"referenzen">;
export type BesetzungGruppe    = Row<"besetzung_gruppen">;
export type BesetzungEintrag   = Row<"besetzung_eintraege">;
export type SocialLink         = Row<"social_links">;
export type BandMember         = Row<"band_members">;
export type PartnerGruppe      = Row<"partner_gruppen">;
export type PartnerEintrag     = Row<"partner_eintraege">;
export type Occasion           = Row<"occasions">;
export type InquiryQuestion    = Row<"inquiry_questions">;
export type SectionImage       = Row<"section_images">;

// Typen mit eingebetteten Relationen (wie sie der Site-Bundle liefert)
export type BesetzungGruppeWithEintraege = BesetzungGruppe & {
  besetzung_eintraege: BesetzungEintrag[];
};

export type PartnerGruppeWithEintraege = PartnerGruppe & {
  partner_eintraege: PartnerEintrag[];
};

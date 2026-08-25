/**
 * Partner / Künstlerpool data — mirrors the Vivid Music Productions partner
 * page (v-m-p.com/partner). Identical across the band sites.
 *
 * Band links point to each band's VMP sub-page (v-m-p.com/<slug>), EXCEPT the
 * bands that already run their own website — We Rock and Spirit of Soul —
 * which link to their real domains instead.
 */

export const VMP_URL = "https://v-m-p.com";

export interface PartnerLink {
  name: string;
  /** null = no public link yet (shown as plain text). */
  url: string | null;
}

export const MEDIA_PROFESSIONALS: {
  title: string;
  people: PartnerLink[];
}[] = [
  {
    title: "Fotografie",
    people: [
      { name: "Hans Jürgen Luft (Lufti)", url: null },
      { name: "Michael Wagner", url: "https://www.instagram.com/photographerwmphoto" },
      { name: "Oliver Haremsa", url: "https://www.instagram.com/emeraldpicsbyoh" },
      { name: "Marvin Stang", url: null },
    ],
  },
  {
    title: "Videoproduktion",
    people: [
      { name: "Jochen Hasmanis", url: "https://www.frame-spotting.de" },
      { name: "Evelyne Papparazzi", url: "https://youtube.com/@thepaparazzi001" },
      { name: "Damir Klaushofer", url: null },
      { name: "Klaus Allert", url: null },
      { name: "CAM Movies", url: "https://www.chrisundarthur.de" },
      { name: "Michael Meinzinger", url: "https://www.instagram.com/michael_meinzinger" },
    ],
  },
];

export const ARTIST_POOL: {
  category: string;
  description: string;
  bands: PartnerLink[];
}[] = [
  {
    category: "Partybands",
    description: "Energiegeladene Live-Bands für jede Tanzfläche.",
    bands: [
      { name: "Spirit of Soul", url: "https://spiritofsoul.com" },
      { name: "Groove Control", url: "https://groovecontrol.info" },
      { name: "BOBbastic", url: "https://v-m-p.com/bobbastic" },
    ],
  },
  {
    category: "Tribute Bands",
    description: "Originalgetreue Shows der größten Acts aller Zeiten.",
    bands: [
      { name: "We Rock", url: "https://werock-rockband.de" },
      { name: "CoverSnake", url: "https://v-m-p.com/coversnake" },
      { name: "The Adams Family", url: "https://v-m-p.com/adams-family" },
      { name: "Bobby Stoker Band", url: "https://v-m-p.com/bobby-stoker" },
    ],
  },
  {
    category: "Easy Listening",
    description: "Elegante Loungemusik für Empfänge und besondere Anlässe.",
    bands: [
      { name: "Bobby Stöcker Solo", url: "https://v-m-p.com/bobby-stoecker" },
      { name: "Bobby & Friends Unplugged", url: "https://v-m-p.com/bobby-and-friends" },
    ],
  },
];

/** Short, human-readable host label for a link, e.g. "instagram.com". */
export function hostLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
}

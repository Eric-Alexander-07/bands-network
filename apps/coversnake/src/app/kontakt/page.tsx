import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const DESCRIPTION =
  "CoverSnake kontaktieren — die Whitesnake-Tributeband aus dem Rhein-Main-Gebiet für Festivals, Clubshows und Firmenevents.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt – CoverSnake | Whitesnake Tribute" },
  description: DESCRIPTION,
  keywords: ["CoverSnake Kontakt", "Whitesnake Tributeband", "Vivid Music Productions"],
  alternates: { canonical: "https://coversnake.com/kontakt" },
  openGraph: {
    title: "Kontakt – CoverSnake | Whitesnake Tribute",
    description: DESCRIPTION,
    url: "https://coversnake.com/kontakt",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – CoverSnake | Whitesnake Tribute",
    description: DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

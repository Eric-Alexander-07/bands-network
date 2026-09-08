import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const KONTAKT_DESCRIPTION =
  "BOBbastic kontaktieren – das Party Rocktrio aus Frankfurt, Darmstadt und Aschaffenburg für Anfragen und allgemeine Fragen.";

export const metadata: Metadata = {
  title: "Kontakt – BOBbastic",
  description: KONTAKT_DESCRIPTION,
  keywords: ["BOBbastic Kontakt", "Rockband anfragen", "Vivid Music Productions"],
  alternates: { canonical: "https://bobbastic.de/kontakt" },
  openGraph: {
    title: "Kontakt – BOBbastic",
    description: KONTAKT_DESCRIPTION,
    url: "https://bobbastic.de/kontakt",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – BOBbastic",
    description: KONTAKT_DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

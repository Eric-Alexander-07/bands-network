import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const DESCRIPTION =
  "The Adams Family kontaktieren — die Bryan Adams Tributeband aus dem Rhein-Main-Gebiet für Festivals, Clubs und Firmenevents.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | The Adams Family") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt – The Adams Family | Bryan Adams Tribute" },
  description: DESCRIPTION,
  keywords: ["The Adams Family Kontakt", "Bryan Adams Tributeband", "Vivid Music Productions"],
  alternates: { canonical: "https://theadamsfamily.de/kontakt" },
  openGraph: {
    title: "Kontakt – The Adams Family | Bryan Adams Tribute",
    description: DESCRIPTION,
    url: "https://theadamsfamily.de/kontakt",
    images: [{ url: "https://theadamsfamily.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – The Adams Family | Bryan Adams Tribute",
    description: DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

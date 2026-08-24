export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control spielt vom Sextett bis zur neunköpfigen Besetzung. Dinner, Funk, Soul, Dance, Disco, Pop & Rock, Tanzstandards, passend zu jedem Anlass.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Groove Control") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Programm & Besetzung – Groove Control | Partyband buchen" },
  description: DESCRIPTION,
  keywords: ["Bandbesetzung buchen", "Partyband Repertoire", "Sextett Band", "Liveband", "Dinnermusik", "Funk", "Soul", "Dance", "Disco", "Pop", "Rock", "Tanzstandards"],
  alternates: { canonical: "https://groovecontrol.info/services" },
  openGraph: {
    title: "Programm & Besetzung – Groove Control | Partyband buchen",
    description: DESCRIPTION,
    url: "https://groovecontrol.info/services",
    images: [{ url: "https://groovecontrol.info/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm & Besetzung – Groove Control | Partyband buchen",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle, besetzung } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} dbBesetzung={besetzung(bundle)} />;
}

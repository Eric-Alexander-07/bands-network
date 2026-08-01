export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control spielt vom Sextett bis zur neunköpfigen XL-Besetzung. Dinner, Funk, Soul, Dance und Pop, passend zu jedem Teil des Abends.";

export const metadata: Metadata = {
  title: "Programm & Besetzung – Groove Control | Partyband buchen",
  description: DESCRIPTION,
  keywords: ["Bandbesetzung buchen", "Partyband Repertoire", "Sextett Band", "XL Besetzung Liveband", "Dinnermusik", "Funk Soul Dance Pop"],
  alternates: { canonical: "https://groovecontrol.de/services" },
  openGraph: {
    title: "Programm & Besetzung – Groove Control | Partyband buchen",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/services",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
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

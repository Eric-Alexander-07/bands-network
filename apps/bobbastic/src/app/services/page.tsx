export const revalidate = 86400;

import type { Metadata } from "next";

const SERVICES_DESCRIPTION =
  "BOBbastic tritt als kompaktes Rock-Trio auf und bringt die Energie einer großen Band auf jede Bühne – flexibel für Firmenfeiern und Stadtfeste.";

export const metadata: Metadata = {
  title: "Programm & Besetzung – BOBbastic | Rock-Trio buchen",
  description: SERVICES_DESCRIPTION,
  keywords: ["Rock-Trio buchen", "Rockband buchen", "Bandbesetzung", "Liveband Firmenevent", "Party Rockband", "BOBbastic Besetzung", "Rock Cover Band engagieren"],
  alternates: { canonical: "https://bobbastic.de/services" },
  openGraph: {
    title: "Programm & Besetzung – BOBbastic",
    description: SERVICES_DESCRIPTION,
    url: "https://bobbastic.de/services",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm & Besetzung – BOBbastic",
    description: SERVICES_DESCRIPTION,
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} />;
}

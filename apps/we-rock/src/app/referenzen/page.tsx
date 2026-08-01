export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – WE ROCK",
  description: "In welchen Clubs, Festivals, Stadtfesten und Events WE ROCK bisher aufgetreten ist – und in welchen namhaften Bands die Musiker vorher gespielt haben.",
  keywords: ["WE ROCK Referenzen", "Clubs", "Festivals", "Stadtfeste", "Band Lineup", "Bandbesetzung"],
  alternates: { canonical: "https://werock-rockband.de/referenzen" },
  openGraph: {
    title: "Referenzen – WE ROCK | Events & Auftritte",
    description: "WE ROCK begeistert auf Festivals, Firmenevents und privaten Feiern europaweit.",
    url: "https://werock-rockband.de/referenzen",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – WE ROCK | Events & Auftritte",
    description: "WE ROCK begeistert auf Festivals, Firmenevents und privaten Feiern europaweit.",
  },
    robots: { index: true, follow: true },
};

import ReferencesPage from "@/components/ReferencesPage";
import { fetchBundle, referenzen, partnerGruppen } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Referenzen() {
  const bundle = await fetchBundle();
  return <ReferencesPage refs={referenzen(bundle)} c={resolve(bundle, "referenzen")} partnerGruppen={partnerGruppen(bundle)} />;
}

export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – WE ROCK",
  description: "Informieren Sie sich, in welchen Clubs, Festivals, Stadtfesten und Events WE ROCK bisher aufgetreten ist, und in welchen namhaften Bands die Musiker bisher gespielt haben.",
  keywords: ["WE ROCK Referenzen", "Clubs", "Festivals", "Stadtfeste", "Band Lineup", "Bandbesetzung"],
  alternates: { canonical: "https://we-rock.de/referenzen" },
  openGraph: {
    title: "Referenzen – WE ROCK | Events & Auftritte",
    description: "WE ROCK begeistert auf Festivals, Firmenevents und privaten Feiern europaweit.",
    url: "https://we-rock.de/referenzen",
    images: [{ url: "https://we-rock.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – WE ROCK | Events & Auftritte",
    description: "WE ROCK begeistert auf Festivals, Firmenevents und privaten Feiern europaweit.",
  },
    robots: { index: true, follow: true },
};

import ReferencesPage from "@/components/ReferencesPage";
import { fetchReferenzen } from "@/lib/data";

export default async function Referenzen() {
  const refs = await fetchReferenzen();
  return <ReferencesPage refs={refs} />;
}

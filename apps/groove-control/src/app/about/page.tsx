export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control vereint erfahrene Session-Musiker und charismatische Leadsänger. Hundert Prozent live, ohne Playback, auf jeder Bühne.";

export const metadata: Metadata = {
  title: "Über uns – Groove Control | Partyband aus Frankfurt",
  description: DESCRIPTION,
  keywords: ["Groove Control Band", "Partyband Musiker", "Liveband Frankfurt", "Session Musiker", "Leadsänger", "Bandgeschichte"],
  alternates: { canonical: "https://groovecontrol.de/about" },
  openGraph: {
    title: "Über uns – Groove Control | Partyband aus Frankfurt",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/about",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – Groove Control | Partyband aus Frankfurt",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import AboutPage from "@/components/AboutPage";
import { fetchBundle, members } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function About() {
  const bundle = await fetchBundle();
  return <AboutPage c={resolve(bundle, "about")} members={members(bundle)} />;
}

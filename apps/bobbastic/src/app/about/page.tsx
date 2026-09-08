export const revalidate = 86400;

import type { Metadata } from "next";

const ABOUT_DESCRIPTION =
  "BOBbastic ist ein Rock-Trio aus Frankfurt, Darmstadt und Aschaffenburg mit einem rundum Rock-Coverprogramm von Klassikern bis Charts-Hits.";

export const metadata: Metadata = {
  title: "Über uns – BOBbastic | Das Party Rocktrio",
  description: ABOUT_DESCRIPTION,
  keywords: ["BOBbastic Band", "Party Rocktrio", "Rockband Rhein-Main", "Profimusiker", "Rock Cover Band", "Liveband", "Hochzeitsband", "Frankfurt am Main", "Darmstadt", "Aschaffenburg"],
  alternates: { canonical: "https://bobbastic.de/about" },
  openGraph: {
    title: "Über uns – BOBbastic",
    description: ABOUT_DESCRIPTION,
    url: "https://bobbastic.de/about",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – BOBbastic",
    description: ABOUT_DESCRIPTION,
  },
    robots: { index: true, follow: true },
};

import AboutPage from "@/components/AboutPage";
import { fetchBundle, members } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function About() {
  const bundle = await fetchBundle();
  return <AboutPage c={resolve(bundle, "about")} members={members(bundle)} />;
}

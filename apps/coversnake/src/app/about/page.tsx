export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "CoverSnake spielt in Sextett-Besetzung große Clubs im gesamten Bundesgebiet und gilt als eine der erfolgreichsten Whitesnake Tribute-Bands.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Die Band – CoverSnake | Whitesnake Tribute" },
  description: DESCRIPTION,
  keywords: ["CoverSnake Band", "Whitesnake Tributeband", "Coverband", "David Coverdale", "Bobby Stöcker", "David Readman", "Emmo Acar", "Rockband", "Stadtfest", "Classic Rock", "Darmstadt", "Frankfurt", "Aschaffenburg"],
  alternates: { canonical: "https://coversnake.com/about" },
  openGraph: {
    title: "Die Band – CoverSnake | Whitesnake Tribute",
    description: DESCRIPTION,
    url: "https://coversnake.com/about",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Band – CoverSnake | Whitesnake Tribute",
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

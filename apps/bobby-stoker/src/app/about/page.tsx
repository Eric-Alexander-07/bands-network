export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby Stoker komponiert seit den 90ern eigene Musik, spielte mit Bobby Kimball und Sydney Youngblood und veröffentlichte 2022 sein Album „Everglow“.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Über Bobby – Bobby Stoker Band | Blues Rock & Classic Rock" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker", "Bobby Stoker Band", "Everglow Album", "Blues Rock Musiker", "Rockband Musiker", "Songwriter Rhein-Main", "Bandportrait"],
  alternates: { canonical: "https://bobbystoker.com/about" },
  openGraph: {
    title: "Über Bobby – Bobby Stoker Band | Blues Rock & Classic Rock",
    description: DESCRIPTION,
    url: "https://bobbystoker.com/about",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über Bobby – Bobby Stoker Band | Blues Rock & Classic Rock",
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

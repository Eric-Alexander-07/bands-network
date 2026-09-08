export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby Stoker Band in Bildern: Fotos von Clubkonzerten, Festivals und der „Everglow“-Albumveröffentlichung.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Galerie – Bobby Stoker Band | Fotos von der Bühne" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker Fotos", "Everglow Album Fotos", "Konzertfotos Blues Rock", "Livefotos Rockband", "Bandgalerie"],
  alternates: { canonical: "https://bobbystoker.com/galerie" },
  openGraph: {
    title: "Galerie – Bobby Stoker Band | Fotos von der Bühne",
    description: DESCRIPTION,
    url: "https://bobbystoker.com/galerie",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Bobby Stoker Band | Fotos von der Bühne",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import GalleriePage from "@/components/GalleriePage";
import { fetchBundle, images } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Galerie() {
  const bundle = await fetchBundle();
  return <GalleriePage dbImages={images(bundle)} c={resolve(bundle, "galerie")} />;
}

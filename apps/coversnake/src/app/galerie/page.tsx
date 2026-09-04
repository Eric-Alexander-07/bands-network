export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "CoverSnake in Bildern: Fotos von Clubshows, Stadtfesten und Rockfestivals der sechsköpfigen Whitesnake-Tributeband.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Galerie – CoverSnake | Fotos von der Bühne" },
  description: DESCRIPTION,
  keywords: ["CoverSnake Fotos", "Whitesnake Tribute Bilder", "Konzertfotos", "Livefotos Rockband", "Bandgalerie"],
  alternates: { canonical: "https://coversnake.com/galerie" },
  openGraph: {
    title: "Galerie – CoverSnake | Fotos von der Bühne",
    description: DESCRIPTION,
    url: "https://coversnake.com/galerie",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – CoverSnake | Fotos von der Bühne",
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

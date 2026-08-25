export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "The Adams Family in Bildern: Fotos von Clubkonzerten, Stadtfesten und Open-Air-Bühnen der Bryan Adams Tributeband.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | The Adams Family") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Galerie – The Adams Family | Fotos von der Bühne" },
  description: DESCRIPTION,
  keywords: ["The Adams Family Fotos", "Bryan Adams Tribute Bilder", "Konzertfotos", "Livefotos Rockband", "Bandgalerie"],
  alternates: { canonical: "https://theadamsfamily.de/galerie" },
  openGraph: {
    title: "Galerie – The Adams Family | Fotos von der Bühne",
    description: DESCRIPTION,
    url: "https://theadamsfamily.de/galerie",
    images: [{ url: "https://theadamsfamily.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – The Adams Family | Fotos von der Bühne",
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

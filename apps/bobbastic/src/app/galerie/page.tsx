export const revalidate = 3600;

import type { Metadata } from "next";

const GALERIE_DESCRIPTION =
  "Galerie von BOBbastic mit Eindrücken von Live-Auftritten, Bühnenmomenten und Partys des Rock-Trios.";

export const metadata: Metadata = {
  title: "Galerie – BOBbastic | Live-Fotos",
  description: GALERIE_DESCRIPTION,
  keywords: ["BOBbastic Fotos", "Rockband Galerie", "Live-Fotos Rock", "Bühnenfotos Party Rocktrio"],
  alternates: { canonical: "https://bobbastic.de/galerie" },
  openGraph: {
    title: "Galerie – BOBbastic",
    description: GALERIE_DESCRIPTION,
    url: "https://bobbastic.de/galerie",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – BOBbastic",
    description: GALERIE_DESCRIPTION,
  },
    robots: { index: true, follow: true },
};

import GalleriePage from "@/components/GalleriePage";
import { fetchBundle, images } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Galerie() {
  const bundle = await fetchBundle();
  return <GalleriePage dbImages={images(bundle)} c={resolve(bundle, "galerie")} />;
}

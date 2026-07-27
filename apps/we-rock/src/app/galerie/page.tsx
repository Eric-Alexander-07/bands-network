export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie – WE ROCK | Konzert Fotos Live",
  description: "Fotogalerie von WE ROCK – Eindrücke von Konzerten, Festivals, Stadtfesten, Clubs und Tribute-Shows.",
  keywords: ["WE ROCK Fotos", "Classic Rock Live Fotos", "Rockband Galerie", "Hard Rock Bühnenfotos", "Tribute Show Bilder"],
  alternates: { canonical: "https://werock-rockband.de/galerie" },
  openGraph: {
    title: "Galerie – WE ROCK | Live-Fotos Classic Rock",
    description: "Impressionen von WE ROCK Live-Auftritten — Classic Rock & Hardrock live.",
    url: "https://werock-rockband.de/galerie",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – WE ROCK | Live-Fotos Classic Rock",
    description: "Impressionen von WE ROCK Live-Auftritten — Classic Rock & Hardrock live.",
  },
    robots: { index: true, follow: true },
};

import GalleriePage from "@/components/GalleriePage";
import { fetchImages } from "@/lib/data";

export default async function Galerie() {
  const dbImages = await fetchImages();
  return <GalleriePage dbImages={dbImages} />;
}

export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie – Spirit of Soul | Live-Fotos",
  description: "Fotogalerie – Impressionen von unseren öffentlichen Live-Konzerten",
  keywords: ["Spirit of Soul Fotos", "Soulband Bilder", "Liveband Bilder Frankfurt", "Livekonzert", "Konzertbilder", "Eventfotografie", "Liveband", "Coverband"],
  alternates: { canonical: "https://spirit-of-soul.de/galerie" },
  openGraph: {
    title: "Galerie – Spirit of Soul | Live-Fotos",
    description: "Fotogalerie – Impressionen von unseren öffentlichen Live-Konzerten",
    url: "https://spirit-of-soul.de/galerie",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Spirit of Soul | Live-Fotos",
    description: "Fotogalerie – Impressionen von unseren öffentlichen Live-Konzerten",
  },
    robots: { index: true, follow: true },
};

import GalleriePage from "@/components/GalleriePage";
import { fetchImages } from "@/lib/data";

export default async function Galerie() {
  const dbImages = await fetchImages();
  return <GalleriePage dbImages={dbImages} />;
}

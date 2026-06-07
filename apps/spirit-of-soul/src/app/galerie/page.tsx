export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie – Spirit of Soul | Live-Fotos",
  description: "Fotogalerie von Spirit of Soul – Impressionen von Live-Auftritten, Hochzeiten, Firmenevents und Festivals. The Finest Of Black Music auf der Bühne.",
  keywords: ["Spirit of Soul Fotos", "Soulband Bilder", "Liveband Bilder Frankfurt"],
  alternates: { canonical: "https://spirit-of-soul.de/galerie" },
  openGraph: {
    title: "Galerie – Spirit of Soul | Live-Fotos",
    description: "Fotogalerie von Spirit of Soul – Impressionen von Live-Auftritten, Hochzeiten, Firmenevents und Festivals. The Finest Of Black Music auf der Bühne.",
    url: "https://spirit-of-soul.de/galerie",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Spirit of Soul | Live-Fotos",
    description: "Fotogalerie von Spirit of Soul – Impressionen von Live-Auftritten, Hochzeiten, Firmenevents und Festivals. The Finest Of Black Music auf der Bühne.",
  },
    robots: { index: true, follow: true },
};

import GalleriePage from "@/components/GalleriePage";
import { fetchImages } from "@/lib/data";

export default async function Galerie() {
  const dbImages = await fetchImages();
  return <GalleriePage dbImages={dbImages} />;
}

export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie – WE ROCK | Live-Fotos Classic Rock",
  description: "Fotogalerie – Impressionen von WE ROCK Live-Auftritten. Classic Rock & Hardrock auf Festival-Bühnen, in Clubs und bei Firmenevents.",
  keywords: ["WE ROCK Fotos", "Classic Rock Band Bilder", "Rockband Live-Fotos", "Konzertbilder Rock", "Eventfotografie Rock", "Rockshow Impressionen"],
  alternates: { canonical: "https://we-rock.de/galerie" },
  openGraph: {
    title: "Galerie – WE ROCK | Live-Fotos Classic Rock",
    description: "Impressionen von WE ROCK Live-Auftritten — Classic Rock & Hardrock live.",
    url: "https://we-rock.de/galerie",
    images: [{ url: "https://we-rock.de/images/about.webp" }],
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

export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control in Bildern: Eindrücke von Firmenevents, Galas und Hochzeiten der Partyband Deluxe aus Frankfurt am Main.";

export const metadata: Metadata = {
  title: "Galerie – Groove Control | Fotos der Partyband",
  description: DESCRIPTION,
  keywords: ["Groove Control Fotos", "Partyband Bilder", "Liveband Galerie", "Eventfotos Band"],
  alternates: { canonical: "https://groovecontrol.de/galerie" },
  openGraph: {
    title: "Galerie – Groove Control | Fotos der Partyband",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/galerie",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Groove Control | Fotos der Partyband",
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

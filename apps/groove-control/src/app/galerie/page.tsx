export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control in Bildern: Eindrücke von Firmenevents, Galas, Stadtfesten, Messen und Hochzeiten der Partyband aus Frankfurt am Main.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Groove Control") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Galerie – Groove Control | Foto Highlights vergangener Veranstaltungen" },
  description: DESCRIPTION,
  keywords: ["Groove Control Fotos", "Partyband Bilder", "Liveband Galerie", "Konzertfotos", "Eventbilder"],
  alternates: { canonical: "https://groovecontrol.info/galerie" },
  openGraph: {
    title: "Galerie – Groove Control | Foto Highlights vergangener Veranstaltungen",
    description: DESCRIPTION,
    url: "https://groovecontrol.info/galerie",
    images: [{ url: "https://groovecontrol.info/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Groove Control | Foto Highlights vergangener Veranstaltungen",
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

export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Impressionen von Wohnzimmerkonzerten, Dinnerabenden und Hochzeiten mit Bobby & Friends Unplugged im Rhein-Main-Gebiet und darüber hinaus.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Galerie – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Bobby & Friends Unplugged Fotos", "Wohnzimmerkonzert Bilder", "Akustikband Galerie", "Hochzeitsmusiker Fotos", "Dinnerband Impressionen"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/galerie" },
  openGraph: {
    title: "Galerie – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/galerie",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie – Bobby & Friends Unplugged",
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

export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby Stoker Band: handgemachter Blues Rock und Classic Rock mit Eigenkompositionen aus dem Album „Everglow“ für Clubs, Firmenevents und Festivals.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Programm – Bobby Stoker Band | Besetzung & Repertoire" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker Band Programm", "Blues Rock Band buchen", "Everglow Album", "Rockband Repertoire", "Livemusik Rhein-Main", "Bandbesetzung", "Bühnentechnik Band"],
  alternates: { canonical: "https://bobbystoker.com/services" },
  openGraph: {
    title: "Programm – Bobby Stoker Band | Besetzung & Repertoire",
    description: DESCRIPTION,
    url: "https://bobbystoker.com/services",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm – Bobby Stoker Band | Besetzung & Repertoire",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} />;
}

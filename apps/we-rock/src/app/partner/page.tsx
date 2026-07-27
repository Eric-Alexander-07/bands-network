export const revalidate = 86400;

import type { Metadata } from "next";
import PartnerPage from "@/components/PartnerPage";

export const metadata: Metadata = {
  title: "Partner – WE ROCK | VMP-Künstlerpool, Foto & Video",
  description:
    "WE ROCK ist Teil des Vivid Music Productions Künstlerpools. Hier findet Ihr unsere Foto- und Video-Partner sowie alle Bands aus dem VMP-Netzwerk.",
  keywords: ["WE ROCK Partner", "Vivid Music Productions", "VMP Künstlerpool", "Eventfotografie", "Videoproduktion", "Bands Rhein-Main"],
  alternates: { canonical: "https://werock-rockband.de/partner" },
  openGraph: {
    title: "Partner – WE ROCK | VMP-Künstlerpool, Foto & Video",
    description:
      "WE ROCK ist Teil des Vivid Music Productions Künstlerpools – mit Foto- & Video-Partnern und allen Bands des Netzwerks.",
    url: "https://werock-rockband.de/partner",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner – WE ROCK | VMP-Künstlerpool",
    description: "WE ROCK ist Teil des Vivid Music Productions Künstlerpools.",
  },
  robots: { index: true, follow: true },
};

export default function Partner() {
  return <PartnerPage />;
}

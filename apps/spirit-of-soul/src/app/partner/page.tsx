export const revalidate = 86400;

import type { Metadata } from "next";
import PartnerPage from "@/components/PartnerPage";

export const metadata: Metadata = {
  title: "Partner – Spirit of Soul | VMP-Künstlerpool, Foto & Video",
  description:
    "Spirit of Soul ist Teil des Vivid Music Productions Künstlerpools. Hier findet Ihr unsere Foto- und Video-Partner sowie alle Bands aus dem VMP-Netzwerk.",
  keywords: ["Spirit of Soul Partner", "Vivid Music Productions", "VMP Künstlerpool", "Eventfotografie", "Videoproduktion", "Bands Frankfurt"],
  alternates: { canonical: "https://spiritofsoul.com/partner" },
  openGraph: {
    title: "Partner – Spirit of Soul | VMP-Künstlerpool, Foto & Video",
    description:
      "Spirit of Soul ist Teil des Vivid Music Productions Künstlerpools – mit Foto- & Video-Partnern und allen Bands des Netzwerks.",
    url: "https://spiritofsoul.com/partner",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner – Spirit of Soul | VMP-Künstlerpool",
    description: "Spirit of Soul ist Teil des Vivid Music Productions Künstlerpools.",
  },
  robots: { index: true, follow: true },
};

export default function Partner() {
  return <PartnerPage />;
}

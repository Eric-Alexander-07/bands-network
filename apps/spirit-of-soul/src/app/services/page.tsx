export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
  description: "Vom Duo bis zur 12er Besetzung mit Bläsern. Individuelle Pakete für Ihren Event. Firmenfeiern, Hochzeiten, Incentives, Stadtfeste und High Class Events.",
  keywords: ["Soulband Hochzeit", "Liveband Firmenevent", "Partyband mieten Frankfurt", "Galaband", "Soulband Besetzung", "Livemusik", "Musik Duo", "Hochzeitsband", "Eventband", "Partyband"],
  alternates: { canonical: "https://spiritofsoul.com/services" },
  openGraph: {
    title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
    description: "Vom Duo bis zur 12er Besetzung mit Bläsern. Individuelle Pakete für Ihren Event. Firmenfeiern, Hochzeiten, Incentives, Stadtfeste und High Class Events.",
    url: "https://spiritofsoul.com/services",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
    description: "Vom Duo bis zur 12er Besetzung mit Bläsern. Individuelle Pakete für Ihren Event. Firmenfeiern, Hochzeiten, Incentives, Stadtfeste und High Class Events.",
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle, besetzung } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  const dbBesetzung = besetzung(bundle);
  const c = resolve(bundle, "services");
  return <ServicesPage dbBesetzung={dbBesetzung} c={c} />;
}

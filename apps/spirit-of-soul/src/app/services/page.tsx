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
import { fetchBesetzung, fetchPageContent } from "@/lib/data";

export default async function Services() {
  const [dbBesetzung, content] = await Promise.all([fetchBesetzung(), fetchPageContent("services")]);
  return <ServicesPage dbBesetzung={dbBesetzung} content={content} />;
}

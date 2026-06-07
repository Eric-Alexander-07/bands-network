import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
  description: "Spirit of Soul für Ihre Veranstaltung – vom Duo bis zur 12er Full-Band mit Bläsern. Konventionelle Show oder Multimedia-Show mit LED-Leinwänden. Individuelle Pakete.",
  keywords: ["Soulband Hochzeit", "Liveband Firmenevent", "Partyband mieten Frankfurt", "Band buchen Gala", "Soulband Besetzung"],
  alternates: { canonical: "https://spirit-of-soul.de/services" },
  openGraph: {
    title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
    description: "Spirit of Soul für Ihre Veranstaltung – vom Duo bis zur 12er Full-Band mit Bläsern. Konventionelle Show oder Multimedia-Show mit LED-Leinwänden. Individuelle Pakete.",
    url: "https://spirit-of-soul.de/services",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Besetzung – Spirit of Soul | Soulband buchen",
    description: "Spirit of Soul für Ihre Veranstaltung – vom Duo bis zur 12er Full-Band mit Bläsern. Konventionelle Show oder Multimedia-Show mit LED-Leinwänden. Individuelle Pakete.",
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBesetzung, fetchPageContent } from "@/lib/data";

export default async function Services() {
  const [dbBesetzung, content] = await Promise.all([fetchBesetzung(), fetchPageContent("services")]);
  return <ServicesPage dbBesetzung={dbBesetzung} content={content} />;
}

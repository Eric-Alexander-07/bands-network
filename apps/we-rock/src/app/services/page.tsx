export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Besetzung – WE ROCK | Rockshow buchen",
  description: "Vom Trio bis zur 7-köpfigen Full-Band. Individuelle Rock-Shows für Festivals, Firmenevents, Hochzeiten und private Feiern. WE ROCK — Classic Rock & Hardrock live.",
  keywords: ["Rockband Hochzeit", "Liveband Firmenevent", "Classic Rock Band mieten", "Rockshow Besetzung", "Livemusik Rock", "Rock Tribute Band", "Rockband buchen", "Eventband Rock"],
  alternates: { canonical: "https://we-rock.de/services" },
  openGraph: {
    title: "Services & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
    url: "https://we-rock.de/services",
    images: [{ url: "https://we-rock.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBesetzung, fetchPageContent } from "@/lib/data";

export default async function Services() {
  const [dbBesetzung, content] = await Promise.all([fetchBesetzung(), fetchPageContent("services")]);
  return <ServicesPage dbBesetzung={dbBesetzung} content={content} />;
}

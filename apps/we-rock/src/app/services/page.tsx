export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
  description: "Von der 7- bis zur 9-köpfigen Band mit bis zu 4 Front Sängern und Multimedia-Show. Die Classic Rock Tributeshow für Festivals, Stadtfeste und Clubs.",
  keywords: ["Rockshow buchen", "Classic Rock", "Band Besetzung", "Liveband", "Firmenevent", "Tribute Band Booking", "Rock Band", "Melodic Rock", "WE ROCK Besetzung", "Hard Rock Band engagieren"],
  alternates: { canonical: "https://werock-rockband.de/services" },
  openGraph: {
    title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
    url: "https://werock-rockband.de/services",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} />;
}

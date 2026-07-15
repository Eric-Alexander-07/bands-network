export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
  description: "Buchbar von einer 7-köpfigen bis zur 9-köpfigen Band mit bis zu 4 Front Sängern und Multimedia-Show. WE ROCK - die Classic Rock Tributeshow für Festivals, Stadtfeste, Clubs, Firmenevents und größere private Feiern buchbar.",
  keywords: ["Rockshow buchen", "Classic Rock", "Band Besetzung", "Liveband", "Firmenevent", "Tribute Band Booking", "Rock Band", "Melodic Rock", "WE ROCK Besetzung", "Hard Rock Band engagieren"],
  alternates: { canonical: "https://we-rock.de/services" },
  openGraph: {
    title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
    url: "https://we-rock.de/services",
    images: [{ url: "https://we-rock.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm & Besetzung – WE ROCK | Rockshow buchen",
    description: "Vom Trio bis zur 7-köpfigen Full-Band — individuelle Rock-Shows für jeden Event.",
  },
    robots: { index: true, follow: true },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchPageContent } from "@/lib/data";

export default async function Services() {
  const content = await fetchPageContent("services");
  return <ServicesPage content={content} />;
}

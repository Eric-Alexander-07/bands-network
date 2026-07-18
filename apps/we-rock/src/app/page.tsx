export const revalidate = 3600; // re-render at most once per hour; admin mutations trigger instant revalidation via revalidatePath

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import OccasionsSection from "@/components/OccasionsSection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";
import { fetchEvents } from "@/lib/data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WE ROCK – Die Classic Rock Tribute Show | Rockband Rhein-Main",
  description: "WE ROCK – Die Classic Rock Tribute Show aus Darmstadt präsentiert die größten Rock Hymnen aus fünf Jahrzehnten, mit Schwerpunkt 70er & 80er Jahre.",
  keywords: ["Classic Rock", "Rockband", "Rock Cover", "Tributeband", "Tribute Band", "Tribute Show", "Rock and Roll", "Hard Rock", "Melodic Rock", "Blues Rock", "Hair Metal", "Heavy Metal", "We Rock Band", "Rock Hymnen", "Hard Rock Band", "Coverband", "Rockband Rhein-Main"],
  alternates: { canonical: "https://werock-rockband.de" },
  openGraph: {
    title: "WE ROCK – Die Classic Rock Tribute Show",
    description: "7 Profimusiker, 4 Sänger — Classic Rock & Hardrock live. Die authentische Tribute Show für Festivals, Firmenevents und private Feiern.",
    url: "https://werock-rockband.de",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WE ROCK – Die Classic Rock Tribute Show",
    description: "Classic Rock & Hardrock live. Rockband für Festivals, Firmenevents und private Feiern.",
  },
    robots: { index: true, follow: true },
};



export default async function HomePage() {
  // Fetch events from DB — only show in hero if entries exist
  const dbEvents = await fetchEvents();

  return (
    <>
      <HeroSection dbEvents={dbEvents} />
      <AboutSection />
      <SocialSection />
      <OccasionsSection />
      <ClientsStrip />
      <BookingCTA />
    </>
  );
}

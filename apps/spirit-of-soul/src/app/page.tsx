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
  title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
  description: "Spirit of Soul – Soulband, Eventband, Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events aller Art",
  keywords: ["Soulband Frankfurt", "Partyband Rhein-Main", "Soul Motown R&B Hiphop", "Band Hochzeit Frankfurt", "Liveband Firmenevent", "Spirit of Soul", "Hochzeit Eventband Partyband", "Black Music", "Schausteller Party", "Soul Musik Soulmusik"],
  alternates: { canonical: "https://spirit-of-soul.de" },
  openGraph: {
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: "Spirit of Soul – Soulband, Eventband, Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events aller Art",
    url: "https://spirit-of-soul.de",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: "Spirit of Soul – Soulband, Eventband, Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events aller Art",
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

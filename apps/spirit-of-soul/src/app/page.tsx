import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import OccasionsSection from "@/components/OccasionsSection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
  description: "Spirit of Soul – 25 Jahre Soulband aus Frankfurt am Main. Soul, R&B und Funk für Hochzeiten, Firmenevents und Festivals. Entertainment der Extraklasse. Jetzt buchen.",
  keywords: ["Soulband Frankfurt", "Partyband Rhein-Main", "Soulband buchen", "Band Hochzeit Frankfurt", "Liveband Firmenevent", "Spirit of Soul"],
  alternates: { canonical: "https://spirit-of-soul.de" },
  openGraph: {
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre Soulband aus Frankfurt am Main. Soul, R&B und Funk für Hochzeiten, Firmenevents und Festivals. Entertainment der Extraklasse. Jetzt buchen.",
    url: "https://spirit-of-soul.de",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre Soulband aus Frankfurt am Main. Soul, R&B und Funk für Hochzeiten, Firmenevents und Festivals. Entertainment der Extraklasse. Jetzt buchen.",
  },
    robots: { index: true, follow: true },
};



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SocialSection />
      <OccasionsSection />
      <ClientsStrip />
      <BookingCTA />
    </>
  );
}

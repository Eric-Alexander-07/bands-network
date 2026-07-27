export const revalidate = 3600; // re-render at most once per hour; admin mutations trigger instant revalidation via revalidatePath

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import OccasionsSection from "@/components/OccasionsSection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";
import { fetchEvents, fetchReferenzen } from "@/lib/data";

import type { Metadata } from "next";

// Ein einziger, natürlich lesbarer Beschreibungssatz — bewusst als vollständiger
// Satz formuliert und < 160 Zeichen, damit Google ihn als Snippet übernimmt
// statt ihn durch Seitentext zu ersetzen.
const HOME_DESCRIPTION =
  "Soulband, Eventband und Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events.";

export const metadata: Metadata = {
  title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
  description: HOME_DESCRIPTION,
  keywords: ["Soulband Frankfurt", "Spirit of Soul", "Liveband Frankfurt", "Band buchen Hochzeit", "Partyband Rhein-Main"],
  alternates: { canonical: "https://spiritofsoul.com" },
  openGraph: {
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: HOME_DESCRIPTION,
    url: "https://spiritofsoul.com",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    description: HOME_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};



export default async function HomePage() {
  // Events + Referenzen parallel laden. Die Referenzen speisen die
  // "Bekannte Veranstalter"-Leiste aus derselben Quelle wie /referenzen,
  // damit Startseite und Referenzseite nicht auseinanderlaufen.
  const [dbEvents, dbRefs] = await Promise.all([fetchEvents(), fetchReferenzen()]);

  return (
    <>
      <HeroSection dbEvents={dbEvents} />
      <AboutSection />
      <SocialSection />
      <OccasionsSection />
      <ClientsStrip dbRefs={dbRefs} />
      <BookingCTA />
    </>
  );
}

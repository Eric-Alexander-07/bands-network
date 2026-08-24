export const revalidate = 3600; // re-render at most once per hour; admin mutations trigger instant revalidation via revalidatePath

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import OccasionsSection from "@/components/OccasionsSection";
import ClientsStrip from "@/components/ClientsStrip";
import BookingCTA from "@/components/BookingCTA";
import { fetchBundle, events, referenzen, sectionImages } from "@/lib/data";
import { resolve } from "@/lib/content";

import type { Metadata } from "next";

const DESCRIPTION =
  "Die Partyband aus Frankfurt am Main bietet ein breites Pop & Rock Repertoire für Firmenevents, Galas, Stadtfeste und Hochzeiten.";

export const metadata: Metadata = {
  title: "Groove Control – Die Partyband aus Frankfurt am Main",
  description: DESCRIPTION,
  keywords: ["Partyband Frankfurt", "Livemusik buchen", "Hochzeitsband Frankfurt", "Firmenevent Band", "Coverband Rhein-Main", "Galaband", "Funk Soul Band", "Groove Control", "Eventband", "Livemusik Frankfurt"],
  alternates: { canonical: "https://groovecontrol.info" },
  openGraph: {
    title: "Groove Control – Die Partyband aus Frankfurt am Main",
    description: DESCRIPTION,
    url: "https://groovecontrol.info",
    images: [{ url: "https://groovecontrol.info/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Groove Control – Die Partyband aus Frankfurt am Main",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};



export default async function HomePage() {
  // Events + Referenzen parallel laden. Die Referenzen speisen die
  // "Bekannte Veranstalter"-Leiste aus derselben Quelle wie /referenzen,
  // damit Startseite und Referenzseite nicht auseinanderlaufen.
  const bundle = await fetchBundle();
  const dbEvents = events(bundle);
  const dbRefs = referenzen(bundle);
  const c = resolve(bundle, "home");

  return (
    <>
      <HeroSection dbEvents={dbEvents} c={c} />
      <AboutSection c={c} />
      <SocialSection c={c} />
      <OccasionsSection c={c} photos={sectionImages(bundle, "occasions")} />
      <ClientsStrip dbRefs={dbRefs} />
      <BookingCTA c={c} />
    </>
  );
}

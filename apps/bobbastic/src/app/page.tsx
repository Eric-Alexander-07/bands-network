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

const HOME_DESCRIPTION =
  "BOBbastic ist das Party Rocktrio aus Frankfurt, Darmstadt und Aschaffenburg für Firmenfeiern, Stadtfeste und Hochzeiten.";

export const metadata: Metadata = {
  title: "BOBbastic – Das Party Rocktrio | Rockband Rhein-Main",
  description: HOME_DESCRIPTION,
  keywords: ["Party Rockband", "Rockband buchen", "Coverband Rock", "BOBbastic Band", "Liveband Firmenevent", "Rockband Hochzeit", "Partyband Rock", "Rock Cover Band", "Vivid Music Productions", "Entertainment Firmenevent"],
  alternates: { canonical: "https://bobbastic.de" },
  openGraph: {
    title: "BOBbastic – Das Party Rocktrio",
    description: HOME_DESCRIPTION,
    url: "https://bobbastic.de",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOBbastic – Das Party Rocktrio",
    description: HOME_DESCRIPTION,
  },
    robots: { index: true, follow: true },
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
      <OccasionsSection c={c} photos={sectionImages(bundle, "tribute")} />
      <ClientsStrip dbRefs={dbRefs} />
      <BookingCTA c={c} />
    </>
  );
}

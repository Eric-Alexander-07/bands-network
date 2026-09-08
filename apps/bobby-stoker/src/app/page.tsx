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
  "Bobby Stoker Band live: Blues Rock und Classic Rock mit Eigenkompositionen aus dem Album „Everglow“ für Ihr Event im Rhein-Main-Gebiet.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Bobby Stoker Band – Blues Rock & Classic Rock buchen" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker Band", "Bobby Stoker", "Blues Rock Band buchen", "Everglow Album", "Rockband buchen", "Livemusik Rhein-Main", "Classic Rock Band", "Festivalband", "Rockshow buchen"],
  alternates: { canonical: "https://bobbystoker.com" },
  openGraph: {
    title: "Bobby Stoker Band – Blues Rock & Classic Rock buchen",
    description: DESCRIPTION,
    url: "https://bobbystoker.com",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby Stoker Band – Blues Rock & Classic Rock buchen",
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

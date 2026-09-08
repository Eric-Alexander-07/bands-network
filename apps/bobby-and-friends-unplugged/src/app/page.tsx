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
  "Bobby & Friends Unplugged: Gitarre und Gesang von Bobby Stöcker live für Ihr Wohnzimmerkonzert, Dinner, Ihre Hochzeit oder Feier.";

export const metadata: Metadata = {
  title: "Bobby & Friends Unplugged – Live-Akustikmusik",
  description: DESCRIPTION,
  keywords: ["Unplugged Band buchen", "Wohnzimmerkonzert Frankfurt", "Hauskonzert Musiker", "Akustikduo Hochzeit", "Dinnermusik Rhein-Main", "Gitarre und Gesang buchen", "Bobby Stöcker", "Loungemusik Firmenevent", "Livemusik Weinprobe", "Bobby & Friends Unplugged"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de" },
  openGraph: {
    title: "Bobby & Friends Unplugged – Live-Akustikmusik",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby & Friends Unplugged – Live-Akustikmusik",
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

export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Videos, Auftritte und Neuigkeiten von Bobby & Friends Unplugged – Unplugged-Klassiker aus vier Jahrzehnten, handgemacht live gespielt.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Media & News – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Bobby & Friends Videos", "Unplugged Liveband Video", "Konzerttermine Akustik", "Social Media Musiker", "Instagram Bobby Stöcker"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/media" },
  openGraph: {
    title: "Media & News – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/media",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – Bobby & Friends Unplugged",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import MediaPage from "@/components/MediaPage";
import { fetchBundle, events, videosWithTitles, socialLinks as pickSocial } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Media() {
  const bundle = await fetchBundle();
  const dbEvents = events(bundle);
  const c = resolve(bundle, "media");
  const socialLinks = pickSocial(bundle);
  // Einziger zusaetzlicher Aufruf: YouTube-Titel (externes oEmbed, 24 h gecached)
  const dbVideos = await videosWithTitles(bundle);
  return <MediaPage dbEvents={dbEvents} dbVideos={dbVideos} c={c} socialLinks={socialLinks} />;
}

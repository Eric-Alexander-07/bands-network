export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & News – WE ROCK | Videos & Konzerttermine",
  description: "WE ROCK Live-Videos und aktuelle Konzerttermine. Informieren Sie sich über aktuelle Tourdaten.",
  keywords: ["WE ROCK Live Video", "Classic Rock Konzert", "Konzerttermine", "Tour Daten", "Tribute Show Video", "News"],
  alternates: { canonical: "https://werock-rockband.de/media" },
  openGraph: {
    title: "Media & News – WE ROCK | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von WE ROCK. Classic Rock & Hardrock live.",
    url: "https://werock-rockband.de/media",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – WE ROCK | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von WE ROCK. Classic Rock & Hardrock live.",
  },
    robots: { index: true, follow: true },
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

export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
  description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
  keywords: ["Spirit of Soul Videos", "Tourdates", "Live Soul Frankfurt", "Konzerttermine", "Eventband Musikband", "Tour Daten", "Konzert Videos", "Youtube Videos"],
  alternates: { canonical: "https://spiritofsoul.com/media" },
  openGraph: {
    title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
    url: "https://spiritofsoul.com/media",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
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

export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
  description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
  keywords: ["Spirit of Soul Videos", "Tourdates", "Live Soul Frankfurt", "Konzerttermine", "Eventband Musikband", "Tour Daten", "Konzert Videos", "Youtube Videos"],
  alternates: { canonical: "https://spirit-of-soul.de/media" },
  openGraph: {
    title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
    url: "https://spirit-of-soul.de/media",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – Spirit of Soul | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live.",
  },
    robots: { index: true, follow: true },
};

import MediaPage from "@/components/MediaPage";
import { fetchEvents, fetchVideos, fetchPageContent, fetchSocialLinks } from "@/lib/data";

export default async function Media() {
  const [dbEvents, dbVideos, content, socialLinks] = await Promise.all([
    fetchEvents(), fetchVideos(), fetchPageContent("media"), fetchSocialLinks(),
  ]);
  return <MediaPage dbEvents={dbEvents} dbVideos={dbVideos} content={content} socialLinks={socialLinks} />;
}

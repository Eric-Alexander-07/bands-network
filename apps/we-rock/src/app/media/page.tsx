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
import { fetchEvents, fetchVideos, fetchPageContent, fetchSocialLinks } from "@/lib/data";

export default async function Media() {
  const [dbEvents, dbVideos, content, socialLinks] = await Promise.all([
    fetchEvents(), fetchVideos(), fetchPageContent("media"), fetchSocialLinks(),
  ]);
  return <MediaPage dbEvents={dbEvents} dbVideos={dbVideos} content={content} socialLinks={socialLinks} />;
}

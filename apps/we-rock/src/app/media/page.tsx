export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & News – WE ROCK | Videos & Konzerttermine",
  description: "Aktuelle Spieltermine, Videos und News von WE ROCK. Classic Rock & Hardrock live erleben.",
  keywords: ["WE ROCK Videos", "Classic Rock Konzerttermine", "Rockband Live-Videos", "WE ROCK Tourdates", "Rock Tribute Show Termine", "Classic Rock YouTube"],
  alternates: { canonical: "https://we-rock.de/media" },
  openGraph: {
    title: "Media & News – WE ROCK | Videos & Konzerttermine",
    description: "Aktuelle Spieltermine, Videos und News von WE ROCK. Classic Rock & Hardrock live.",
    url: "https://we-rock.de/media",
    images: [{ url: "https://we-rock.de/images/about.webp" }],
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

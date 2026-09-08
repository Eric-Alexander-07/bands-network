export const revalidate = 3600;

import type { Metadata } from "next";

const MEDIA_DESCRIPTION =
  "BOBbastic zeigt aktuelle Live-Videos, Fotos und Konzerttermine des Party Rocktrios aus der Rhein-Main-Region.";

export const metadata: Metadata = {
  title: "Media & News – BOBbastic | Videos & Termine",
  description: MEDIA_DESCRIPTION,
  keywords: ["BOBbastic Live Video", "Konzerttermine", "Tourdaten", "Rockband News", "Party Rocktrio Video"],
  alternates: { canonical: "https://bobbastic.de/media" },
  openGraph: {
    title: "Media & News – BOBbastic",
    description: MEDIA_DESCRIPTION,
    url: "https://bobbastic.de/media",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – BOBbastic",
    description: MEDIA_DESCRIPTION,
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

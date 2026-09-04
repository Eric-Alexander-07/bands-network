export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "CoverSnake live erleben: aktuelle Videos, kommende Spieltermine und Neuigkeiten der Whitesnake-Tributeband aus dem Rhein-Main-Gebiet.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Media & News – CoverSnake | Videos & Termine" },
  description: DESCRIPTION,
  keywords: ["CoverSnake Videos", "Whitesnake Tribute Video", "Konzerttermine", "Tourdaten Band", "Livevideo Rockband", "Instagram Band", "Band News"],
  alternates: { canonical: "https://coversnake.com/media" },
  openGraph: {
    title: "Media & News – CoverSnake | Videos & Termine",
    description: DESCRIPTION,
    url: "https://coversnake.com/media",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – CoverSnake | Videos & Termine",
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

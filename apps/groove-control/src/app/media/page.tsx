export const revalidate = 3600;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control live erleben: aktuelle Videos, Spieltermine und Neuigkeiten der Partyband Deluxe aus Frankfurt am Main.";

export const metadata: Metadata = {
  title: "Media & News – Groove Control | Videos und Termine",
  description: DESCRIPTION,
  keywords: ["Groove Control Videos", "Livevideo Partyband", "Spieltermine", "Band News", "Liveband Video"],
  alternates: { canonical: "https://groovecontrol.de/media" },
  openGraph: {
    title: "Media & News – Groove Control | Videos und Termine",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/media",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – Groove Control | Videos und Termine",
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

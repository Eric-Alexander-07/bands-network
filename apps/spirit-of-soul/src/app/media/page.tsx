import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & News – Spirit of Soul | Videos & Spieltermine",
  description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live – Eindrücke von Konzerten, Hochzeiten und Firmenevents.",
  keywords: ["Spirit of Soul Videos", "Soulband Spieltermine", "Live Soul Frankfurt", "Partyband Video"],
  alternates: { canonical: "https://spirit-of-soul.de/media" },
  openGraph: {
    title: "Media & News – Spirit of Soul | Videos & Spieltermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live – Eindrücke von Konzerten, Hochzeiten und Firmenevents.",
    url: "https://spirit-of-soul.de/media",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News – Spirit of Soul | Videos & Spieltermine",
    description: "Aktuelle Spieltermine, Videos und News von Spirit of Soul. Erleben Sie Soul, R&B und Funk live – Eindrücke von Konzerten, Hochzeiten und Firmenevents.",
  },
    robots: { index: true, follow: true },
};

import MediaPage from "@/components/MediaPage";

export default function Media() {
  return <MediaPage />;
}

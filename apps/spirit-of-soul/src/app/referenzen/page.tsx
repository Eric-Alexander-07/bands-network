import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – Spirit of Soul | Kunden & Events",
  description: "Spirit of Soul – vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
  keywords: ["Spirit of Soul Referenzen", "Soulband Firmenevent", "Liveband Hochzeit Referenzen"],
  alternates: { canonical: "https://spirit-of-soul.de/referenzen" },
  openGraph: {
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Spirit of Soul – vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
    url: "https://spirit-of-soul.de/referenzen",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Spirit of Soul – vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
  },
    robots: { index: true, follow: true },
};

import ReferencesPage from "@/components/ReferencesPage";

export default function Referenzen() {
  return <ReferencesPage />;
}

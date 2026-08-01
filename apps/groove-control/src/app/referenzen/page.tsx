export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control spielt seit über 15 Jahren für Konzerne, Agenturen und Privatkunden. Eine Auswahl der bisherigen Kunden und Events.";

export const metadata: Metadata = {
  title: "Referenzen – Groove Control | Kunden und Events",
  description: DESCRIPTION,
  keywords: ["Groove Control Referenzen", "Partyband Kunden", "Firmenevent Band", "Eventband Referenzen"],
  alternates: { canonical: "https://groovecontrol.de/referenzen" },
  openGraph: {
    title: "Referenzen – Groove Control | Kunden und Events",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/referenzen",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – Groove Control | Kunden und Events",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import ReferencesPage from "@/components/ReferencesPage";
import { fetchBundle, referenzen, partnerGruppen } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Referenzen() {
  const bundle = await fetchBundle();
  return <ReferencesPage refs={referenzen(bundle)} c={resolve(bundle, "referenzen")} partnerGruppen={partnerGruppen(bundle)} />;
}

export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Groove Control spielt seit über 15 Jahren für die größten Firmen, Agenturen und High Class Events. Hier eine Auswahl der bisherigen Kunden.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Groove Control") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Referenzen – Groove Control | Kunden und Events" },
  description: DESCRIPTION,
  keywords: ["Groove Control Referenzen", "Partyband Kunden", "Firmenevent", "Incentives", "Band Referenzen", "Kundenauswahl"],
  alternates: { canonical: "https://groovecontrol.info/referenzen" },
  openGraph: {
    title: "Referenzen – Groove Control | Kunden und Events",
    description: DESCRIPTION,
    url: "https://groovecontrol.info/referenzen",
    images: [{ url: "https://groovecontrol.info/images/og-image.jpg", width: 1200, height: 630 }],
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

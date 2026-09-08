export const revalidate = 86400;

import type { Metadata } from "next";

const REFERENZEN_DESCRIPTION =
  "Referenzen von BOBbastic sowie das Partner-Netzwerk aus dem VMP-Künstlerpool für Events jeder Größe.";

export const metadata: Metadata = {
  title: "Referenzen – BOBbastic",
  description: REFERENZEN_DESCRIPTION,
  keywords: ["BOBbastic Referenzen", "Künstlerpool", "Partyband Rhein-Main", "VMP Künstlerpool", "Rockband Referenzen"],
  alternates: { canonical: "https://bobbastic.de/referenzen" },
  openGraph: {
    title: "Referenzen – BOBbastic",
    description: REFERENZEN_DESCRIPTION,
    url: "https://bobbastic.de/referenzen",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – BOBbastic",
    description: REFERENZEN_DESCRIPTION,
  },
    robots: { index: true, follow: true },
};

import ReferencesPage from "@/components/ReferencesPage";
import { fetchBundle, referenzen, partnerGruppen } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Referenzen() {
  const bundle = await fetchBundle();
  return <ReferencesPage refs={referenzen(bundle)} c={resolve(bundle, "referenzen")} partnerGruppen={partnerGruppen(bundle)} />;
}

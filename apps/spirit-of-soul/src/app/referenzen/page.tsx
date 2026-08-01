export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – Spirit of Soul | Kunden & Events",
  description: "Uns vertrauen BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
  keywords: ["Spirit of Soul Referenzen", "Soulband Firmenevent", "Liveband Hochzeit Referenzen", "Festivals", "Incentives", "High Class Events", "Stadtfeste", "Clubs Diskotheken"],
  alternates: { canonical: "https://spiritofsoul.com/referenzen" },
  openGraph: {
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Uns vertrauen BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
    url: "https://spiritofsoul.com/referenzen",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Uns vertrauen BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
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

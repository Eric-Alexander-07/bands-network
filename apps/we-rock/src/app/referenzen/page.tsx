export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen – Spirit of Soul | Kunden & Events",
  description: "Vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
  keywords: ["Spirit of Soul Referenzen", "Soulband Firmenevent", "Liveband Hochzeit Referenzen", "Festivals", "Incentives", "High Class Events", "Stadtfeste", "Clubs Diskotheken"],
  alternates: { canonical: "https://we-rock.de/referenzen" },
  openGraph: {
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
    url: "https://we-rock.de/referenzen",
    images: [{ url: "https://we-rock.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – Spirit of Soul | Kunden & Events",
    description: "Vertrauen uns BMW, Siemens AG, Alte Oper Frankfurt und viele mehr. Hochzeiten, Galas und Firmenevents europaweit.",
  },
    robots: { index: true, follow: true },
};

import ReferencesPage from "@/components/ReferencesPage";
import { fetchReferenzen } from "@/lib/data";

export default async function Referenzen() {
  const refs = await fetchReferenzen();
  return <ReferencesPage refs={refs} />;
}

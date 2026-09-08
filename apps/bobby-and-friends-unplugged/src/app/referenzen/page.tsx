export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby & Friends Unplugged spielt seit vielen Jahren für Firmenevents, Hochzeiten und private Feiern – eine Auswahl bisheriger Auftraggeber.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Referenzen – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Bobby & Friends Unplugged Referenzen", "Unplugged Band Kunden", "Firmenevent Musiker Referenzen", "Hochzeitsmusiker Referenzen"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/referenzen" },
  openGraph: {
    title: "Referenzen – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/referenzen",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen – Bobby & Friends Unplugged",
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

export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "CoverSnake ist Teil des Künstlerpools von Vivid Music Productions — hier finden Sie Referenzen, Partner und das Netzwerk der Band.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Referenzen & Netzwerk – CoverSnake" },
  description: DESCRIPTION,
  keywords: ["CoverSnake Referenzen", "Vivid Music Productions", "Künstlerpool", "Band Partner", "Veranstalter Referenzen", "Festival Booking"],
  alternates: { canonical: "https://coversnake.com/referenzen" },
  openGraph: {
    title: "Referenzen & Netzwerk – CoverSnake",
    description: DESCRIPTION,
    url: "https://coversnake.com/referenzen",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referenzen & Netzwerk – CoverSnake",
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

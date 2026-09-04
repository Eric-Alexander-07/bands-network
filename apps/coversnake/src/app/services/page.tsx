export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "CoverSnake spielt 90 bis 120 Minuten Whitesnake — von Here I Go Again bis Still of the Night, auf Wunsch mit LED-Walls und großer Lichtshow.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | CoverSnake") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Show & Repertoire – CoverSnake | Setlist" },
  description: DESCRIPTION,
  keywords: ["Whitesnake Songs live", "Here I Go Again live", "Still of the Night live", "Tributeband Repertoire", "Setlist Rockband", "Bandbesetzung", "Bühnentechnik Band"],
  alternates: { canonical: "https://coversnake.com/services" },
  openGraph: {
    title: "Show & Repertoire – CoverSnake | Setlist",
    description: DESCRIPTION,
    url: "https://coversnake.com/services",
    images: [{ url: "https://coversnake.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Show & Repertoire – CoverSnake | Setlist",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle, besetzung } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} dbBesetzung={besetzung(bundle)} />;
}

export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "The Adams Family spielt rund zwei Stunden Show mit allen Bryan-Adams-Klassikern, dazu ein akustisches Unplugged-Set nach MTV-Vorbild.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | The Adams Family") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Show & Repertoire – The Adams Family | Setlist" },
  description: DESCRIPTION,
  keywords: ["Bryan Adams Songs live", "Summer of 69 live", "Unplugged Set", "Tributeband Repertoire", "Setlist Rockband", "Bandbesetzung", "Bühnentechnik Band"],
  alternates: { canonical: "https://theadamsfamily.de/services" },
  openGraph: {
    title: "Show & Repertoire – The Adams Family | Setlist",
    description: DESCRIPTION,
    url: "https://theadamsfamily.de/services",
    images: [{ url: "https://theadamsfamily.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Show & Repertoire – The Adams Family | Setlist",
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

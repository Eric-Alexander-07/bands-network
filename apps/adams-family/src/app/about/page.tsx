export const revalidate = 86400;

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

const DESCRIPTION =
  "The Adams Family spielt in fester Quintett-Besetzung erfolgreich Clubs, Festivals und große Events im gesamten Bundesgebiet und darüber hinaus.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | The Adams Family") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Die Band – The Adams Family | Bryan Adams Tribute" },
  description: DESCRIPTION,
  keywords: ["The Adams Family", "Bryan Adams Tributeband", "Bryan Adams Cover", "Bobby Stöcker", "Rockband", "Musiker", "Eventband", "Tribute Band", "Deutschland", "Livemusiker", "Bandportrait"],
  alternates: { canonical: "https://theadamsfamily.de/about" },
  openGraph: {
    title: "Die Band – The Adams Family | Bryan Adams Tribute",
    description: DESCRIPTION,
    url: "https://theadamsfamily.de/about",
    images: [{ url: "https://theadamsfamily.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Band – The Adams Family | Bryan Adams Tribute",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import AboutPage from "@/components/AboutPage";
import { fetchBundle, members } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function About() {
  const bundle = await fetchBundle();
  return (
    <>
      <JsonLd data={breadcrumbSchema("Die Band", "/about")} />
      <AboutPage c={resolve(bundle, "about")} members={members(bundle)} />
    </>
  );
}

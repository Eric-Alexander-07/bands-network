export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby Stöcker spielt seit vier Jahrzehnten Gitarre und Gesang – reduziert nach dem Motto „Weniger ist mehr“, unplugged pur.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Über uns – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Bobby Stöcker Musiker", "Unplugged Gitarrist Sänger", "Akustikmusiker Rhein-Main", "Singer Songwriter buchen", "Musiker Biografie"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/about" },
  openGraph: {
    title: "Über uns – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/about",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – Bobby & Friends Unplugged",
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
  return <AboutPage c={resolve(bundle, "about")} members={members(bundle)} />;
}

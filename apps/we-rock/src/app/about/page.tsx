export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – WE ROCK | Classic Rock Tribute Show",
  description: "WE ROCK – Die Rock Coverband aus der Rhein-Main-Region bringt die größten Rock Hymnen authentisch auf die Bühne.",
  keywords: ["WE ROCK Band", "Classic Rock Tribute", "Emmo Acar", "Jessica Conte", "Bobby Stöcker", "Rockband Rhein-Main", "Profimusiker", "Rock", "Hard Rock Band", "Rockshow", "Liveband", "Hochzeitsband", "Darmstadt", "Aschaffenburg", "Frankfurt am Main"],
  alternates: { canonical: "https://werock-rockband.de/about" },
  openGraph: {
    title: "Über uns – WE ROCK | Classic Rock Tribute Show",
    description: "7 Profimusiker, 4 Sänger — Classic Rock & Hardrock live aus der Rhein-Main-Region.",
    url: "https://werock-rockband.de/about",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – WE ROCK | Classic Rock Tribute Show",
    description: "7 Profimusiker, 4 Sänger — Classic Rock & Hardrock live aus der Rhein-Main-Region.",
  },
    robots: { index: true, follow: true },
};

import AboutPage from "@/components/AboutPage";
import { fetchBundle, members } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function About() {
  const bundle = await fetchBundle();
  return <AboutPage c={resolve(bundle, "about")} members={members(bundle)} />;
}

export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – WE ROCK | Classic Rock Tribute Show",
  description: "WE ROCK – Die Rock Coverband aus der Rhein-Main-Region bringt die größten Rock Hymnen authentisch auf die Bühne.",
  keywords: ["WE ROCK Band", "Classic Rock Tribute", "Emmo Acar", "Jessica Conte", "Bobby Stöcker", "Rockband Rhein-Main", "Profimusiker", "Rock", "Hard Rock Band", "Rockshow", "Liveband", "Hochzeitsband", "Darmstadt", "Aschaffenburg", "Frankfurt am Main"],
  alternates: { canonical: "https://we-rock.de/about" },
  openGraph: {
    title: "Über uns – WE ROCK | Classic Rock Tribute Show",
    description: "7 Profimusiker, 4 Sänger — Classic Rock & Hardrock live aus der Rhein-Main-Region.",
    url: "https://we-rock.de/about",
    images: [{ url: "https://we-rock.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – WE ROCK | Classic Rock Tribute Show",
    description: "7 Profimusiker, 4 Sänger — Classic Rock & Hardrock live aus der Rhein-Main-Region.",
  },
    robots: { index: true, follow: true },
};

import AboutPage from "@/components/AboutPage";
import { fetchPageContent } from "@/lib/data";

export default async function About() {
  const content = await fetchPageContent("about");
  return <AboutPage content={content} />;
}

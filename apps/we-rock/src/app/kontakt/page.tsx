import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

export const metadata: Metadata = {
  title: "Kontakt – WE ROCK | Classic Rock Band anfragen",
  description: "WE ROCK kontaktieren — Classic Rock Tribute Show aus Groß-Umstadt. Anfragen für Festivals, Firmenevents und private Feiern. Vivid Music Productions.",
  keywords: ["WE ROCK Kontakt", "Rockband anfragen", "Classic Rock Band buchen", "Vivid Music Productions", "Liveband Rhein-Main"],
  alternates: { canonical: "https://werock-rockband.de/kontakt" },
  openGraph: {
    title: "Kontakt – WE ROCK | Classic Rock Band anfragen",
    description: "WE ROCK kontaktieren — Classic Rock Tribute Show aus Groß-Umstadt.",
    url: "https://werock-rockband.de/kontakt",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – WE ROCK | Classic Rock Band anfragen",
    description: "WE ROCK kontaktieren — Classic Rock Tribute Show aus Groß-Umstadt.",
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

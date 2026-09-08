import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const DESCRIPTION =
  "Bobby & Friends Unplugged kontaktieren – für Anfragen rund um Wohnzimmerkonzerte, Dinnermusik und Hochzeiten im Rhein-Main-Gebiet.";

export const metadata: Metadata = {
  title: { absolute: "Kontakt – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Bobby & Friends Unplugged Kontakt", "Wohnzimmerkonzert Rhein-Main", "Vivid Music Productions"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/kontakt" },
  openGraph: {
    title: "Kontakt – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/kontakt",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – Bobby & Friends Unplugged",
    description: DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const DESCRIPTION =
  "Bobby Stoker Band kontaktieren — Blues Rock und Classic Rock aus dem Rhein-Main-Gebiet für Festivals, Clubs und Firmenevents.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt – Bobby Stoker Band | Blues Rock & Classic Rock" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker Kontakt", "Bobby Stoker Band", "Vivid Music Productions"],
  alternates: { canonical: "https://bobbystoker.com/kontakt" },
  openGraph: {
    title: "Kontakt – Bobby Stoker Band | Blues Rock & Classic Rock",
    description: DESCRIPTION,
    url: "https://bobbystoker.com/kontakt",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – Bobby Stoker Band | Blues Rock & Classic Rock",
    description: DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

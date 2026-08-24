import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

const DESCRIPTION =
  "Groove Control kontaktieren. Die Partyband Deluxe aus Frankfurt am Main für Firmenevents, Galas und Hochzeiten.";

export const metadata: Metadata = {
  title: { absolute: "Kontakt – Groove Control | Partyband Frankfurt" },
  description: DESCRIPTION,
  keywords: ["Groove Control Kontakt", "Partyband Frankfurt", "Vivid Music Productions"],
  alternates: { canonical: "https://groovecontrol.de/kontakt" },
  openGraph: {
    title: "Kontakt – Groove Control | Partyband Frankfurt",
    description: DESCRIPTION,
    url: "https://groovecontrol.de/kontakt",
    images: [{ url: "https://groovecontrol.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – Groove Control | Partyband Frankfurt",
    description: DESCRIPTION,
  },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

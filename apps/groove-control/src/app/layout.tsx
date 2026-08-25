import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Michroma, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

// Michroma greift die breite, geometrische Wortmarke auf — ausschliesslich
// fuer Ueberschriften. Die Schrift hat genau einen Schnitt (400) und keine
// Kursive: Hierarchie entsteht ueber Groesse und Farbe, nie ueber das Gewicht.
const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

// Space Grotesk fuer alles Uebrige: Fliesstext, Navigation, Buttons, Labels.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-space",
  display: "swap",
});

/**
 * Domain wird an dieser einen Stelle gesetzt und von `robots.ts`, `sitemap.ts`
 * sowie allen `canonical`- und OpenGraph-URLs uebernommen — beim Wechsel
 * also hier und in den beiden genannten Dateien anpassen.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://groovecontrol.info";

const DESCRIPTION =
  "Groove Control – die Partyband Deluxe aus Frankfurt am Main. Livemusik für Firmenevents, Galas und Hochzeiten, seit über 15 Jahren bundesweit.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Groove Control – Die Partyband Deluxe aus Frankfurt am Main",
    template: "%s | Groove Control",
  },
  description: DESCRIPTION,
  keywords: [
    "Partyband Frankfurt",
    "Liveband Firmenevent",
    "Hochzeitsband Frankfurt",
    "Groove Control Band",
    "Coverband buchen",
    "Galaband",
    "Funk Soul Liveband",
    "Eventband Rhein-Main",
    "Vivid Music Productions",
    "Livemusik Firmenfeier",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "Groove Control",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Groove Control",
    title: "Groove Control – Die Partyband Deluxe aus Frankfurt am Main",
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Groove Control – Die Partyband Deluxe aus Frankfurt am Main",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Groove Control – Die Partyband Deluxe aus Frankfurt am Main",
    description: DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const musicGroupSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Groove Control",
  alternateName: "Groove Control – Die Partyband Deluxe",
  description:
    "Groove Control ist eine professionelle Partyband aus Frankfurt am Main. Von Dinner- und Loungemusik über Funk und Soul bis zu Pop- und Rock-Partysongs — buchbar vom Sextett bis zur neunköpfigen XL-Besetzung.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  telephone: "+49 6078 759568",
  foundingDate: "2010",
  genre: ["Funk", "Soul", "Pop", "Dance", "Partyband"],
  image: `${BASE_URL}/images/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 50.1109, longitude: 8.6821 },
    geoRadius: "1000000",
  },
  // Nur belegte Profile eintragen — erfundene Links schaden der Auswertung.
  sameAs: [
    "https://instagram.com/groovecontrol_band",
    "https://www.facebook.com/partybanddeluxe",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${michroma.variable} ${spaceGrotesk.variable}`}>
      <body>
        <InviteHashHandler />
        <JsonLd data={musicGroupSchema} />
        <SiteWrapper
          nav={<Navigation />}
          footer={<Footer />}
          scrollAnimations={<ScrollAnimations />}
        >
          <main>{children}</main>
        </SiteWrapper>
      </body>
    </html>
  );
}

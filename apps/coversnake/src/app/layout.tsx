import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

// Oswald traegt die Ueberschriften — schmal, hoch, plakativ wie ein
// Konzertaushang. Die Enge der Schrift laesst lange Songtitel und
// Bandnamen auch in grossen Graden noch in eine Zeile passen.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Inter fuer Fliesstext, Navigation, Buttons und Formulare.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// IBM Plex Mono ausschliesslich fuer Labels ("eyebrow") — technische
// Beschriftung, nie fuer Fliesstext.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Domain der Band. `coversnake.com` gehoert bereits der Band und liefert
 * derzeit noch die alte Jimdo-Seite aus — beim Livegang muss die Domain auf
 * diese Anwendung zeigen.
 *
 * Der Wert wird von `robots.ts`, `sitemap.ts` sowie allen `canonical`- und
 * OpenGraph-URLs uebernommen. Zum Wechseln entweder `NEXT_PUBLIC_BASE_URL`
 * in `.env.local` setzen (wirkt sofort ueberall) oder diesen Wert hier UND
 * in `robots.ts` und `sitemap.ts` anpassen.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://coversnake.com";

const DESCRIPTION =
  "CoverSnake spielt die größten Whitesnake-Hits live — sechs Profimusiker, Bühnenshow mit LED-Walls und Licht, buchbar für Events in ganz Europa.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CoverSnake – Whitesnake Tributeband",
    template: "%s | CoverSnake",
  },
  description: DESCRIPTION,
  keywords: [
    "Whitesnake Tribute",
    "Whitesnake Tributeband",
    "CoverSnake Band",
    "Tributeband buchen",
    "Hard Rock Liveband",
    "Rockband Stadtfest",
    "Coverband Festival",
    "Livemusik Rhein-Main",
    "Vivid Music Productions",
    "Rockband für Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "CoverSnake",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "CoverSnake",
    title: "CoverSnake – Whitesnake Tributeband",
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "CoverSnake – Whitesnake Tributeband",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoverSnake – Whitesnake Tributeband",
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
  name: "CoverSnake",
  alternateName: "CoverSnake – A Tribute to Whitesnake",
  description:
    "CoverSnake ist eine sechsköpfige Whitesnake-Tributeband aus dem Rhein-Main-Gebiet. 90 bis 120 Minuten Hard Rock quer durch vier Jahrzehnte, auf Wunsch mit LED-Walls und großer Lichtshow.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  telephone: "+49 6078 759568",
  foundingDate: "2016",
  genre: ["Rock", "Hard Rock", "Tribute"],
  numberOfEmployees: 6,
  image: `${BASE_URL}/images/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Darmstadt",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.8728, longitude: 8.6512 },
    geoRadius: "1000000",
  },
  // Nur belegte Profile eintragen — erfundene Links schaden der Auswertung.
  sameAs: [
    "https://www.instagram.com/coversnake_band/",
    "https://www.facebook.com/CoverSnakeBand/",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${oswald.variable} ${inter.variable} ${plexMono.variable}`}>
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

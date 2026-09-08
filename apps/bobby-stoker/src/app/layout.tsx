import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

// Archivo traegt die Ueberschriften — schwer, schmal, blockhaft.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
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
 * Domain der Band: NOCH NICHT FINAL GEKLAERT (siehe Auftrag). Vorlaeufig auf
 * `bobbystoker.com` gesetzt — Bobby Stokers bestehende, eigene Domain, aktuell
 * die Website seines VMP-Künstlerpool-Eintrags. Sobald die endgueltige Domain
 * feststeht: hier UND in `robots.ts` UND in `sitemap.ts` anpassen (oder
 * `NEXT_PUBLIC_BASE_URL` in `.env.local` setzen, wirkt sofort ueberall).
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://bobbystoker.com";

const DESCRIPTION =
  "Bobby Stoker Band: handgemachter Blues Rock und Classic Rock mit Eigenkompositionen aus dem Album „Everglow“ für Clubs, Firmenevents und Festivals.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bobby Stoker Band – Blues Rock & Classic Rock live",
    template: "%s | Bobby Stoker Band",
  },
  description: DESCRIPTION,
  keywords: [
    "Bobby Stoker Band",
    "Bobby Stoker",
    "Blues Rock Band",
    "Classic Rock Band buchen",
    "Everglow Album",
    "Rockband buchen",
    "Livemusik Rhein-Main",
    "Bluesrock Livemusik",
    "Vivid Music Productions",
    "Entertainment Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "Bobby Stoker Band",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Bobby Stoker Band",
    title: "Bobby Stoker Band – Blues Rock & Classic Rock live",
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bobby Stoker Band – Blues Rock & Classic Rock live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby Stoker Band – Blues Rock & Classic Rock live",
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
  name: "Bobby Stoker Band",
  alternateName: "Bobby Stoker",
  description:
    "Die Bobby Stoker Band spielt handgemachten Blues Rock und Classic Rock mit Eigenkompositionen aus dem Album „Everglow“. Bobby Stoker (Gitarre, Gesang) mit Band für Clubs, Firmenevents und Festivals im Rhein-Main-Gebiet.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  telephone: "+49 6078 759568",
  genre: ["Blues Rock", "Classic Rock"],
  image: `${BASE_URL}/images/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Groß-Umstadt",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.8697, longitude: 8.9256 },
    geoRadius: "1000000",
  },
  // Nur belegte Profile eintragen — erfundene Links schaden der Auswertung.
  sameAs: [
    "https://www.instagram.com/bobbystoker/",
    "https://www.facebook.com/BobbyStokerBand/",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Oswald, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

// PLATZHALTER: Domain ist beim Anlegen dieser Seite noch nicht final geklärt.
// Vor dem Livegang HIER sowie in robots.ts und sitemap.ts durch die echte
// Domain ersetzen (siehe auch NEXT_PUBLIC_BASE_URL in .env.local / Hosting).
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://bobbastic.de";

const HOME_DESCRIPTION =
  "BOBbastic ist das Party Rocktrio aus Frankfurt, Darmstadt und Aschaffenburg für Firmenfeiern, Stadtfeste und Hochzeiten.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BOBbastic – Das Party Rocktrio | Rockband Rhein-Main",
    template: "%s | BOBbastic",
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "Party Rockband",
    "Rockband buchen",
    "Coverband Rock",
    "BOBbastic Band",
    "Liveband Firmenevent",
    "Rockband Hochzeit",
    "Partyband Rock",
    "Rock Cover Band",
    "Vivid Music Productions",
    "Entertainment Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "BOBbastic",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "BOBbastic",
    title: "BOBbastic – Das Party Rocktrio",
    description: HOME_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BOBbastic – Das Party Rocktrio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOBbastic – Das Party Rocktrio",
    description: HOME_DESCRIPTION,
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
  name: "BOBbastic",
  alternateName: "BOBbastic – Das Party Rocktrio",
  description:
    "BOBbastic ist ein Rock-Trio aus der Rhein-Main-Region (Frankfurt / Darmstadt / Aschaffenburg). Drei Musiker liefern ein rundum Rock-Coverprogramm von Klassikern bis zu aktuellen Charts-Hits für Firmenfeiern, Stadtfeste, Hochzeiten und private Feiern.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  genre: ["Rock", "Rock Cover", "Party Rock"],
  image: `${BASE_URL}/images/about.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.8677, longitude: 8.9311 },
    geoRadius: "1000000",
  },
  sameAs: [
    "https://www.facebook.com/BOBbasticRock/",
    "https://www.instagram.com/bobbastic_band/",
    "https://www.youtube.com/channel/UCo2mfOcAbJLsMY1OLr6Mk8w",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${anton.variable} ${oswald.variable} ${barlow.variable}`}>
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

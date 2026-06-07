import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const BASE_URL = "https://spirit-of-soul.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spirit of Soul – The Finest Of Black Music | Soulband Frankfurt",
    template: "%s | Spirit of Soul",
  },
  description:
    "Spirit of Soul – Soulband aus Frankfurt am Main seit 2000. The Finest Of Black Music für Hochzeiten, Firmenevents und Festivals. Entertainment der Extraklasse. Jetzt buchen.",
  keywords: [
    "Soulband Frankfurt",
    "Partyband Rhein-Main",
    "Band buchen Hochzeit",
    "Liveband Frankfurt",
    "R&B Band buchen",
    "Spirit of Soul",
    "Soulband buchen",
    "Coverband Frankfurt",
    "Vivid Music Productions",
    "Entertainment Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "Spirit of Soul",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Spirit of Soul",
    title: "Spirit of Soul – The Finest Of Black Music",
    description:
      "25 Jahre Soul, R&B und Funk auf internationalen Bühnen. Entertainment der Extraklasse für Hochzeiten, Firmenevents und Festivals.",
    images: [
      {
        url: `${BASE_URL}/images/about.webp`,
        width: 1200,
        height: 630,
        alt: "Spirit of Soul – Live Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spirit of Soul – The Finest Of Black Music",
    description:
      "25 Jahre Soul, R&B und Funk auf internationalen Bühnen. Soulband für Hochzeiten, Firmenevents und Festivals.",
    images: [`${BASE_URL}/images/about.webp`],
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
  name: "Spirit of Soul",
  alternateName: "Spirit of Soul – The Finest Of Black Music",
  description:
    "Spirit of Soul ist eine professionelle Soulband aus Frankfurt am Main. Seit 2000 steht die Band für Entertainment der Extraklasse – Soul, R&B und Funk für Hochzeiten, Firmenevents und Festivals.",
  url: BASE_URL,
  email: "booking@spirit-of-soul.de",
  foundingDate: "2000",
  genre: ["Soul", "R&B", "Funk", "Motown"],
  image: `${BASE_URL}/images/about.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 50.1109, longitude: 8.6821 },
    geoRadius: "500000",
  },
  sameAs: [
    "https://www.facebook.com/spiritofsoulband/",
    "https://instagram.com/bobbystoecker",
    "https://youtube.com/@spiritofsoul",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
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

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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://we-rock.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "We Rock – Die Classic Rock Tribute Show | Rockband Groß-Umstadt",
    template: "%s | We Rock",
  },
  description:
    "We Rock – Die Classic Rock Tribute Show aus Groß-Umstadt. Classic Rock & Hardrock für Festivals, Firmenevents und private Feiern. Laut, authentisch, unvergesslich.",
  keywords: [
    "Classic Rock Band",
    "Rockband buchen",
    "Tribute Show Classic Rock",
    "We Rock Band",
    "Liveband Firmenevent",
    "Rock Band Hochzeit",
    "Hard Rock Band",
    "Coverband Classic Rock",
    "Vivid Music Productions",
    "Entertainment Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "We Rock",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "We Rock",
    title: "We Rock – Die Classic Rock Tribute Show",
    description:
      "20+ Jahre Classic Rock & Hardrock live. Die authentische Tribute Show für Festivals, Firmenevents und private Feiern.",
    images: [
      {
        url: `${BASE_URL}/images/about.webp`,
        width: 1200,
        height: 630,
        alt: "We Rock – Live Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Rock – Die Classic Rock Tribute Show",
    description:
      "20+ Jahre Classic Rock live. Rockband für Festivals, Firmenevents und private Feiern.",
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
  name: "We Rock",
  alternateName: "We Rock – Die Classic Rock Tribute Show",
  description:
    "We Rock ist eine professionelle Classic Rock Tribute Show aus Groß-Umstadt. Sieben Profimusiker mit vier Sängern liefern eine mitreißende Rock-Show für Festivals, Firmenevents und private Feiern.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  foundingDate: "2005",
  genre: ["Classic Rock", "Hard Rock", "Tribute"],
  image: `${BASE_URL}/images/about.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Groß-Umstadt",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.8677, longitude: 8.9311 },
    geoRadius: "1000000",
  },
  sameAs: [
    "https://facebook.com/werockband",
    "https://instagram.com/werockband",
    "https://youtube.com/@werockband",
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

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
// Beschriftung im Beton-Look, nie fuer Fliesstext.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Domain der Band. `theadamsfamily.de` ist bereits auf die Band registriert
 * und leitet derzeit noch auf die alte Wix-Seite weiter — beim Livegang muss
 * diese Weiterleitung auf diese Anwendung zeigen.
 *
 * Der Wert wird von `robots.ts`, `sitemap.ts` sowie allen `canonical`- und
 * OpenGraph-URLs uebernommen. Zum Wechseln entweder `NEXT_PUBLIC_BASE_URL`
 * in `.env.local` setzen (wirkt sofort ueberall) oder diesen Wert hier UND
 * in `robots.ts` und `sitemap.ts` anpassen.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://theadamsfamily.de";

const DESCRIPTION =
  "The Adams Family ist die Bryan Adams Tributeband für Festivals, Stadtfeste und Clubs — zwei Stunden Rockshow inklusive Unplugged-Set.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "The Adams Family – Bryan Adams Tributeband",
    template: "%s | The Adams Family",
  },
  description: DESCRIPTION,
  keywords: [
    "Bryan Adams Tribute",
    "Bryan Adams Tributeband",
    "The Adams Family Band",
    "Tributeband buchen",
    "Rockband Stadtfest",
    "Coverband Festival",
    "Classic Rock Liveband",
    "Livemusik Rhein-Main",
    "Vivid Music Productions",
    "Rockband für Firmenevent",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "The Adams Family",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "The Adams Family",
    title: "The Adams Family – Bryan Adams Tributeband",
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "The Adams Family – Bryan Adams Tributeband",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Adams Family – Bryan Adams Tributeband",
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
  name: "The Adams Family",
  alternateName: "Bryan Adams Tribute – The Adams Family",
  description:
    "The Adams Family ist eine fünfköpfige Bryan-Adams-Tributeband aus dem Rhein-Main-Gebiet. Rund zwei Stunden Rockshow mit den größten Hits, dazu ein akustisches Unplugged-Set.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  telephone: "+49 6078 759568",
  foundingDate: "2002",
  genre: ["Rock", "Classic Rock", "Tribute"],
  numberOfEmployees: 5,
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
  sameAs: ["https://www.instagram.com/theadamsfamily_band/"],
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

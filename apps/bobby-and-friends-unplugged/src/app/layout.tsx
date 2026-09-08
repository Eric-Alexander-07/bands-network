import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import JsonLd from "@/components/JsonLd";
import SiteWrapper from "@/components/SiteWrapper";
import InviteHashHandler from "@/components/InviteHashHandler";

// Fraunces traegt die Ueberschriften — ein weicher, warmer Serifenschnitt,
// der nach handgeschriebenem Programmzettel aussieht statt nach Buehnen-
// Lightbox. Zwei Schnitte (500/600), keine Kursive im Fliesstext.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

// Karla fuer Fliesstext, Navigation, Buttons und Formulare.
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-karla",
  display: "swap",
});

/**
 * Domain steht noch nicht fest (Stand: Anlage der Seite) — Platzhalter, bis
 * die endgueltige Domain geklaert ist. Der Wert wird von `robots.ts`,
 * `sitemap.ts` sowie allen `canonical`- und OpenGraph-URLs uebernommen.
 * Zum Wechseln entweder `NEXT_PUBLIC_BASE_URL` in `.env.local` setzen (wirkt
 * sofort ueberall) oder diesen Wert hier UND in `robots.ts` und `sitemap.ts`
 * anpassen.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://bobbyandfriends-unplugged.de";

const DESCRIPTION =
  "Bobby & Friends Unplugged spielt handgemachte Akustikmusik für Wohnzimmerkonzerte, Dinner und Hochzeiten im Rhein-Main-Gebiet.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bobby & Friends Unplugged – Live-Akustikmusik",
    template: "%s | Bobby & Friends Unplugged",
  },
  description: DESCRIPTION,
  keywords: [
    "Unplugged Band Frankfurt",
    "Wohnzimmerkonzert buchen",
    "Hauskonzert Musiker",
    "Dinnermusik Rhein-Main",
    "Akustikband Hochzeit",
    "Bobby Stöcker",
    "Gitarre und Gesang buchen",
    "Loungemusik Firmenevent",
    "Vivid Music Productions",
    "Livemusik Weinprobe",
  ],
  authors: [{ name: "Vivid Music Productions" }],
  creator: "Vivid Music Productions",
  publisher: "Bobby & Friends Unplugged",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Bobby & Friends Unplugged",
    title: "Bobby & Friends Unplugged – Live-Akustikmusik",
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bobby & Friends Unplugged – Akustikmusik für Wohnzimmerkonzerte & Dinner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby & Friends Unplugged – Live-Akustikmusik",
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
  name: "Bobby & Friends Unplugged",
  alternateName: "Bobby Stöcker – Unplugged Klassiker",
  description:
    "Bobby & Friends Unplugged ist eine akustische Solo- bis Sextett-Besetzung rund um Sänger und Gitarrist Bobby Stöcker. Handgemachte Unplugged-Klassiker aus vier Jahrzehnten für Wohnzimmerkonzerte, Dinner, Hochzeiten und Firmenempfänge.",
  url: BASE_URL,
  email: "info@v-m-p.com",
  telephone: "+49 6078 759568",
  genre: ["Unplugged", "Akustik", "Singer-Songwriter", "Dinner Lounge"],
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
  sameAs: ["https://www.instagram.com/bobbyandfriends_band/"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${karla.variable}`}>
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

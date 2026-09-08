export const revalidate = 86400;

import type { Metadata } from "next";

const DESCRIPTION =
  "Von der Soloakustik bis zum Sextett: Bobby & Friends Unplugged bringt Dinner-, Lounge- und Partymusik in jeder Besetzung zu Ihrem Event.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Programm & Besetzung – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Besetzung Solo Duo Trio", "Unplugged Besetzung buchen", "Akustikband Programm", "Dinnermusik Besetzung", "Hochzeitsmusiker Besetzung"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/services" },
  openGraph: {
    title: "Programm & Besetzung – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/services",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programm & Besetzung – Bobby & Friends Unplugged",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

import ServicesPage from "@/components/ServicesPage";
import { fetchBundle, besetzung } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function Services() {
  const bundle = await fetchBundle();
  return <ServicesPage c={resolve(bundle, "services")} dbBesetzung={besetzung(bundle)} />;
}

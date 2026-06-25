export const revalidate = 86400;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Spirit of Soul | Soulband Frankfurt",
  description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
  keywords: ["Soulband Geschichte", "Spirit of Soul Band", "Soul R&B Funk Frankfurt", "Profimusiker Frankfurt", "Sänger Bläser", "Motown", "Blues", "Soul Classics"],
  alternates: { canonical: "https://spiritofsoul.com/about" },
  openGraph: {
    title: "Über uns – Spirit of Soul | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
    url: "https://spiritofsoul.com/about",
    images: [{ url: "https://spiritofsoul.com/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – Spirit of Soul | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
  },
    robots: { index: true, follow: true },
};

import AboutPage from "@/components/AboutPage";
import { fetchPageContent } from "@/lib/data";

export default async function About() {
  const content = await fetchPageContent("about");
  return <AboutPage content={content} />;
}

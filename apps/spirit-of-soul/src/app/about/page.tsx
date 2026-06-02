import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Spirit of Soul | Soulband Frankfurt",
  description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
  keywords: ["Soulband Geschichte", "Spirit of Soul Band", "Soul R&B Funk Frankfurt", "Profimusiker Frankfurt"],
  alternates: { canonical: "https://spirit-of-soul.de/about" },
  openGraph: {
    title: "Über uns – Spirit of Soul | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
    url: "https://spirit-of-soul.de/about",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über uns – Spirit of Soul | Soulband Frankfurt",
    description: "Spirit of Soul – 25 Jahre authentischer Soul, R&B und Funk. Flexible Besetzungen vom Duo bis zur 12-köpfigen Full-Band. Erfahrene Profimusiker aus Frankfurt am Main.",
  },
    robots: { index: true, follow: true },
};

import AboutPage from "@/components/AboutPage";

export default function About() {
  return <AboutPage />;
}

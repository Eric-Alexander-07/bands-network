export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop – Spirit of Soul | Merchandise & CD",
  description: "Spirit of Soul Merchandise: 20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen der Soulband aus Frankfurt am Main.",
  keywords: ["Spirit of Soul CD", "Soulband Merchandise", "20 Years Live"],
  alternates: { canonical: "https://spirit-of-soul.de/shop" },
  openGraph: {
    title: "Shop – Spirit of Soul | Merchandise & CD",
    description: "Spirit of Soul Merchandise: 20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen der Soulband aus Frankfurt am Main.",
    url: "https://spirit-of-soul.de/shop",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop – Spirit of Soul | Merchandise & CD",
    description: "Spirit of Soul Merchandise: 20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen der Soulband aus Frankfurt am Main.",
  },
    robots: { index: true, follow: true },
};

import ShopPage from "@/components/ShopPage";
import { fetchProducts, fetchPageContent } from "@/lib/data";

export default async function Shop() {
  const [dbProducts, content] = await Promise.all([fetchProducts(), fetchPageContent("shop")]);
  return <ShopPage dbProducts={dbProducts as any} content={content} />;
}

export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop – Spirit of Soul | Merchandise - Unser Shop mit Fan Artikeln",
  description: "20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen.",
  keywords: ["Spirit of Soul CD", "Soulband Merchandise", "20 Years Live", "Spirit of Soul Kühlschrank Magneten", "Spirit of Soul T-Shirts", "Spirit of Soul Buttons", "Spirit of Soul Hoodies", "Spirit of Soul Tassen"],
  alternates: { canonical: "https://werock-rockband.de/shop" },
  openGraph: {
    title: "Shop – Spirit of Soul | Merchandise - Unser Shop mit Fan Artikeln",
    description: "20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen.",
    url: "https://werock-rockband.de/shop",
    images: [{ url: "https://werock-rockband.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop – Spirit of Soul | Merchandise - Unser Shop mit Fan Artikeln",
    description: "20 Years Live CD und T-Shirts – Jubiläumsedition zum 25-jährigen Bestehen.",
  },
    robots: { index: true, follow: true },
};

import ShopPage from "@/components/ShopPage";
import { fetchProducts, fetchPageContent } from "@/lib/data";

export default async function Shop() {
  const [dbProducts, content] = await Promise.all([fetchProducts(), fetchPageContent("shop")]);
  return <ShopPage dbProducts={dbProducts as any} content={content} />;
}

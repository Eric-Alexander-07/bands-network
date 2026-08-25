import { MetadataRoute } from "next";

/** Domain der Band — identisch mit `layout.tsx` und `robots.ts` halten. */
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://theadamsfamily.de";

const LAST_MODIFIED = new Date("2026-08-25");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/media`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",   // Spieltermine ändern sich regelmäßig
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/galerie`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/referenzen`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,    // Buchungsseite = wichtigste Conversion-Seite
    },
    // Impressum, Datenschutz, Kontakt: noindex → nicht in Sitemap
  ];
}

import { MetadataRoute } from "next";

/** Domain der Band — identisch mit `layout.tsx` und `sitemap.ts` halten. */
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://coversnake.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/impressum",    // rechtlich, kein SEO-Wert
          "/datenschutz",  // rechtlich, kein SEO-Wert
          "/kontakt",      // Duplikat von /booking (nav zeigt auf /booking)
          "/admin",        // Admin-Bereich nicht indexieren
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

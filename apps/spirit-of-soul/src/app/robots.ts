import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://spiritofsoul.com";

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
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

import { fetchBundle, members, occasions, socialLinks } from "@/lib/data";
import { band } from "@/config/band";
import { BASE_URL, BAND_NAME } from "@/lib/structuredData";

/**
 * llms.txt — kurze, sachliche Selbstbeschreibung fuer KI-Crawler.
 * Mitglieder, Anlaesse und Profile kommen aus der Datenbank; alles andere
 * entspricht den sichtbaren Seitentexten.
 */
export const revalidate = 3600;

export async function GET() {
  const bundle = await fetchBundle();

  const lineup = members(bundle)
    .filter((m) => m.visible !== false)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => `- ${m.name}${m.role ? ` (${m.role})` : ""}`);

  const anlaesse = occasions(bundle)
    .filter((o) => o.visible !== false)
    .map((o) => `- ${o.title}: ${o.description}`);

  const profile = Array.from(new Set([
    ...Object.values(band.socials),
    ...socialLinks(bundle).map((l) => l.url),
  ].filter(Boolean))).map((u) => `- ${u}`);

  const text = [
    `# ${BAND_NAME}`,
    "",
    "> Bryan-Adams-Tributeband, gegründet 2002, fünf Musiker. Rund zweistündige Rockshow mit den größten Hits von Bryan Adams plus akustischem Unplugged-Set. Buchbar für Festivals, Clubs, Stadtfeste, Firmenevents und private Feiern.",
    "",
    "## Seiten",
    `- [Startseite](${BASE_URL}/)`,
    `- [Die Band](${BASE_URL}/about): Geschichte und Besetzung`,
    `- [Show & Repertoire](${BASE_URL}/services): Ablauf, Songs und Technik`,
    `- [Media & News](${BASE_URL}/media): Videos und Termine`,
    `- [Galerie](${BASE_URL}/galerie): Fotos von der Bühne`,
    `- [Referenzen & Netzwerk](${BASE_URL}/referenzen)`,
    `- [Booking](${BASE_URL}/booking): Anfrage für Ihre Veranstaltung`,
    "",
    ...(lineup.length ? ["## Besetzung", ...lineup, ""] : []),
    ...(anlaesse.length ? ["## Anlässe", ...anlaesse, ""] : []),
    "## Kontakt",
    "- Booking über Vivid Music Productions, Groß-Umstadt",
    "- E-Mail: info@v-m-p.com",
    "- Telefon: +49 6078 759568",
    ...(profile.length ? ["", "## Profile", ...profile] : []),
    "",
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

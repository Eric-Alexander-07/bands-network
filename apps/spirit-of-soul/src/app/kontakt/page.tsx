import type { Metadata } from "next";
import KontaktPage from "@/components/KontaktPage";

// noindex: /kontakt ist inhaltlich ein Duplikat von /booking (die Navigation
// verlinkt auf /booking) und ist deshalb auch in robots.ts gesperrt.
// Ohne eigenes metadata-Objekt würde diese Seite Titel und Beschreibung der
// Startseite erben und damit ein Duplikat in den Suchergebnissen erzeugen.
export const metadata: Metadata = {
  title: "Kontakt – Spirit of Soul | Soulband anfragen",
  description:
    "Spirit of Soul kontaktieren – Soulband aus Frankfurt am Main. Anfragen für Hochzeiten, Firmenevents und Galas. Vivid Music Productions.",
  alternates: { canonical: "https://spiritofsoul.com/booking" },
  robots: { index: false, follow: false },
};

export default function Kontakt() {
  return <KontaktPage />;
}

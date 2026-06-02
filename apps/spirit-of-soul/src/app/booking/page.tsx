import BookingForm from "@/components/BookingForm";
import ConcentricRings from "@/components/ConcentricRings";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buchungsanfrage – Spirit of Soul | Band buchen",
  description: "Spirit of Soul für Ihr Event buchen – Anfrage für Hochzeiten, Firmenevents, Galas und Stadtfeste. Persönliches Angebot innerhalb von 24 Stunden.",
  keywords: ["Soulband buchen", "Band buchen Frankfurt", "Partyband anfragen", "Liveband Hochzeit buchen"],
  alternates: { canonical: "https://spirit-of-soul.de/booking" },
  openGraph: {
    title: "Buchungsanfrage – Spirit of Soul | Band buchen",
    description: "Spirit of Soul für Ihr Event buchen – Anfrage für Hochzeiten, Firmenevents, Galas und Stadtfeste. Persönliches Angebot innerhalb von 24 Stunden.",
    url: "https://spirit-of-soul.de/booking",
    images: [{ url: "https://spirit-of-soul.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buchungsanfrage – Spirit of Soul | Band buchen",
    description: "Spirit of Soul für Ihr Event buchen – Anfrage für Hochzeiten, Firmenevents, Galas und Stadtfeste. Persönliches Angebot innerhalb von 24 Stunden.",
  },
    robots: { index: true, follow: true },
};



export default function BookingPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/about.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Buchungsanfrage</span>
          <h1>Buchen</h1>
          <p>
            Jetzt euer Datum anfragen und ein maßgeschneidertes Angebot
            erhalten. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>
      </section>
      <section className="section booking-page-section">
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}

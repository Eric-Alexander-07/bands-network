import BookingForm from "@/components/BookingForm";
import ConcentricRings from "@/components/ConcentricRings";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking – WE ROCK | Classic Rock Band buchen",
  description: "WE ROCK für Ihr Event buchen. Classic Rock & Hardrock live für Festivals, Firmenevents und private Feiern. Persönliches Angebot innerhalb von 24 Stunden.",
  keywords: ["Rockband buchen", "Classic Rock Band buchen", "WE ROCK Booking", "Liveband Firmenevent", "Rock Band Hochzeit", "Rockshow buchen", "Tribute Band anfragen", "Rockband Rhein-Main"],
  alternates: { canonical: "https://we-rock.de/booking" },
  openGraph: {
    title: "Booking – WE ROCK | Classic Rock Band buchen",
    description: "WE ROCK für Ihr Event buchen. Persönliches Angebot innerhalb von 24 Stunden.",
    url: "https://we-rock.de/booking",
    images: [{ url: "https://we-rock.de/images/about.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking – WE ROCK | Classic Rock Band buchen",
    description: "WE ROCK für Ihr Event buchen. Persönliches Angebot innerhalb von 24 Stunden.",
  },
    robots: { index: true, follow: true },
};



export default function BookingPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/live-main.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Buchungsanfrage</span>
          <h1>Booking</h1>
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

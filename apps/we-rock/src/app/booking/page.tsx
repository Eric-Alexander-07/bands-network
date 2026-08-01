import BookingForm from "@/components/BookingForm";
import ConcentricRings from "@/components/ConcentricRings";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking – WE ROCK | Classic Rock Band buchen",
  description: "WE ROCK für Ihr Event buchen. Engagieren Sie die Classic Rock Tributeband für Konzert, Firmenevent oder private Feier. Angebot innerhalb von 24 Stunden.",
  keywords: ["Rockband buchen", "Rock Cover Booking", "Classic Rock Band buchen", "WE ROCK Booking", "Rockband Live", "Firmenevent", "Rock Band für Hochzeit", "Rockshow buchen", "Tribute Band anfragen", "Rockband Rhein-Main"],
  alternates: { canonical: "https://werock-rockband.de/booking" },
  openGraph: {
    title: "Booking – WE ROCK | Classic Rock Band buchen",
    description: "WE ROCK für Ihr Event buchen. Persönliches Angebot innerhalb von 24 Stunden.",
    url: "https://werock-rockband.de/booking",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking – WE ROCK | Classic Rock Band buchen",
    description: "WE ROCK für Ihr Event buchen. Persönliches Angebot innerhalb von 24 Stunden.",
  },
    robots: { index: true, follow: true },
};



import { fetchBundle, occasions, inquiryQuestions } from "@/lib/data";
import { resolve } from "@/lib/content";

export default async function BookingPage() {
  const bundle = await fetchBundle();
  const c = resolve(bundle, "booking");
  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 35%" }} />
        <div className="container">
          <span className="eyebrow">Buchungsanfrage</span>
          <h1>{c.page_hero_title}</h1>
          <p>
            {c.page_hero_text}
          </p>
        </div>
      </section>
      <section className="section booking-page-section">
        <div className="container">
          <BookingForm c={c} occasions={occasions(bundle)} questions={inquiryQuestions(bundle)} />
        </div>
      </section>
    </>
  );
}

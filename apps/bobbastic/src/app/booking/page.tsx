import BookingForm from "@/components/BookingForm";
import SoundBars from "@/components/SoundBars";

import type { Metadata } from "next";

const BOOKING_DESCRIPTION =
  "BOBbastic für Euer Event buchen – das Party Rocktrio aus der Rhein-Main-Region für Firmenfeiern, Stadtfeste und Hochzeiten.";

export const metadata: Metadata = {
  title: "Booking – BOBbastic | Rock-Trio buchen",
  description: BOOKING_DESCRIPTION,
  keywords: ["Rockband buchen", "Party Rocktrio buchen", "BOBbastic Booking", "Liveband Hochzeit", "Firmenevent Band", "Rock Cover Band engagieren"],
  alternates: { canonical: "https://bobbastic.de/booking" },
  openGraph: {
    title: "Booking – BOBbastic",
    description: BOOKING_DESCRIPTION,
    url: "https://bobbastic.de/booking",
    images: [{ url: "https://bobbastic.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking – BOBbastic",
    description: BOOKING_DESCRIPTION,
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

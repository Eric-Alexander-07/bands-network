import BookingForm from "@/components/BookingForm";
import ConcreteWall from "@/components/ConcreteWall";

import type { Metadata } from "next";

const DESCRIPTION =
  "The Adams Family für Ihre Veranstaltung anfragen: Wir melden uns in der Regel innerhalb von 24 Stunden mit einem passenden Angebot.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | The Adams Family") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt & Buchung – The Adams Family anfragen" },
  description: DESCRIPTION,
  keywords: ["Tributeband anfragen", "Bryan Adams Tribute buchen", "Rockband buchen", "Stadtfest Band buchen", "Firmenevent Band", "Band Booking Anfrage"],
  alternates: { canonical: "https://theadamsfamily.de/booking" },
  openGraph: {
    title: "Kontakt & Buchung – The Adams Family anfragen",
    description: DESCRIPTION,
    url: "https://theadamsfamily.de/booking",
    images: [{ url: "https://theadamsfamily.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt & Buchung – The Adams Family anfragen",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
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
      <section className="section booking-page-section section-has-rings">
        <ConcreteWall variant="edge" from="top-right" intensity={0.95} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <BookingForm c={c} occasions={occasions(bundle)} questions={inquiryQuestions(bundle)} />
        </div>
      </section>
    </>
  );
}

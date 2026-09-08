import BookingForm from "@/components/BookingForm";
import StageRays from "@/components/StageRays";

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby Stoker Band für Ihre Veranstaltung anfragen: Wir melden uns in der Regel innerhalb von 24 Stunden mit einem passenden Angebot.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby Stoker Band") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt & Buchung – Bobby Stoker Band anfragen" },
  description: DESCRIPTION,
  keywords: ["Bobby Stoker Band buchen", "Blues Rock Band buchen", "Rockband buchen", "Stadtfest Band buchen", "Firmenevent Band", "Band Booking Anfrage"],
  alternates: { canonical: "https://bobbystoker.com/booking" },
  openGraph: {
    title: "Kontakt & Buchung – Bobby Stoker Band anfragen",
    description: DESCRIPTION,
    url: "https://bobbystoker.com/booking",
    images: [{ url: "https://bobbystoker.com/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt & Buchung – Bobby Stoker Band anfragen",
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
        <StageRays className="rays-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <BookingForm c={c} occasions={occasions(bundle)} questions={inquiryQuestions(bundle)} />
        </div>
      </section>
    </>
  );
}

import BookingForm from "@/components/BookingForm";
import SoundWaves from "@/components/SoundWaves";

import type { Metadata } from "next";

const DESCRIPTION =
  "Bobby & Friends Unplugged für Ihr Wohnzimmerkonzert, Dinner oder Ihre Hochzeit anfragen – Antwort in der Regel innerhalb von 24 Stunden.";

export const metadata: Metadata = {
  // `absolute` umgeht das title.template im Root-Layout ("%s | Bobby & Friends Unplugged") —
  // ohne das wuerde der Bandname am Ende doppelt erscheinen.
  title: { absolute: "Kontakt & Buchung – Bobby & Friends Unplugged" },
  description: DESCRIPTION,
  keywords: ["Unplugged Band buchen", "Wohnzimmerkonzert anfragen", "Hochzeitsmusiker buchen", "Dinnermusik buchen", "Vivid Music Productions"],
  alternates: { canonical: "https://bobbyandfriends-unplugged.de/booking" },
  openGraph: {
    title: "Kontakt & Buchung – Bobby & Friends Unplugged",
    description: DESCRIPTION,
    url: "https://bobbyandfriends-unplugged.de/booking",
    images: [{ url: "https://bobbyandfriends-unplugged.de/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt & Buchung – Bobby & Friends Unplugged",
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
      <section className="section booking-page-section">
        <div className="container">
          <BookingForm c={c} occasions={occasions(bundle)} questions={inquiryQuestions(bundle)} />
        </div>
      </section>
    </>
  );
}

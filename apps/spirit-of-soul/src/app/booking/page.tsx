import BookingForm from "@/components/BookingForm";
import ConcentricRings from "@/components/ConcentricRings";

export default function BookingPage() {
  return (
    <>
      <section className="page-hero section-has-rings">
        <ConcentricRings className="rings-hero" />
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

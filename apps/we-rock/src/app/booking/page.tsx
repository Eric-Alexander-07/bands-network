import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Kontakt</span>
          <h1>Buchung</h1>
          <p>Jetzt euer Datum anfragen und ein persönliches Angebot erhalten.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}

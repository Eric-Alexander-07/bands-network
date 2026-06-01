import { band } from "@/config/band";

export default function KontaktPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-vocalist-hat.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Schreib uns</span>
          <h1>Kontakt</h1>
          <p>
            Fragen, allgemeine Anfragen oder einfach Hallo sagen — wir freuen
            uns von euch zu hören.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info" data-animate="fade-right">
              <h2>Kontaktdaten</h2>
              <p>
                <strong>E-Mail</strong>
                <a href={`mailto:${band.email}`}>{band.email}</a>
              </p>
              <p>
                <strong>Standort</strong>
                {band.location}
              </p>
              <p>
                <strong>Buchungsanfragen</strong>
                Nutze bitte das{" "}
                <a href="/booking">Buchungsformular</a> für konkrete
                Event-Anfragen mit Datum und Details.
              </p>
              <div className="contact-socials">
                {Object.entries(band.socials).map(([key, url]) => (
                  <a key={key} href={url} className="footer-social-link"
                     target="_blank" rel="noopener noreferrer">
                    {key}
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form" data-animate="fade-left">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Dein Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" name="email" placeholder="deine@email.de" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Betreff</label>
                <input type="text" id="subject" name="subject" placeholder="Worum geht es?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Nachricht</label>
                <textarea id="message" name="message" rows={6} placeholder="Deine Nachricht..." required />
              </div>
              <button type="submit" className="btn btn-primary">Nachricht senden</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

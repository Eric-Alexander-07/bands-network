import { band } from "@/config/band";

export default function KontaktPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Schreib uns</span>
          <h1>Kontakt</h1>
          <p>Fragen, Anfragen oder einfach Hallo sagen — wir freuen uns von euch zu hören.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Kontaktdaten</h2>
              <p>
                <strong>E-Mail</strong>
                <br />
                <a href={`mailto:${band.email}`}>{band.email}</a>
              </p>
              <p>
                <strong>Standort</strong>
                <br />
                {band.location}
              </p>
              <div className="contact-socials">
                {Object.entries(band.socials).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key}
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form">
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
              <button type="submit" className="btn btn-primary">
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

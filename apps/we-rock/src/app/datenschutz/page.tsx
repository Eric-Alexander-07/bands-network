import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – WE ROCK",
  description: "Datenschutzerklärung von WE ROCK – Vivid Music Productions. Informationen zur Verarbeitung personenbezogener Daten.",

  alternates: { canonical: "https://werock-rockband.de/datenschutz" },
  openGraph: {
    title: "Datenschutz – WE ROCK",
    description: "Datenschutzerklärung von WE ROCK – Vivid Music Productions. Informationen zur Verarbeitung personenbezogener Daten.",
    url: "https://werock-rockband.de/datenschutz",
    images: [{ url: "https://werock-rockband.de/images/about.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datenschutz – WE ROCK",
    description: "Datenschutzerklärung von WE ROCK – Vivid Music Productions. Informationen zur Verarbeitung personenbezogener Daten.",
  },
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Datenschutz</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-content">

            <div className="legal-block">
              <h2>1. Datenschutz auf einen Blick</h2>
              <h3>Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
                werden können.
              </p>
            </div>

            <div className="legal-block">
              <h2>2. Verantwortliche Stelle</h2>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p>
                Vivid Music Productions<br />
                Bernhard Stöcker<br />
                Westring 20<br />
                64823 Groß-Umstadt<br /><br />
                Telefon: +49 6078 759568<br />
                E-Mail: <a href="mailto:info@v-m-p.com">info@v-m-p.com</a>
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
                gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
                personenbezogenen Daten entscheidet.
              </p>
            </div>

            <div className="legal-block">
              <h2>3. Datenerfassung auf dieser Website</h2>

              <h3>Hosting</h3>
              <p>
                Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                ("Vercel") gehostet. Beim Aufruf der Website erfasst Vercel automatisch technische
                Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und aufgerufene
                Seite (Server-Logfiles). Diese Verarbeitung ist zum technischen Betrieb der Website
                erforderlich (Art. 6 Abs. 1 lit. f DSGVO). Da Vercel in den USA ansässig ist, kann
                eine Datenübertragung in ein Drittland stattfinden; Vercel hat hierfür mit uns die
                EU-Standardvertragsklauseln der Europäischen Kommission abgeschlossen
                (vercel.com/legal/dpa).
              </p>

              <h3>Kontakt- und Buchungsformular</h3>
              <p>
                Wenn Sie uns per Kontakt- oder Buchungsformular eine Anfrage zukommen lassen,
                verarbeiten wir die dort angegebenen Daten (Name, E-Mail-Adresse, optional
                Telefonnummer, Veranstaltungsdatum und -angaben, Nachricht) ausschließlich zur
                Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen (Art. 6 Abs. 1
                lit. b bzw. lit. f DSGVO). Der Versand der internen Benachrichtigung sowie der
                automatischen Eingangsbestätigung erfolgt technisch über den in Ziffer 5 genannten
                E-Mail-Dienstleister. Darüber hinaus geben wir diese Daten nicht ohne Ihre
                Einwilligung weiter.
              </p>
              <p>
                Ihre Angaben verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck
                für die Speicherung entfällt — in der Regel, sobald Ihre Anfrage abschließend
                bearbeitet ist. Kommt aus Ihrer Anfrage eine Buchung zustande, speichern wir die
                daraus entstehenden Vertrags- und Rechnungsunterlagen für die Dauer der gesetzlichen
                handels- und steuerrechtlichen Aufbewahrungsfristen (i. d. R. 6 bzw. 10 Jahre gemäß
                § 257 HGB, § 147 AO). Zwingende gesetzliche Bestimmungen bleiben unberührt.
              </p>

              <h3>Anfrage per E-Mail oder Telefon</h3>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive
                aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der
                Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>

            <div className="legal-block">
              <h2>4. Zweck der Datenverarbeitung</h2>
              <p>
                Wir verarbeiten die im Kontakt- und Buchungsformular sowie per E-Mail oder Telefon
                übermittelten personenbezogenen Daten ausschließlich, um Ihre Anfrage zu bearbeiten
                und Ihnen — sofern gewünscht — ein Angebot für eine Buchung unserer Band zu
                erstellen.
              </p>
              <p>
                Persönliche Informationen werden nur mit Ihrer ausdrücklichen Zustimmung, zur
                Erfüllung eines Vertrags oder gegenüber den in Ziffer 5 genannten Auftragsverarbeitern
                an Dritte übermittelt.
              </p>
            </div>

            <div className="legal-block">
              <h2>5. Eingesetzte Auftragsverarbeiter</h2>
              <p>
                Für den Betrieb dieser Website und die Bearbeitung Ihrer Anfragen setzen wir
                folgende Dienstleister als Auftragsverarbeiter ein. Mit allen genannten Anbietern
                bestehen Verträge zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
              <ul>
                <li>
                  <strong>Vercel Inc.</strong> (Hosting) — 340 S Lemon Ave #4133, Walnut, CA 91789,
                  USA. Zweck: technischer Betrieb und Auslieferung der Website. Übermittlung in die
                  USA auf Grundlage der EU-Standardvertragsklauseln.
                </li>
                <li>
                  <strong>Supabase, Inc.</strong> (Datenbank &amp; Redaktionssystem). Zweck:
                  Speicherung der Website-Inhalte (Texte, Bilder, Termine) sowie Login-Verwaltung
                  für unseren internen Redaktionsbereich. Serverstandort: Frankfurt am Main,
                  Deutschland (EU-Region). Ihre Angaben aus dem Kontakt- oder Buchungsformular
                  werden nicht in dieser Datenbank gespeichert, sondern ausschließlich per E-Mail
                  verarbeitet.
                </li>
                <li>
                  <strong>Resend, Inc.</strong> (Transaktions-E-Mail-Versand), USA. Zweck: Versand
                  der internen Benachrichtigung sowie der automatischen Bestätigungsmail nach einer
                  Kontakt- oder Buchungsanfrage. Resend ist nach dem EU-US Data Privacy Framework
                  (DPF) zertifiziert und hat zusätzlich EU-Standardvertragsklauseln vereinbart
                  (resend.com/legal/dpa).
                </li>
              </ul>
            </div>

            <div className="legal-block">
              <h2>6. Cookies</h2>
              <p>
                Auf den öffentlichen Seiten dieser Website werden keine Cookies gesetzt. Lediglich
                im internen, passwortgeschützten Redaktionsbereich (<code>/admin</code>) verwendet
                unser Content-Management-System (Supabase Auth) ein technisch notwendiges
                Session-Cookie, um die Anmeldung der Redaktion aufrechtzuerhalten. Dieses Cookie
                betrifft ausschließlich Mitglieder unseres Redaktionsteams, nicht Websitebesucher,
                und ist gemäß § 25 Abs. 2 TTDSG bzw. Art. 6 Abs. 1 lit. f DSGVO ohne gesonderte
                Einwilligung zulässig.
              </p>
            </div>

            <div className="legal-block">
              <h2>7. SSL-/TLS-Verschlüsselung und Web-Fonts</h2>
              <p>
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung
                erkennen Sie daran, dass die Adresszeile Ihres Browsers von "http://" auf
                "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p>
                Zur einheitlichen Darstellung von Schriftarten nutzen wir Web-Fonts, die beim
                Seitenaufbau von unserem eigenen Server ausgeliefert werden. Es findet dabei keine
                Verbindung zu Servern des Schriftenanbieters statt, es werden keine Daten an
                Dritte übermittelt.
              </p>
            </div>

            <div className="legal-block">
              <h2>8. Eingebundene YouTube-Videos</h2>
              <p>
                Wir binden auf dieser Website Videos des Anbieters YouTube ein, betrieben von
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland ("Google").
                Wir nutzen dafür den erweiterten Datenschutzmodus (youtube-nocookie.com), bei dem
                laut Google erst dann Cookies gesetzt werden, wenn Sie ein Video tatsächlich
                abspielen. Unabhängig davon kann bereits beim Laden der Seite eine Verbindung zum
                Google-Netzwerk hergestellt und Ihre IP-Adresse an Google übermittelt werden,
                wodurch eine Datenübertragung in die USA nicht ausgeschlossen werden kann.
                Rechtsgrundlage ist unser berechtigtes Interesse an einer ansprechenden Darstellung
                unserer Live-Auftritte (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen zum
                Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:{" "}
                <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>.
              </p>
            </div>

            <div className="legal-block">
              <h2>9. Externe Links (Social Media)</h2>
              <p>
                Diese Website enthält Links zu den externen Profilen von We Rock bei Instagram,
                Facebook und YouTube. Durch das Anklicken dieser Links verlassen Sie unsere
                Website. Für die Datenschutzpraktiken dieser Dienste sind deren eigene
                Datenschutzrichtlinien maßgeblich.
              </p>
            </div>

            <div className="legal-block">
              <h2>10. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht:</p>
              <ul>
                <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>die Berichtigung oder Löschung dieser Daten zu verlangen</li>
                <li>die Einschränkung der Verarbeitung zu verlangen</li>
                <li>der Verarbeitung zu widersprechen</li>
                <li>auf Datenübertragbarkeit</li>
                <li>eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen</li>
              </ul>
              <p>
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
                an uns wenden: <a href="mailto:info@v-m-p.com">info@v-m-p.com</a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

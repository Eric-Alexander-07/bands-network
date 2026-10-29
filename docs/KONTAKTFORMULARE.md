# Kontaktformulare — richtig bauen und schützen

Gilt für `/kontakt` und `/booking` aller Bandseiten (gemeinsame Route `/api/kontakt`, Versand über Resend).
Stand der Umsetzung steht in Abschnitt 2, der Ausbaupfad in Abschnitt 4.

## 1. Was wir schützen müssen

| Gefahr | Folge |
|---|---|
| **Spam-Bots** füllen das Formular massenhaft aus | Posteingang des Booking-Teams unbrauchbar, echte Anfragen gehen unter |
| **Fremde als Empfänger** (Backscatter): Bot trägt die Adresse eines Dritten ein, unsere Bestätigungsmail geht dorthin | Wir werden zum Spam-Versender, Resend sperrt den Account, `v-m-p.com` landet auf Blacklists und **alle** Bands verlieren die Zustellbarkeit |
| **Header-/HTML-Injection** über Formularfelder | Manipulierte Mails, Phishing im Namen der Band |
| **Kostenmissbrauch**: jede Anfrage = 2 Mails | Resend-Kontingent verbraucht |
| **Datenschutz**: personenbezogene Daten ohne Rechtsgrundlage oder zu lange gespeichert | DSGVO-Risiko |

Die Domain `v-m-p.com` ist der gemeinsame Absender aller Bands. Ein Missbrauch trifft deshalb nie nur eine Seite.

## 2. Aktueller Stand (ohne externe Dienste, ohne Schlüssel)

Umgesetzt in `packages/form-guard` und in jeder `src/app/api/kontakt/route.ts`:

| Maßnahme | Wert | Zweck |
|---|---|---|
| Honeypot-Feld `website` | still `ok: true` | einfache Bots |
| Herkunftsprüfung | `Origin`/`Referer` muss dem `Host` entsprechen | Aufrufe von fremden Seiten und Skripten ohne Header |
| Rate-Limit je IP | 5 Anfragen / 10 Min. (auch ungültige zählen) | Skripte, Mehrfachklicks |
| Rate-Limit je Empfängeradresse | 3 / Stunde | Schutz vor Backscatter an einzelne Dritte |
| Globale Notbremse | 60 / Stunde je Instanz | Flut |
| Body-Limit | 20 KB, sonst 413 | Speicher-/Mailmissbrauch |
| Feldlängen | Name 100, E-Mail 254, Nachricht 5000 usw., sonst 400 | Mail-Bomben, Layoutbruch |
| Pflichtfelder + E-Mail-Format | serverseitig | Browser-Prüfung ist umgehbar |
| HTML-Escaping in allen Mails | `escapeHtml()` in `templates.ts` | HTML-Injection |
| Betreffzeile enthält keine Nutzereingabe außer dem Anlass aus der Auswahlliste | — | Header-Injection |
| Fehlerprüfung des Resend-Ergebnisses | `{ error }` wird ausgewertet | keine falschen Erfolgsmeldungen |
| Formularfehler als 429 mit `Retry-After` | — | saubere Rückmeldung |

Die Grenzwerte stehen zentral in `LIMITS` (`packages/form-guard/src/index.ts`).

### Bekannte Grenzen — ehrlich benannt

1. **Zähler liegt im Arbeitsspeicher.** Auf Vercel laufen mehrere Instanzen ohne gemeinsamen Speicher und starten bei Deployments neu. Ein verteilter Angriff kann die Grenzen also mehrfach ausschöpfen. Das bremst Skripte spürbar, ist aber **keine harte Garantie**.
2. **Kein Nachweis, dass ein Mensch sendet.** Ein Bot, der Honeypot und Herkunft korrekt bedient und IPs wechselt, kommt durch.
3. **Die Absenderadresse wird nicht verifiziert.** Wir senden die Bestätigung an jede eingetragene Adresse (begrenzt auf 3/Std. je Adresse).
4. **IP-Header sind nur auf Vercel vertrauenswürdig.** Lokal oder hinter anderen Proxys lassen sie sich fälschen.

## 3. So baut man ein Kontaktformular grundsätzlich richtig

**Schichten, nie nur eine Maßnahme.** Jede Schicht fängt, was die vorige durchlässt:

1. **Client:** `required`, `type="email"`, `maxLength`, deaktivierter Button beim Senden. Nur Komfort, nie Schutz. Jede Prüfung muss serverseitig wiederholt werden.
2. **Unsichtbare Hürden:** Honeypot, Mindestdauer zwischen Seitenaufruf und Absenden (z. B. < 3 s = Bot).
3. **Verifikation, dass ein Mensch sendet:** Captcha der neuen Generation (Turnstile), siehe 4.1.
4. **Server:** Herkunft, Größe, Länge, Format, Rate-Limit — alles bevor eine Mail ausgelöst wird.
5. **Versand:** Reply-To statt fremder From-Adresse, nur eigene Domain als Absender, Nutzereingaben nie in Header (Betreff, To, From), HTML immer escapen.
6. **Zustellbarkeit:** SPF, DKIM **und DMARC** für `v-m-p.com` (DMARC mindestens `p=none` mit Report-Adresse, besser `quarantine`).
7. **Beobachtung:** Fehlgeschlagene Sendungen loggen (ohne Nachrichtentext), Resend-Dashboard auf Bounce-/Complaint-Rate prüfen, Warnung bei Ausreißern.
8. **Datenschutz:** Hinweistext am Formular, Auftragsverarbeitung mit Resend, Datenschutzerklärung nennt Resend und ggf. Cloudflare Turnstile, Speicherdauer festlegen. Aktuell wird nichts in der Datenbank gespeichert, nur per Mail verarbeitet — so lassen, solange kein Bedarf besteht.

**Typische Fehler:** Schutz nur im Browser; Nutzereingabe im Mailbetreff; Bestätigungsmail an ungeprüfte Adressen mit vollem Nachrichtentext; Rate-Limit nur im Arbeitsspeicher als „gelöst“ betrachten; Fehlermeldungen, die interne Details verraten.

## 4. Ausbaupfad — was für die „richtige“ Lösung noch fehlt

Reihenfolge nach Nutzen pro Aufwand.

### 4.1 Cloudflare Turnstile (verifiziert, dass ein Mensch sendet)
- Kostenlos, für Besucher meist unsichtbar, ohne Bilderrätsel, datenschutzfreundlicher als reCAPTCHA.
- **Benötigt:** Cloudflare-Konto, je Domain ein Widget → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (öffentlich) und `TURNSTILE_SECRET_KEY` (geheim) pro App, in Vercel und `turbo.json` eintragen.
- **Umbau:** Widget in `BookingForm.tsx`/`KontaktPage.tsx` einbinden, Token im Request mitsenden, in `@bands/form-guard` eine Funktion `verifyTurnstile(token, ip)` ergänzen, die `https://challenges.cloudflare.com/turnstile/v0/siteverify` aufruft. Ohne gültiges Token: 403, **bevor** Mails ausgelöst werden.
- Datenschutzerklärung um Turnstile ergänzen.
- Das ist der Schritt, der „nur verifizierte Anfragen“ tatsächlich herstellt.

### 4.2 Gemeinsamer Zähler statt Arbeitsspeicher
Macht aus der Bremse eine harte Grenze. Nur `rateLimit()` in `form-guard` wird getauscht, die Routen bleiben unverändert.

| Option | Aufwand | Anmerkung |
|---|---|---|
| **Upstash Redis** (`@upstash/ratelimit`) | neues Konto, 2 Env-Variablen je App | Standardlösung auf Vercel, Free-Kontingent reicht |
| **Supabase** (Tabelle + `security definer`-Funktion) | Migration im Projekt VMP-Bands | kein neuer Dienst; nach CLAUDE.md nur mit Begründung eine neue Tabelle, RLS im bestehenden Muster, Eintrag in `db-types` |
| **Vercel WAF Rate Limiting** | nur Dashboard, kein Code | greift vor der App; Umfang je nach Vercel-Tarif |

Empfehlung: Turnstile zuerst, danach Upstash oder Vercel-WAF.

### 4.3 E-Mail-Adresse verifizieren (Double-Opt-in)
Die Anfrage wird erst ans Team weitergeleitet, wenn der Absender einen Link in einer Mail an seine Adresse bestätigt. Sicherste Variante gegen Backscatter, kostet aber Komfort (zusätzlicher Klick, Anfragen gehen verloren).
Mildere Alternative ohne Aufwand: **Bestätigungsmail ohne die Nachricht des Absenders** schicken, nur „Anfrage eingegangen“. Dann kann niemand fremde Texte über unsere Domain an Dritte senden.

### 4.4 Weitere Härtung
- Mindestdauer-Prüfung (Zeitstempel beim Laden des Formulars, serverseitig signiert, damit er nicht gefälscht werden kann).
- Inhaltsprüfung: Nachrichten mit mehreren Links oder bekannten Spam-Mustern markieren oder verwerfen.
- Alarm bei auffälligem Anstieg der Anfragen (Resend-Webhook oder Log-Auswertung).
- Automatisierte Tests für `form-guard` (Grenzen, Herkunft, Längen).

## 5. Checkliste für eine neue Band

- [ ] `packages/form-guard` in `package.json` der App als Abhängigkeit (`"@bands/form-guard": "*"`), danach `npm install` im Root.
- [ ] `route.ts` von einer bestehenden Band kopieren, **nur** Betreffzeilen und Bandnamen anpassen. Die Schutzaufrufe (`checkOrigin`, `checkRequestRate`, `readJsonBody`, `checkFieldLengths`, `checkEmailRate`) bleiben vollständig.
- [ ] `required` an Name, E-Mail und Nachricht in **beiden** Formularen, Honeypot-Feld `website` vorhanden.
- [ ] `RESEND_API_KEY` in Vercel gesetzt, Absenderdomain in Resend verifiziert (SPF/DKIM), DMARC vorhanden.
- [ ] Testanfrage von der echten Domain abschicken: Mail kommt an, Bestätigung kommt an, sechster Versuch innerhalb von 10 Minuten liefert die 429-Meldung.
- [ ] Datenschutzerklärung nennt Resend (und Turnstile, sobald eingebaut).

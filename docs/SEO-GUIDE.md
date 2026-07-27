# SEO-Guide — bands-network

Verbindliche Regeln für Meta-Texte und SEO-Änderungen an allen Bandseiten in diesem Monorepo.

**Vor jedem Commit, der Metadaten berührt:**

```bash
npm run seo:check
```

Exit-Code 1 heisst: nicht committen. Das Skript prüft nur den Quellcode, kein Netzwerk, keine Datenbank — es läuft in unter einer Sekunde.

---

## 1. Was schon schiefgegangen ist

Jede Regel in diesem Guide stammt aus einem Fehler, der real in Produktion stand. Deshalb stehen sie zuerst.

### Eine Bandseite trug die Metadaten einer anderen Band

`werock-rockband.de/shop` lieferte den Titel „Shop – Spirit of Soul | Merchandise", Spirit-of-Soul-Keywords und das SoS-Cover `Titel_SOS.avif` aus. Live erreichbar, für Google indexierbar. Entstanden beim Klonen der Spirit-of-Soul-App als Grundlage für WE ROCK: die Route wurde mitkopiert, aber nie angepasst — und weil sie in keiner Navigation und keiner Sitemap stand, ist sie neun Monate niemandem aufgefallen.

**Regel:** Nach dem Klonen einer Bandseite jede Route einzeln durchgehen. Siehe [Abschnitt 6](#6-neue-bandseite-anlegen).

### Google zeigte einen anderen Text als im Code stand

Bei der Suche nach „Spirit of Soul" erschien nicht die Meta-Beschreibung, sondern der „Über die Band"-Absatz aus dem Seitentext. Der Code war korrekt — Google hat die Beschreibung bewusst verworfen. Drei Ursachen zusammen:

1. Die Beschreibung war eine Stichwortliste ohne Satzende: „Soulband, Eventband, Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events aller Art"
2. Sie beantwortete die Suchanfrage nicht — bei einer Suche nach dem Bandnamen will Google einen Satz, der sagt *was die Band ist*
3. 178 Zeichen, also über der Renderschwelle

**Regel:** Beschreibungen sind vollständige Sätze unter 155 Zeichen. Siehe [Abschnitt 3](#3-beschreibungen).

### Eine Seite hatte gar keine Metadaten

`spiritofsoul.com/kontakt` besass keinen `export const metadata`. In Next.js erbt eine solche Seite Titel und Beschreibung des Root-Layouts — sie war damit ein Duplikat der Startseite in den Suchergebnissen. Ein Eintrag in `robots.txt` verhindert das *nicht*: `Disallow` steuert das Crawling, nicht die Indexierung.

**Regel:** Jede `page.tsx` hat einen eigenen `metadata`-Export. Ausnahmslos.

### Vier Beschreibungen lagen über dem Limit, das im Kundendokument zugesagt war

Die SEO-Übersicht für den Kunden behauptete „Alle Beschreibungen dieser Website halten dieses Limit ein" — tatsächlich waren es 165, 171, 206 und 222 Zeichen.

**Regel:** Was im Kundendokument steht, muss das Prüfskript bestätigen.

### Das Kundendokument nannte eine Domain, die nicht existiert

Das WeRock-Dokument verwies durchgängig auf `we-rock.de`. Die Seite läuft auf `werock-rockband.de`; `we-rock.de` liefert nichts aus. Wer nach diesem Dokument eine Search-Console-Property anlegt, registriert die falsche Domain und wundert sich über fehlende Daten.

**Regel:** Domains im Dokument gegen `BASE_URL` in `layout.tsx` prüfen, nicht gegen die Erinnerung.

### Ein `git rm` hat das Repository blockiert

Beim Entfernen der `/shop`-Route scheiterte `git rm` an fehlenden Schreibrechten, hinterliess aber `.git/index.lock`. Diese leere Datei blockiert danach jede Git-Operation mit „fatal: Unable to create … File exists".

**Regel:** Dateien mit `rm` löschen, nicht mit `git rm` — Git erkennt die Löschung beim nächsten `status` von selbst. Falls die Meldung auftritt: `rm -f .git/index.lock`.

---

## 2. Wie Google Snippets wirklich wählt

Das Wichtigste vorweg, weil daraus alles andere folgt: **die Meta-Beschreibung ist ein Vorschlag, keine Anweisung.** Google entscheidet pro Suchanfrage neu, ob es die Beschreibung nimmt oder einen Absatz aus dem Seitentext.

Übernommen wird die Beschreibung eher, wenn sie:

- ein vollständiger, lesbarer Satz ist statt einer Aufzählung von Suchbegriffen
- die Frage hinter der Suchanfrage beantwortet (bei einer Suche nach dem Bandnamen: *was ist diese Band?*)
- vollständig sichtbar ist, also unter ~155 Zeichen bleibt
- den gesuchten Begriff früh enthält, idealerweise am Satzanfang

Verworfen wird sie eher, wenn sie kommaseparierte Kategorien aufreiht, den Bandnamen nicht nennt, abgeschnitten wird oder auf mehreren Seiten identisch ist.

Zwei Dinge, die dabei oft falsch erwartet werden:

- **`keywords` ist wirkungslos.** Google ignoriert das Meta-Keywords-Feld seit 2009. Es steht in diesem Projekt nur drin, weil es im Kundendokument dokumentiert ist. Fünf Begriffe genügen; die Beschreibung dort zu wiederholen schadet, weil es die Beschreibung selbst nach Stichwortliste aussehen lässt.
- **Änderungen wirken nicht sofort.** Nach dem Deploy dauert es typisch 3–14 Tage, bis Google neu crawlt. In der Search Console unter „URL-Prüfung" → „Indexierung beantragen" beschleunigt das. Ein Ergebnis, das im eigenen Browser als „Häufig besucht" markiert ist, kann zusätzlich verzögert aktualisieren.

---

## 3. Beschreibungen

| Regel | Wert | Warum |
|---|---|---|
| Maximallänge | **155 Zeichen** | Darüber schneidet Google ab und verwirft häufiger komplett |
| Mindestlänge | ~70 Zeichen | Zu dünne Texte werden gern durch Seitentext ersetzt |
| Form | vollständiger Satz, endet mit Punkt | Stichwortlisten werden überschrieben |
| Bandname | möglichst am Anfang | Erhöht die Übernahme bei Suche nach dem Bandnamen deutlich |
| Eindeutigkeit | keine zwei Seiten identisch | Sonst Duplikate in den Suchergebnissen |

Beschreibung, `openGraph.description` und `twitter.description` einer Seite sollen denselben Text tragen. Wenn dieser Text an drei Stellen wiederholt wird, gehört er in eine Konstante — sonst driften die Werte beim nächsten Nachbessern auseinander:

```ts
const HOME_DESCRIPTION =
  "Soulband, Eventband und Partyband aus Frankfurt am Main. Livemusik höchster Qualität für Hochzeiten, Firmenevents, Galas, Stadtfeste und High Class Events.";

export const metadata: Metadata = {
  description: HOME_DESCRIPTION,
  openGraph: { description: HOME_DESCRIPTION, /* … */ },
  twitter:   { description: HOME_DESCRIPTION, /* … */ },
};
```

Das Prüfskript löst solche Konstanten auf und prüft ihre Länge.

### Kundentexte kürzen

Wenn der Kunde den Wortlaut vorgibt und dieser zu lang ist: **nicht neu formulieren, sondern kürzen.** In dieser Reihenfolge nach Streichkandidaten suchen:

1. Doppelte Wörter — „…für Festivals, Stadtfeste, Clubs, Firmenevents und private Feiern **buchbar**" bei einem Satz, der mit „**Buchbar** von einer 7-köpfigen…" beginnt
2. Füllwörter ohne Aussage — „Erfahrene Profimusiker" → „Profimusiker", „aller Art", „Wir garantieren Ihnen"
3. Das letzte Listenelement — bei fünf Anlässen tragen die letzten zwei nichts mehr bei

Jede Kürzung dem Kunden als Vorher/Nachher vorlegen, bevor sie final ist. Rechtschreibfehler in Kundentexten (etwa „Stadfteste" statt „Stadtfeste") und echte Grammatikfehler („Vertrauen uns BMW…" statt „Uns vertrauen BMW…") werden stillschweigend korrigiert — das sind keine Stilentscheidungen.

---

## 4. Titel

Richtwert 60 Zeichen, darüber kürzt Google in der Mitte. Etwas Überlänge ist vertretbar, wenn das Wichtigste vorn steht — die bestehenden Startseitentitel liegen bei 61–63 Zeichen und bleiben so.

Muster: `Seitenname – Bandname | Nutzen oder Suchbegriff`

Das `template` im Root-Layout hängt automatisch ` | Bandname` an alle Unterseiten. Wer den Bandnamen zusätzlich in den Seitentitel schreibt, erzeugt „Referenzen – Spirit of Soul | Kunden & Events **| Spirit of Soul**". Beim Setzen eines Titels also prüfen, ob das Template greift.

---

## 5. Technische Pflichtteile pro Seite

```ts
export const metadata: Metadata = {
  title: "…",
  description: "…",                                   // ≤155, ganzer Satz
  keywords: ["…"],                                    // max 5, ohne Wirkung
  alternates: { canonical: "https://<BASE_URL>/pfad" },
  openGraph: { title, description, url, images },
  twitter:   { card: "summary_large_image", title, description },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};
```

Zwei Fallen dabei:

**`robots` überschreibt komplett.** Ein `robots: { index: true, follow: true }` auf einer Seite ersetzt das gesamte `robots`-Objekt des Layouts — inklusive `googleBot`. Die Startseite verlor so `max-image-preview: large`, was grosse Bildvorschauen in den Suchergebnissen erlaubt. Wer `robots` auf Seitenebene setzt, muss den `googleBot`-Block mitsetzen.

**Alle URLs müssen zur `BASE_URL` passen.** `canonical`, `openGraph.url` und Bild-URLs auf einer fremden Domain sind ein Copy-Paste-Rest. Das Prüfskript vergleicht jede URL im Metadaten-Block gegen die `BASE_URL` aus `layout.tsx`.

### Seiten ausschliessen

Für Impressum, Datenschutz und Duplikate wie `/kontakt` (wenn die Navigation auf `/booking` zeigt):

```ts
robots: { index: false, follow: false },
```

Dazu gehört: Eintrag in `robots.ts` unter `disallow`, **nicht** in `sitemap.ts`. `noindex` und Sitemap-Eintrag gleichzeitig ist ein widersprüchliches Signal — das Skript meldet es als Fehler. Und `robots.txt` allein reicht nie: `Disallow` verhindert das Crawling, nicht die Indexierung. Eine per `Disallow` gesperrte Seite kann trotzdem in den Ergebnissen auftauchen, dann ohne Beschreibung.

### Strukturierte Daten

Das JSON-LD `MusicGroup`-Schema im Root-Layout hält Adresse, Genre, Gründungsjahr und `sameAs`-Links. Die `sameAs`-Profile müssen mit den Links im Footer übereinstimmen — bei Spirit of Soul zeigte `sameAs` auf `instagram.com/bobbystoecker`, der Footer auf `instagram.com/spiritofsoul`. Widersprüchliche Profile schwächen die Entitätserkennung.

---

## 6. Neue Bandseite anlegen

Eine bestehende App zu kopieren ist der schnellste Weg und die häufigste Fehlerquelle. Nach dem Klonen diese Liste vollständig abarbeiten:

- [ ] `src/config/band.ts` — `name`, `claim`, `location`, `email`, Socials, `clients`
- [ ] `src/app/layout.tsx` — `BASE_URL`, Titel-`default` und `template`, Beschreibung, `keywords`, JSON-LD komplett inklusive `sameAs`
- [ ] **Jede** `page.tsx` unter `src/app/` einzeln öffnen: Titel, Beschreibung, `keywords`, `canonical`, `openGraph.url`, Bild-URLs
- [ ] Routen löschen, die diese Band nicht hat — hier ist `/shop` entstanden. Prüfen: Steht die Route in der Navigation? In der Sitemap? Wenn beides nein: löschen (mit `rm`, nicht `git rm`)
- [ ] `src/app/sitemap.ts` und `src/app/robots.ts` — Routenliste und `BASE_URL`
- [ ] `src/app/api/admin/db/route.ts` — `PATH_MAP` auf die tatsächlich existierenden Routen
- [ ] Bilder unter `public/images/` — Dateinamen wie `Titel_SOS.avif` verraten die Herkunft
- [ ] `npm run seo:check` muss ohne Fehler durchlaufen

---

## 7. Inhalte, die Google sieht, aber nicht aus den Metadaten stammen

Snippets, Bildvorschauen und Rich Results ziehen auch aus dem Seiteninhalt. Zwei Punkte, die hier schon auseinandergelaufen sind:

**Startseite und Unterseite müssen dasselbe erzählen.** Die „Bekannte Veranstalter"-Leiste auf der Startseite las eine hartcodierte Liste aus `band.ts`, während `/referenzen` aus der Datenbank kam — die Startseite zeigte fünf Münchner Locations, die Meta-Beschreibung nannte die Alte Oper Frankfurt. Beide speisen sich jetzt aus derselben Quelle. Wenn eine Komponente Inhalte doppelt hält, ist das eine Frage von „wann", nicht „ob".

**Cache-Invalidierung nachziehen.** Wenn eine Komponente neu aus der Datenbank liest, muss ihre Route in `PATH_MAP` in `src/app/api/admin/db/route.ts` stehen. Sonst zeigt die Seite nach einer Admin-Änderung bis zu einer Stunde alte Daten. Die Referenzen speisen jetzt auch die Startseite, deshalb steht dort `referenzen: ["/", "/referenzen"]`.

**Platzhalter aus der Entwicklungsphase aufspüren.** In `band.ts` standen erfundene Bandmitglieder („Lisa Morgenstern", „Marco Ferreira") und Termine, die mit den echten nichts zu tun hatten. Vor dem Livegang jede Liste in `band.ts` gegen die Realität prüfen.

> **Rechtlicher Hinweis zu Referenzen:** Firmennamen als Kunden zu nennen, ohne dass sie es sind, ist in Deutschland irreführende Werbung nach § 5 UWG und zugleich unbefugte Markennutzung — beides abmahnfähig. Referenzlisten mit Konzernnamen vor dem Livegang vom Kunden schriftlich bestätigen lassen. Im Zweifel nicht in die Meta-Beschreibung aufnehmen, denn die wird in Google ausgespielt und ist damit weit exponierter als eine Leiste auf der Seite.

---

## 8. Nach dem Deploy

1. `npm run seo:check` — muss grün sein
2. Deployen
3. Search Console → URL-Prüfung → „Indexierung beantragen", für die Startseite und jede geänderte Unterseite
4. Sitemap eingereicht? Unter `https://<domain>/sitemap.xml`
5. Prüfen, dass die Search-Console-Property auf der **tatsächlichen** Domain läuft — für WE ROCK auf `werock-rockband.de`, nicht auf dem im Kundendokument genannten `we-rock.de`
6. Nach 1–2 Wochen kontrollieren, ob Google die neue Beschreibung übernommen hat. Falls nicht: gegen [Abschnitt 2](#2-wie-google-snippets-wirklich-wählt) prüfen — meist ist der Text noch zu listenartig oder nennt den Bandnamen zu spät

Alte URLs einer Vorgängerseite (bei Spirit of Soul etwa `/styled-4/shows.spirit.of.soul…html`) sollen **404** liefern, nicht auf die Startseite umgeleitet werden. Google entfernt sie dann von selbst aus dem Index. Eine Weiterleitung aller Alt-URLs auf die Startseite gilt als Soft-404 und schadet.

---

## 9. Was das Prüfskript abdeckt — und was nicht

`npm run seo:check` findet:

| Prüfung | Stufe |
|---|---|
| Fehlender `metadata`-Export | Fehler |
| Beschreibung > 155 Zeichen | Fehler |
| Beschreibung auf zwei Seiten identisch | Fehler |
| Name einer anderen Band in Titel oder Beschreibung | Fehler |
| URL weicht von `BASE_URL` ab | Fehler |
| `noindex` und gleichzeitig in der Sitemap | Fehler |
| Beschreibung < 70 Zeichen, ohne Satzende, Stichwortliste | Hinweis |
| Titel > 60 Zeichen | Hinweis |
| `canonical` fehlt | Hinweis |
| Indexierbar, aber nicht in der Sitemap | Hinweis |

Nicht abgedeckt — dafür braucht es einen Menschen:

- Ob eine Beschreibung inhaltlich stimmt oder gut klingt
- Ob eine Referenz echt ist
- Ob Google die Beschreibung tatsächlich übernimmt
- Ladezeiten, Core Web Vitals, Backlinks
- Bild-`alt`-Texte und Überschriftenhierarchie

Neue Regel hinzufügen: in `scripts/seo-check.mjs` einen `add("ERROR"|"WARN", app, route, "regel-name", "Meldung")`-Aufruf ergänzen und hier in der Tabelle nachtragen.

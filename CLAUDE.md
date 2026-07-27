# bands-network — Arbeitsanweisungen

Turborepo-Monorepo mit einer Next.js-App (App Router) pro Band. Inhalte kommen aus Supabase, gepflegt über ein Admin-Panel unter `/admin`.

- `apps/spirit-of-soul` — Soulband Frankfurt, Domain `https://spiritofsoul.com`
- `apps/we-rock` — Classic Rock Tribute Show, Domain `https://werock-rockband.de`
- `apps/docs`, `apps/web` — unbenutztes Turborepo-Boilerplate, ignorieren
- `packages/band-data` — Supabase-Abfragen mit `unstable_cache`
- `packages/db-types` — generierte Datenbanktypen

Alle Kommentare, Dokumentation und Commit-Nachrichten auf **Deutsch**. Nutzertexte im Sie-Format, ausser die bestehende Seite verwendet Du.

---

## SEO und Metadaten — Pflichtablauf

Vollständige Begründung jeder Regel: **`docs/SEO-GUIDE.md`**. Bei SEO-Aufgaben zuerst lesen.

**Nach jeder Änderung an Metadaten ausführen, ohne Ausnahme:**

```bash
npm run seo:check
```

Exit-Code 1 heisst: nicht abschliessen, nicht committen. Die Aufgabe ist erst fertig, wenn das Skript ohne Fehler durchläuft.

### Harte Regeln

1. **Jede `page.tsx` braucht einen eigenen `export const metadata`.** Ohne diesen erbt die Seite Titel und Beschreibung des Root-Layouts und erzeugt ein Duplikat in Google. `robots.txt`-`Disallow` verhindert das nicht — es steuert Crawling, nicht Indexierung.

2. **Beschreibungen maximal 155 Zeichen, als vollständiger Satz mit Punkt am Ende.** Kommaseparierte Stichwortlisten werden von Google verworfen und durch Seitentext ersetzt. Der Bandname gehört möglichst an den Satzanfang.

3. **`description`, `openGraph.description` und `twitter.description` einer Seite tragen denselben Text.** Bei Wiederholung in eine Konstante auslagern (`const HOME_DESCRIPTION = "…"`).

4. **Keine zwei Seiten mit identischer Beschreibung.**

5. **Alle URLs in den Metadaten müssen zur `BASE_URL` aus `src/app/layout.tsx` der jeweiligen App passen.** Eine fremde Domain in `canonical`, `openGraph.url` oder einer Bild-URL ist ein Copy-Paste-Rest aus einer anderen Bandseite.

6. **Niemals der Name einer anderen Band in Titel, Beschreibung oder Keywords.** Diese App-Ordner wurden voneinander geklont; solche Reste existieren real (`werock-rockband.de/shop` trug monatelang Spirit-of-Soul-Metadaten).

7. **`robots` auf Seitenebene überschreibt das Layout vollständig.** Wer es setzt, muss den `googleBot`-Block mitgeben, sonst gehen `max-image-preview: large` und `max-snippet: -1` verloren.

8. **`noindex` und Sitemap-Eintrag schliessen sich aus.** Ausgeschlossene Seiten: `robots: { index: false, follow: false }` **plus** `disallow` in `robots.ts` **und nicht** in `sitemap.ts`.

### Kundentexte

Die Meta-Texte beider Seiten sind vom Kunden vorgegeben und in `SpiritOfSoul_SEO_Uebersicht.docx` und `WeRock_SEO_Übersicht Webseite.docx` dokumentiert.

- Wortlaut **nicht** eigenmächtig neu formulieren. Bei Überlänge kürzen: doppelte Wörter, Füllwörter, letztes Listenelement — in dieser Reihenfolge.
- Jede Kürzung dem Nutzer als Vorher/Nachher vorlegen.
- Rechtschreib- und Grammatikfehler ohne Rückfrage korrigieren.
- **Achtung:** Das WeRock-Dokument nennt durchgängig `we-rock.de`. Das ist falsch, die Seite läuft auf `werock-rockband.de`. Bei Domain-Fragen dem Code folgen, nicht dem Dokument.

### Firmennamen als Referenzen

Referenzen kommen aus der Datenbank (`fetchReferenzen`), nicht aus dem Code. Konzernnamen als Kunden zu nennen, ohne dass sie es sind, ist irreführende Werbung nach § 5 UWG und unbefugte Markennutzung. Nie ungeprüft neue Firmennamen in Metadaten schreiben — beim Nutzer rückfragen.

---

## Datenbank und Caching

Inhalte werden über `packages/band-data` mit `unstable_cache` geladen (`revalidate: 3600`, Tags pro Tabelle). Admin-Mutationen invalidieren über `src/app/api/admin/db/route.ts`.

**Wenn eine Komponente neu aus der Datenbank liest, muss ihre Route in `PATH_MAP` in `src/app/api/admin/db/route.ts` eingetragen werden.** Sonst zeigt sie nach einer Admin-Änderung bis zu eine Stunde alte Daten. Beispiel: die Referenzen speisen sowohl `/referenzen` als auch die „Bekannte Veranstalter"-Leiste der Startseite, daher `referenzen: ["/", "/referenzen"]`.

Komponenten, die Datenbankinhalte anzeigen, brauchen einen Fallback auf `src/config/band.ts` — ohne Supabase-Konfiguration (lokal) liefern die `fetch*`-Funktionen leere Arrays.

---

## Git

**Dateien mit `rm` löschen, nicht mit `git rm`.** In dieser Umgebung schlägt `git rm` an Schreibrechten fehl und hinterlässt `.git/index.lock`, was danach jede Git-Operation blockiert („fatal: Unable to create … File exists"). Git erkennt Löschungen beim nächsten `git status` von selbst.

Tritt die Meldung auf: `rm -f .git/index.lock`.

Der Arbeitsbereich enthält häufig uncommittete Änderungen, die nicht zur aktuellen Aufgabe gehören. Vor Aussagen über den Diff prüfen, welche Dateien tatsächlich zur eigenen Änderung gehören, und nicht fremde Änderungen als eigene ausgeben.

---

## Befehle

```bash
npm run dev            # alle Apps
npm run build          # turbo build
npm run check-types    # tsc über alle Workspaces
npm run seo:check      # SEO-Prüfung (auch: -- --app spirit-of-soul, -- --json)
```

`npm run check-types` meldet in Sandbox-Umgebungen vorbestehende `Cannot find module '@bands/*'`-Fehler, weil die Workspace-Pakete nicht gebaut sind. Diese sind nicht Folge eigener Änderungen — vor dem Melden gegen den Ausgangszustand abgleichen.

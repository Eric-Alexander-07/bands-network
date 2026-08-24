# bands-network — Arbeitsanweisungen

Turborepo-Monorepo mit einer Next.js-App (App Router) pro Band. Inhalte kommen aus Supabase, gepflegt über ein Admin-Panel unter `/admin`.

- `apps/spirit-of-soul` — Soulband Frankfurt, Domain `https://spiritofsoul.com`
- `apps/we-rock` — Classic Rock Tribute Show, Domain `https://werock-rockband.de`
- `apps/groove-control` — Partyband Frankfurt, Domain `https://groovecontrol.info`. Bildmaterial fehlt noch; alle Bildfelder zeigen auf `/images/placeholder.svg`.
- `apps/docs`, `apps/web` — unbenutztes Turborepo-Boilerplate, ignorieren
- `packages/band-data` — Supabase-Abfragen, `getSiteBundle()` (eine Abfrage für den kompletten Seiteninhalt)
- `packages/db-types` — generierte Datenbanktypen
- `packages/content` — Typen und Hilfsfunktionen für `contentSchema.ts` (`resolve()`, `defaultsOf()`, …)
- `packages/admin-ui` — generische Admin-Bausteine (`ContentForm`, `ListEditor`, `ImageField`, Toast)
- `scripts/seed-content.ts` — befüllt `pages.content` aus dem Schema einer Band (idempotent)
- `scripts/diff-pages.sh` + `scripts/page-text.js` — Vorher/Nachher-Vergleich des sichtbaren Textes aller Seiten

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

**Der komplette Seiteninhalt wird in GENAU EINER Abfrage geladen.** `getSiteBundle()` in `packages/band-data/src/bundle.ts` holt Site, alle `pages`, alle Listen und alle Bilder in einem einzigen PostgREST-Request mit eingebetteten Relationen. Ergebnis: ein `unstable_cache`-Eintrag unter dem einen Tag `site-bundle` (`revalidate: 3600`).

In den Apps ruft jede Route `fetchBundle()` auf und liest danach nur noch synchron daraus (`pageContent(bundle, "home")`, `events(bundle)`, …). **Niemals neue Einzelabfragen pro Tabelle einführen** — das war der alte Zustand (Startseite = 3 Roundtrips) und ist bewusst entfernt.

Nach jeder Admin-Mutation invalidiert `src/app/api/admin/db/route.ts` den Tag `site-bundle` und alle Routen aus `PUBLIC_PATHS`. Eine Tabelle-zu-Pfad-Zuordnung gibt es nicht mehr; eine neue Tabelle kann also nicht mehr vergessen werden. Schreibbare Tabellen stehen in `WRITABLE_TABLES` — neue Tabellen dort eintragen, sonst antwortet die Route mit 403.

## Inhalte und Admin-Bereich

Jede Band beschreibt ihre Inhalte in **einer** Datei: `src/config/contentSchema.ts`. Dort steht pro Feld Schlüssel, Beschriftung, Typ und der **aktuelle Text als `default`**. Dieser Standardwert ist gleichzeitig Code-Fallback und Seed-Wert — dadurch können DB und Code nicht auseinanderlaufen.

Daraus entsteht automatisch:
- die Admin-Navigation und je Seite ein Formular (`/admin/inhalte/[slug]`, generisch),
- die Listen-Editoren (`ListEditor` aus `@bands/admin-ui`),
- der Seed (`node --experimental-strip-types scripts/seed-content.ts <app>`).

**Neue Felder oder Seiten erfordern nur eine Änderung am Schema, keinen neuen Admin-Code.** Für eine neue Band: `contentSchema.ts` kopieren, Texte anpassen, Seed laufen lassen.

Der Seed ist idempotent: vorhandene Werte bleiben unangetastet, es werden nur fehlende Schlüssel ergänzt. Er überschreibt also keine Kundenänderungen.

Komponenten, die Datenbankinhalte anzeigen, brauchen einen Fallback (`contentReader()` aus `@bands/content` bzw. `src/config/band.ts`) — ohne Supabase-Konfiguration liefert `fetchBundle()` ein leeres Bundle.

**Typen:** `packages/db-types/src/database.types.ts` ist generiert, nicht von Hand ändern. Fehlt dort je Tabelle `Relationships` oder der Block `__InternalSupabase`, fällt supabase-js still auf `never` zurück. `@supabase/ssr` 0.5.x verliert den `Database`-Generic, deshalb haben `createClient()`/`createServerSupabaseClient()` eine explizite Rückgabe-Annotation.

---

## Neue Band anlegen — Checkliste

Diese Reihenfolge einhalten. Jeder Punkt korrigiert einen Fehler, der beim Umbau von We Rock und Spirit of Soul tatsächlich passiert ist — nicht optional.

### 1. App-Grundgerüst

- Bestehende App als Vorlage kopieren (die, deren Seitenstruktur der neuen Band näher ist).
- `package.json`: Name und Dev-Port anpassen.
- `.env.local`: Supabase-Zugangsdaten (gemeinsames Projekt `VMP-Bands`) plus eigenes `NEXT_PUBLIC_SITE_SLUG`.
- `BASE_URL` in `layout.tsx`, `robots.ts`, `sitemap.ts` auf die eigene Domain — **niemals** den Wert der kopierten Vorlage stehen lassen (genau das war monatelang bei `werock-rockband.de/shop` der Fall, siehe SEO-Abschnitt oben).

### 2. Supabase

- Eine Zeile in `sites` (slug, name, domain) und mindestens eine Zeile in `site_admins` für die Redaktion anlegen.
- **Keine neue Tabelle ohne triftigen Grund.** Die bestehenden 15 Tabellen (`sites`, `pages`, `events`, `media_images`, `media_videos`, `products`, `referenzen`, `besetzung_gruppen`/`_eintraege`, `social_links`, `band_members`, `partner_gruppen`/`_eintraege`, `occasions`, `inquiry_questions`, `section_images`) decken praktisch jeden Seitentyp ab.
- Falls doch eine neue Tabelle nötig ist: RLS exakt im bestehenden Muster (`public_read_*` mit `using (true)` bzw. `visible = true`, `admin_all_*` über einen `site_admins`-Join). Und in `packages/db-types/src/database.types.ts` ergänzen — **inklusive `Relationships: [...]` pro Tabelle und dem `__InternalSupabase`-Block**. Fehlt eines davon, liefert supabase-js `never` und jede Abfrage über diese Tabelle wird zum Typfehler (siehe oben).

### 3. `contentSchema.ts` — die größte Fehlerquelle

- **Niemals das Schema einer anderen Band unbesehen kopieren.** Für jedes Feld und jede Liste prüfen: liest die tatsächliche Komponente *dieser* Band diesen Wert überhaupt? (Realer Fehler: We Rocks Admin bekam eine zweistufige „Besetzungen“-Liste, weil das Schema von Spirit of Soul kopiert wurde — We Rocks `ServicesPage.tsx` zeigt an der Stelle aber nur ein Freitextfeld. Ergebnis: ein Editor ohne jede Wirkung auf die Seite.)
- `default` muss **bytegenau** der aktuell im Code stehende Text sein — kein Umformulieren, Kürzen oder versehentliches Glätten von Zeilenumbrüchen. Der Wert ist gleichzeitig Code-Fallback und DB-Seed; jede Abweichung lässt beide auseinanderlaufen.
- Enum-Werte (z. B. `partner_gruppen.kind`) exakt gegen den DB-`CHECK`-Constraint prüfen, nicht neu erfinden (`"media" | "band"`, nicht z. B. `"pool"`/`"artist"`).
- Ton der Band beachten: manche Bands duzen/„Ihr“-en, manche siezen förmlich. Beim Kopieren von `inquiryMail.ts`, `BookingForm.tsx`-Checklisten o. Ä. den Ton der *neuen* Band übernehmen, nicht den der Vorlage.

### 4. Komponenten anbinden

- Inhalte werden als **fertig aufgelöstes Objekt** übergeben (`const c = resolve(bundle, "slug")` aus `@/lib/content`), **niemals als Funktion**. Client Components (`"use client"`) können keine Funktionen als Prop von einer Server Component erhalten — React bricht mit „Functions cannot be passed directly to Client Components“ ab.
- Mehrzeiliger oder ausgezeichneter Text: `<Lines text={c.foo} />` für Zeilenumbrüche (ersetzt `<br/>`), `<Rich text={c.foo} />` für `**fett**` (ersetzt `<strong>`). Nicht roh interpolieren, wenn das Original Markup enthielt.
- Bildreihen mit fester Slotzahl im Layout (Karussell, Social-Grid) bekommen `maxItems` im Schema. Galerie, Sänger-Karussell, Termine bleiben unbegrenzt.

### 5. Verifikation — vor jedem „fertig“

1. Vor dem Anbinden: `bash scripts/diff-pages.sh snapshot` sichert den sichtbaren Text aller Seiten der neuen Band im Ist-Zustand.
2. Nach jeder angebundenen Seite: `npx tsc --noEmit` (Zeilen mit `.next/types` ignorieren) und `bash scripts/diff-pages.sh check`. Jede Seite muss `OK` melden — eine `ABWEICHUNG` ist ein echter Fehler, nicht wegdiskutieren.
3. Seed **immer erst mit `--dry` prüfen**, dann ausführen: `node --experimental-strip-types scripts/seed-content.ts <app>`.

### 6. Betrieb

- Nach Anlage eines neuen Workspace-Pakets: `npm install` im Repo-Root, **danach** alle Dev-Server neu starten — Next.js übernimmt neu verlinkte Pakete sonst nicht.
- „Der Server startet nicht/reagiert nicht“ zuerst mit einem Port-Check klären (alter Prozess blockiert den Port), bevor im Code gesucht wird.
- Neue Tabelle in `WRITABLE_TABLES` in `src/app/api/admin/db/route.ts` eintragen, sonst antwortet die Route mit 403. Neue Route in `PUBLIC_PATHS` ergänzen, damit sie nach Admin-Änderungen mit revalidiert wird.
- `src/app/api/revalidate/route.ts` invalidiert bereits generisch den `site-bundle`-Tag — hier ist für eine neue Band nichts anzupassen.

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

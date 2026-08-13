/**
 * Inhaltsschema fuer Spirit of Soul.
 *
 * Diese Datei beschreibt EINMAL jeden editierbaren Text und jedes editierbare
 * Bild der Website. Der jeweilige `default` ist exakt der Text, der heute im
 * Code steht — er dient damit gleichzeitig als:
 *   1. Fallback im Code (wenn die Datenbank nichts liefert),
 *   2. Seed-Wert fuer die Datenbank,
 *   3. Formularbeschriftung/Vorbelegung im Admin.
 *
 * Wichtig:
 *   - Die Schluessel `text_top`, `text_bottom`, `besetzung_text`,
 *     `technik_text`, `video_text`, `text_body` und `image_main` sind bereits
 *     in der Datenbank in Gebrauch und duerfen NICHT umbenannt werden, sonst
 *     gehen bestehende Kundeninhalte verloren.
 *   - Mehrzeilige Werte werden in den Komponenten an `\n` getrennt
 *     (z. B. Absaetze in `text_bottom`, Zeilenumbrueche in Ueberschriften).
 *   - Der Tonfall von Spirit of Soul ist bewusst formell ("Sie") — Texte hier
 *     niemals eigenmaechtig umformulieren.
 *
 * Listen (Termine, Besetzung, Produkte, ...) liegen in eigenen Tabellen und
 * werden ueber `lists` auf der Seite deklariert, auf der sie gepflegt werden.
 */

import type { SiteContentSchema } from "@bands/content";

export const contentSchema: SiteContentSchema = {
  pages: [
    // ─────────────────────────────────────────────────────────────
    // Allgemein & Footer
    // ─────────────────────────────────────────────────────────────
    {
      slug: "global",
      title: "Allgemein & Footer",
      path: "/",
      description:
        "Bandangaben, die auf jeder Seite erscheinen (Navigation, Footer, Kontaktdaten).",
      groups: [
        {
          title: "Band",
          description: "Wird in Navigation, Hero, Footer und E-Mail-Vorlagen verwendet.",
          fields: [
            { key: "band_name", label: "Bandname", type: "text", default: "Spirit of Soul" },
            { key: "band_claim", label: "Claim", type: "text", default: "The Finest Of Black Music" },
            { key: "band_tagline", label: "Tagline", type: "text", default: "Entertainment der Extraklasse" },
            { key: "band_genre", label: "Genre", type: "text", default: "Soul / Funk / Motown / R&B / Hiphop" },
            { key: "band_location", label: "Ort", type: "text", default: "Frankfurt am Main" },
            { key: "band_email", label: "E-Mail-Adresse", type: "text", default: "info@v-m-p.com", help: "Ziel aller Anfrage- und Bestell-Links." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Startseite
    // ─────────────────────────────────────────────────────────────
    {
      slug: "home",
      title: "Startseite",
      path: "/",
      groups: [
        {
          title: "Hero",
          fields: [
            { key: "hero_title", label: "Grosse Ueberschrift", type: "textarea", rows: 2, default: "Spirit\nof Soul", help: "Eine Zeile pro Textzeile. Die zweite Zeile wird kursiv dargestellt." },
            { key: "hero_claim", label: "Claim", type: "text", default: "The Finest Of Black Music" },
            { key: "hero_sub", label: "Untertitel", type: "textarea", rows: 2, default: "Entertainment der Extraklasse — 25 Jahre Live-Erfahrung auf internationalen Bühnen." },
            { key: "hero_image", label: "Hero-Bild", type: "image", default: "/images/hero.webp" },
            { key: "hero_dates_label", label: "Ueberschrift Termine-Block", type: "text", default: "Nächste öffentliche Auftritte", help: "Der Block erscheint nur, wenn sichtbare Termine hinterlegt sind." },
          ],
        },
        {
          title: "Ueber die Band",
          fields: [
            { key: "about_title", label: "Ueberschrift", type: "text", default: "Spirit of Soul" },
            { key: "about_text", label: "Text", type: "textarea", rows: 8, default: "Spirit of Soul ist ein Zusammenschluss aus erfahrenen Profimusikern und -sängern, die sich entschlossen haben, den Geist des Soul auf der Bühne neu zu erwecken und zu zelebrieren. Die Band bietet eine Auswahl an individuellen Showpaketen und Bandkonstellationen für jede Veranstaltung. Die Vielseitigkeit und Flexibilität lässt sich an den jeweiligen Event anpassen — egal ob Clubs, Firmenfeiern, Produktpräsentationen oder Privatveranstaltungen. Spirit of Soul garantiert ein Entertainment der Extraklasse, das Ihren Gästen noch lange in Erinnerung bleiben wird." },
            { key: "about_image", label: "Bild", type: "image", default: "/images/spirit-of-soul-26.webp" },
          ],
        },
        {
          title: "Zahlen",
          description: "Die vier Kennzahlen unter dem Text „Ueber die Band“.",
          fields: [
            { key: "about_fact1_value", label: "Zahl 1", type: "text", default: "25+" },
            { key: "about_fact1_label", label: "Beschriftung 1", type: "text", default: "Jahre auf der Bühne" },
            { key: "about_fact2_value", label: "Zahl 2", type: "text", default: "500+" },
            { key: "about_fact2_label", label: "Beschriftung 2", type: "text", default: "Live-Auftritte" },
            { key: "about_fact3_value", label: "Zahl 3", type: "text", default: "12" },
            { key: "about_fact3_label", label: "Beschriftung 3", type: "text", default: "Musiker (max.)" },
            { key: "about_fact4_value", label: "Zahl 4", type: "text", default: "200+" },
            { key: "about_fact4_label", label: "Beschriftung 4", type: "text", default: "Songs im Repertoire" },
          ],
        },
        {
          title: "Social Media",
          fields: [
            { key: "social_title", label: "Ueberschrift", type: "textarea", rows: 2, default: "News auf Instagram\n& Facebook", help: "Eine Zeile pro Textzeile." },
            { key: "social_text", label: "Text", type: "textarea", rows: 3, default: "Bleibt up to date — neue Auftritte, Behind-the-Scenes und direkte Einblicke in unser Bandleben." },
          ],
        },
        {
          title: "Anlaesse",
          fields: [
            { key: "occasions_title", label: "Ueberschrift", type: "text", default: "Jedem Anlass" },
            { key: "occasions_text", label: "Text", type: "textarea", rows: 3, default: "Ob Hochzeit, Firmen-Event, Stadtfest oder exklusive Feier — Spirit of Soul passt sich jedem Rahmen an und sorgt für den richtigen Sound zur richtigen Zeit." },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "textarea", rows: 2, default: "Unvergessliche Musik\nfür Ihr Event", help: "Eine Zeile pro Textzeile." },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3, default: "Von der kleinen Dinner Besetzung bis zur 12-köpfigen Full-Band mit Bläser Sektion & Percussions — wir erstellen ein maßgeschneidertes Angebot für Ihre Veranstaltung." },
          ],
        },
      ],
      lists: [
        {
          key: "events",
          title: "Öffentliche Termine",
          description: "Im Hero erscheinen die naechsten drei sichtbaren Termine, auf „Media, News & Termine“ alle.",
          table: "events",
          hasVisible: true,
          fields: [
            { key: "date", label: "Datum", type: "date", flex: 1 },
            { key: "name", label: "Veranstaltung", type: "text", flex: 2 },
            { key: "location", label: "Ort", type: "text", flex: 2 },
            { key: "link", label: "Link (Tickets / Info)", type: "url", placeholder: "https://…", flex: 2 },
          ],
          newRow: { name: "", date: "", location: "", link: "", visible: true },
        },
        {
          key: "section_images_occasions",
          title: "Bilder Anlaesse-Karussell",
          description: "Fotos neben dem Abschnitt „Jedem Anlass“.",
          table: "section_images",
          hasVisible: true,
          filter: { column: "section_key", value: "occasions" },
          maxItems: 3,
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
          ],
          newRow: { section_key: "occasions", url: "", visible: true },
        },
        {
          key: "section_images_social",
          title: "Bilder Social-Media-Raster",
          description: "Die sechs Fotos neben „News auf Instagram & Facebook“.",
          table: "section_images",
          hasVisible: true,
          filter: { column: "section_key", value: "social_grid" },
          maxItems: 1,
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
          ],
          newRow: { section_key: "social_grid", url: "", visible: true },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Ueber uns
    // ─────────────────────────────────────────────────────────────
    {
      slug: "about",
      title: "Über uns",
      path: "/about",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/uber-uns.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Über uns" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3, default: "25 Jahre Soul, R&B und Funk auf internationalen Bühnen.\nEntertainment der Extraklasse." },
          ],
        },
        {
          title: "Hauptabschnitt",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/uber-uns.webp" },
            { key: "about_title", label: "Ueberschrift", type: "textarea", rows: 2, default: "25 Jahre Bühne.\nEine Leidenschaft.", help: "Eine Zeile pro Textzeile." },
            { key: "text_bottom", label: "Text", type: "textarea", rows: 10, default: "Spirit of Soul steht seit 25 Jahren für erstklassiges Live-Entertainment. Mit internationalen Sängern, erfahrenen Musikern und einer unverwechselbaren Energie begeistert die Band Gäste bei Hochzeiten, Firmenevents, Stadtfesten und exklusiven Galas europaweit.\nDie Stärke liegt in der Musikalität und Spontanität aller Bandmitglieder — das Programm wird kurzfristig auf der Bühne maßgeschneidert, damit der erste Song das Publikum sofort bewegt.", help: "Jede Zeile wird ein eigener Absatz." },
          ],
        },
        {
          title: "Saenger-Karussell",
          description: "Die Bilder selbst werden auf der Seite „Services“ unter „Sänger“ gepflegt.",
          fields: [
            { key: "members_title", label: "Ueberschrift", type: "text", default: "Unsere Sänger" },
          ],
        },
      ],
      lists: [
        {
          key: "band_members",
          title: "Sänger",
          description: "Bilder des Karussells auf der Seite „Über uns“.",
          table: "band_members",
          hasVisible: true,
          fields: [
            { key: "image_url", label: "Bild", type: "image", flex: 2 },
            { key: "name", label: "Name", type: "text", flex: 2 },
            { key: "role", label: "Rolle", type: "text", flex: 2 },
          ],
          newRow: { name: "", role: "", image_url: "", visible: true },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Services
    // ─────────────────────────────────────────────────────────────
    {
      slug: "services",
      title: "Services",
      path: "/services",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/gallery/live-vocalist-gold.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Services" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3, default: "Vom intimen Dinner bis zur 12-köpfigen Full-Band mit Multimedia-Show — Spirit of Soul bringt die passende Musik und Technik für jeden Anlass." },
          ],
        },
        {
          title: "Besetzung",
          fields: [
            { key: "besetzung_title", label: "Ueberschrift", type: "text", default: "Besetzung" },
            { key: "besetzung_text", label: "Einleitungstext", type: "textarea", rows: 3, default: "Spirit of Soul ist für verschiedene Events in verschiedenen Besetzungen buchbar — von der eleganten kleinen Formation bis zur 12-köpfigen Full-Band mit Bläser Sektion." },
          ],
        },
        {
          title: "Technik",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/gallery/live-stage-duo.webp" },
            { key: "technik_title", label: "Ueberschrift", type: "text", default: "Technik" },
            { key: "technik_text", label: "Text", type: "textarea", rows: 7, default: "Planen Sie in Absprache mit uns auch die optische und akustische Präsentation von Spirit of Soul. Vertrauen Sie auf ein Team aus Künstlern und Technikern, das schon jahrelang zusammenarbeitet. Unsere Techniker sind firmenevent- sowie galaerfahren und kennen die Einsätze eines jeden Sängers und Instrumentalisten — eine Tatsache, die Ihre Veranstaltung hörbar zu einem akustischen Leckerbissen werden lässt." },
            { key: "technik_note", label: "Hinweis darunter", type: "textarea", rows: 4, default: "Gerne erstellen wir Ihnen ein Paket-Angebot über Band, Bühne, Tonanlage & Licht inkl. technischer Betreuung. Hierzu benötigen wir genauere Daten der Location sowie ggf. Bilder von vorangegangenen Veranstaltungen." },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text", default: "Interesse?" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3, default: "Wir erstellen gerne ein maßgeschneidertes Angebot für Ihre Veranstaltung — inkl. Band, Bühne und Technik." },
          ],
        },
      ],
      lists: [
        {
          key: "besetzung",
          title: "Besetzungen",
          description: "Zwei Spalten mit je beliebig vielen Formationen.",
          table: "besetzung_gruppen",
          fields: [
            { key: "name", label: "Spaltentitel", type: "text", flex: 2 },
            { key: "beschreibung", label: "Untertitel", type: "text", flex: 3 },
          ],
          newRow: { name: "", beschreibung: "" },
          child: {
            table: "besetzung_eintraege",
            foreignKey: "gruppe_id",
            title: "Formationen",
            fields: [
              { key: "name", label: "Formation", type: "text", flex: 1 },
              { key: "beschreibung", label: "Besetzung", type: "text", flex: 3 },
            ],
            newRow: { name: "", beschreibung: "" },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Media, News & Termine
    // ─────────────────────────────────────────────────────────────
    {
      slug: "media",
      title: "Media, News & Termine",
      path: "/media",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/gallery/live-guitarist.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Media, News & Termine" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 2, default: "Aktuelle Spieltermine, Videos und Social Media von Spirit of Soul." },
          ],
        },
        {
          title: "Videos",
          fields: [
            { key: "videos_title", label: "Ueberschrift", type: "text", default: "Auf der Bühne" },
            { key: "video_text", label: "Text unter dem Hauptvideo", type: "textarea", rows: 4, default: "", help: "Leer lassen, wenn kein Text erscheinen soll." },
          ],
        },
        {
          title: "Termine",
          description: "Die Termine selbst werden auf der Startseite gepflegt.",
          fields: [
            { key: "events_title", label: "Ueberschrift", type: "text", default: "Öffentliche Termine" },
          ],
        },
        {
          title: "Social Media",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/gallery/live-vocalist-gold.webp" },
            { key: "social_title", label: "Ueberschrift", type: "text", default: "News auf Instagram & Facebook" },
            { key: "social_text", label: "Text", type: "textarea", rows: 3, default: "Bleibt up to date — neue Auftritte, Fotos, Behind-the-Scenes und direkte Einblicke in unser Bandleben." },
          ],
        },
      ],
      lists: [
        {
          key: "media_videos",
          title: "Videos",
          description: "Das erste Video wird gross ausgespielt, die weiteren als Playlist.",
          table: "media_videos",
          fields: [
            { key: "youtube_url", label: "YouTube-Link oder Video-ID", type: "text", placeholder: "https://www.youtube.com/watch?v=…", flex: 3 },
            { key: "title", label: "Titel", type: "text", flex: 3, placeholder: "Leer lassen = Titel von YouTube uebernehmen" },
          ],
          newRow: { youtube_url: "", title: "" },
        },
        {
          key: "social_links",
          title: "Social-Media-Profile",
          description: "Plattform-Schluessel: instagram, facebook, youtube, spotify.",
          table: "social_links",
          fields: [
            { key: "platform", label: "Plattform", type: "select", options: ["instagram", "facebook", "youtube", "spotify"], flex: 1 },
            { key: "url", label: "Profil-Link", type: "url", placeholder: "https://…", flex: 3 },
          ],
          newRow: { platform: "instagram", url: "" },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Galerie
    // ─────────────────────────────────────────────────────────────
    {
      slug: "galerie",
      title: "Galerie",
      path: "/galerie",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/gallery/live-stage-duo.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Galerie" },
            { key: "page_hero_text", label: "Text im Seitenkopf", type: "textarea", rows: 2, default: "Eindrücke von unseren Live-Auftritten, Studio-Sessions und Events." },
          ],
        },
        {
          title: "Fotoraster",
          fields: [
            { key: "gallery_title", label: "Ueberschrift", type: "text", default: "Fotos" },
          ],
        },
      ],
      lists: [
        {
          key: "media_images",
          title: "Fotos",
          table: "media_images",
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
            { key: "caption", label: "Bildbeschreibung", type: "text", flex: 3 },
            { key: "credit", label: "Fotograf / Credit", type: "text", flex: 2 },
          ],
          newRow: { url: "", caption: "", credit: "" },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Referenzen
    // ─────────────────────────────────────────────────────────────
    {
      slug: "referenzen",
      title: "Referenzen",
      path: "/referenzen",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/gallery/live-festival-singer.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Referenzen" },
            { key: "page_hero_text", label: "Text im Seitenkopf", type: "textarea", rows: 3, default: "Spirit of Soul hat bei Hunderten von Events gespielt — von exklusiven Galas über Firmenfeiern bis zu internationalen Hochzeiten." },
          ],
        },
        {
          title: "Kundenleiste",
          fields: [
            { key: "referenzen_title", label: "Ueberschrift", type: "text", default: "Unsere Kunden" },
            { key: "referenzen_text", label: "Einleitungstext", type: "textarea", rows: 3, default: "Eine Auswahl der Unternehmen, Veranstalter und Privatkunden, die Spirit of Soul für ihre Events gebucht haben." },
          ],
        },
        {
          title: "Partner & Netzwerk",
          fields: [
            { key: "partner_title", label: "Ueberschrift", type: "text", default: "Partner & Netzwerk" },
            { key: "partner_text", label: "Einleitungstext", type: "textarea", rows: 4, default: "Wir arbeiten mit einem festen Netzwerk zusammen: erfahrene Foto- und Video-Profis sowie alle Bands aus dem VMP-Künstlerpool – jede mit ihrer eigenen Website." },
            { key: "partner_vmp_text", label: "Hinweistext im Kasten", type: "textarea", rows: 4, default: "Spirit of Soul ist Teil des **Vivid Music Productions** Künstlerpools – einem Netzwerk aus Profibands, Musikern und Medienschaffenden für Events jeder Größe.", help: "„Vivid Music Productions“ wird fett dargestellt." },
            { key: "partner_vmp_url", label: "Ziel des Buttons", type: "url", default: "https://v-m-p.com" },
            { key: "partner_media_title", label: "Ueberschrift Block 1", type: "text", default: "Foto & Video" },
            { key: "partner_pool_title", label: "Ueberschrift Block 2", type: "text", default: "Künstlerpool" },
            { key: "partner_card_current", label: "Hinweis auf der eigenen Karte", type: "text", default: "Diese Website" },
            { key: "partner_card_plain", label: "Hinweis bei Partnern ohne Link", type: "text", default: "Auf Anfrage" },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text", default: "Auch dabei sein?" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 2, default: "Schreib uns für Verfügbarkeiten und ein persönliches Angebot." },
          ],
        },
      ],
      lists: [
        {
          key: "referenzen",
          title: "Referenzen",
          description: "Speist die Laufschrift hier und die Leiste „Bekannte Veranstalter“ auf der Startseite.",
          table: "referenzen",
          fields: [
            { key: "name", label: "Kunde / Veranstalter", type: "text", flex: 3 },
            { key: "type", label: "Art der Veranstaltung", type: "text", flex: 2 },
          ],
          newRow: { name: "", type: "" },
        },
        {
          key: "partner_gruppen",
          title: "Partnergruppen",
          description: "Art „media“ erscheint unter „Foto & Video“, Art „artist“ unter „Künstlerpool“.",
          table: "partner_gruppen",
          hasVisible: true,
          fields: [
            { key: "name", label: "Gruppentitel", type: "text", flex: 2 },
            { key: "beschreibung", label: "Beschreibung", type: "text", flex: 3 },
            { key: "kind", label: "Art", type: "select", options: ["media", "band"], flex: 1 },
          ],
          newRow: { name: "", beschreibung: "", kind: "band", visible: true },
          child: {
            table: "partner_eintraege",
            foreignKey: "gruppe_id",
            title: "Partner",
            hasVisible: true,
            fields: [
              { key: "name", label: "Name", type: "text", flex: 2 },
              { key: "url", label: "Website", type: "url", placeholder: "Leer lassen = „Auf Anfrage“", flex: 3 },
            ],
            newRow: { name: "", url: "", visible: true },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Kontakt & Buchung
    // ─────────────────────────────────────────────────────────────
    {
      slug: "booking",
      title: "Kontakt & Buchung",
      path: "/booking",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/sanger2.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Booking" },
            { key: "page_hero_text", label: "Text im Seitenkopf", type: "textarea", rows: 3, default: "Jetzt euer Datum anfragen und ein maßgeschneidertes Angebot erhalten. Wir melden uns innerhalb von 24 Stunden." },
          ],
        },
        {
          title: "Kontaktspalte",
          fields: [
            { key: "booking_title", label: "Ueberschrift", type: "text", default: "Spirit of Soul anfragen" },
            { key: "booking_text", label: "Text", type: "textarea", rows: 3, default: "Schreibt uns für Verfügbarkeiten, Konditionen und individuelle Wünsche. Wir melden uns in der Regel innerhalb von 24 Stunden." },
            { key: "booking_email_label", label: "Beschriftung E-Mail", type: "text", default: "E-Mail" },
            { key: "booking_location_label", label: "Beschriftung Standort", type: "text", default: "Standort" },
          ],
        },
        {
          title: "Checkliste",
          description: "Die Fragen dazwischen werden unten unter „Fragen zur Anfrage“ gepflegt.",
          fields: [
            { key: "booking_checklist_intro", label: "Einleitungstext", type: "textarea", rows: 4, default: "Schicken Sie uns einfach eine E-Mail. Am schnellsten geht das über das Kontaktformular rechts – es enthält bereits alle wichtigen Fragen und öffnet automatisch Ihr E-Mail-Programm mit einer fertigen Vorlage." },
            { key: "booking_checklist_title", label: "Ueberschrift der Liste", type: "text", default: "Hilfreiche Angaben für Ihre Anfrage" },
            { key: "booking_checklist_first", label: "Erster Punkt der Liste", type: "text", default: "Bitte geben Sie im Betreff den Namen der Band an: Spirit of Soul.", help: "Der Bandname wird fett dargestellt." },
          ],
        },
        {
          title: "Formular",
          fields: [
            { key: "booking_form_name_label", label: "Beschriftung Name", type: "text", default: "Name" },
            { key: "booking_form_email_label", label: "Beschriftung E-Mail", type: "text", default: "E-Mail" },
            { key: "booking_form_phone_label", label: "Beschriftung Telefon", type: "text", default: "Telefon" },
            { key: "booking_form_date_label", label: "Beschriftung Datum", type: "text", default: "Veranstaltungsdatum" },
            { key: "booking_form_occasion_label", label: "Beschriftung Anlass", type: "text", default: "Anlass" },
            { key: "booking_form_occasion_placeholder", label: "Erster Eintrag der Anlass-Auswahl", type: "text", default: "Bitte auswählen ..." },
            { key: "booking_form_message_label", label: "Beschriftung Nachricht", type: "text", default: "Nachricht" },
            { key: "booking_form_submit", label: "Button", type: "text", default: "Anfrage senden" },
          ],
        },
        {
          title: "Bestaetigung nach dem Absenden",
          fields: [
            { key: "booking_success_title", label: "Ueberschrift", type: "text", default: "Nachricht gesendet!" },
            { key: "booking_success_text", label: "Text", type: "textarea", rows: 2, default: "Wir melden uns so schnell wie möglich bei euch." },
          ],
        },
      ],
      lists: [
        {
          key: "occasions",
          title: "Anlässe",
          description: "Auswahlliste „Anlass“ im Formular.",
          table: "occasions",
          hasVisible: true,
          fields: [
            { key: "icon", label: "Symbol", type: "text", flex: 1 },
            { key: "title", label: "Anlass", type: "text", flex: 2 },
            { key: "description", label: "Beschreibung", type: "textarea", rows: 2, flex: 4 },
          ],
          newRow: { icon: "", title: "", description: "", visible: true },
        },
        {
          key: "inquiry_questions",
          title: "Fragen zur Anfrage",
          description: "Stehen in der Checkliste zwischen erstem und letzten Punkt. Nur Fragen mit „In E-Mail-Vorlage“ landen zusaetzlich in der vorausgefuellten Nachricht.",
          table: "inquiry_questions",
          hasVisible: true,
          fields: [
            { key: "text", label: "Frage / Hinweis", type: "text", flex: 5 },
            { key: "in_template", label: "In E-Mail-Vorlage", type: "boolean", flex: 1 },
          ],
          newRow: { text: "", in_template: true, visible: true },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // Shop
    // ─────────────────────────────────────────────────────────────
    {
      slug: "shop",
      title: "Shop",
      path: "/shop",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "image_main", label: "Hintergrundbild", type: "image", default: "/images/hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Shop" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 2, default: "20 Jahre Spirit of Soul — jetzt feiern wir mit euch. CD und T-Shirts auf Anfrage bestellbar." },
          ],
        },
        {
          title: "Bestellhinweis",
          fields: [
            { key: "text_body", label: "Text", type: "textarea", rows: 6, default: "Alle Preise verstehen sich zzgl. Versand. Schreibt uns eine E-Mail an info@v-m-p.com mit eurem Namen, eurer Adresse sowie der gewünschten Anzahl der CDs bzw. Größe und Farbe des Shirts. Gegen Vorauskasse erhaltet ihr eure Merch-Produkte umgehend zugeschickt.", help: "Jede Zeile wird ein eigener Absatz." },
          ],
        },
        {
          title: "Produktliste",
          fields: [
            { key: "shop_products_title", label: "Ueberschrift", type: "text", default: "Merchandise" },
            { key: "shop_price_note", label: "Hinweis neben dem Preis", type: "text", default: "zzgl. Versand" },
          ],
        },
      ],
      lists: [
        {
          key: "products",
          title: "Produkte",
          table: "products",
          hasVisible: true,
          fields: [
            { key: "image_url", label: "Bild vorne", type: "image", flex: 2 },
            { key: "image_url_back", label: "Bild hinten", type: "image", flex: 2 },
            { key: "tag", label: "Label", type: "text", flex: 2 },
            { key: "name", label: "Produktname", type: "text", flex: 2 },
            { key: "subtitle", label: "Untertitel", type: "text", flex: 2 },
            { key: "description", label: "Beschreibung", type: "textarea", rows: 5, flex: 5 },
            { key: "price", label: "Preis", type: "text", placeholder: "15,00 EUR", flex: 1 },
            { key: "email_subject", label: "Betreff der Bestell-Mail", type: "text", flex: 3 },
          ],
          newRow: {
            name: "",
            subtitle: "",
            description: "",
            price: "",
            tag: "",
            email_subject: "",
            image_url: "",
            image_url_back: "",
            visible: true,
          },
        },
      ],
    },
  ],
};

export default contentSchema;

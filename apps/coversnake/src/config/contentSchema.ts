/**
 * Inhaltsschema fuer COVERSNAKE.
 *
 * Diese Datei deklariert JEDEN editierbaren Text und jedes editierbare Bild der
 * Website — einmal, an einer Stelle. Der Wert in `default` ist zugleich:
 *   1. Vorlage fuer die Formulare im Admin-Bereich,
 *   2. Rueckfall im Code (wenn die Datenbank nichts liefert),
 *   3. Seed, mit dem die Datenbank erstmalig befuellt wird.
 *
 * QUELLEN aller Inhalte: coversnake.com (Gruendungsjahr, Motto, Besetzungs-
 * groesse, Showlaenge), v-m-p.com/coversnake (Bandtext, Hoerproben, Buehnen-
 * produktion, Kontaktdaten) und die VMP-Datenbank (Repertoire, YouTube-Links,
 * Social-Profile). Bildmaterial: VMP-Bilderpool der Band (34 Buehnenfotos),
 * aufbereitet unter `public/images` bzw. im Storage-Ordner `coversnake/`.
 *
 * TON: Sie-Form, wie bei den uebrigen Bandseiten des Netzwerks. Ueberschriften
 * bleiben kurz und plakativ — das Design lebt von Silber auf Schwarz und einem
 * einzigen roten Akzent, nicht von Zierschrift.
 *
 * ABGLEICH MIT DEN KOMPONENTEN: Jedes Feld hier wird von genau einer
 * Komponente gelesen. Es gibt bewusst KEIN `hero_title` (die Startseite traegt
 * die Wortmarke als Ueberschrift).
 *
 * BEWUSST LEER: `band_members` und `referenzen`. Fuer diese Band liegen keine
 * belegten Personendaten bzw. Auftraggeber vor — erfundene Namen waeren
 * irrefuehrende Werbung nach § 5 UWG. Beide Abschnitte blenden sich selbst
 * aus, solange die Listen leer sind, und werden im Admin gepflegt.
 *
 * ZWEI SAENGER, EINE BUEHNE: Emmo Acar und David Readman teilen sich das
 * Mikrofon je nach Termin (siehe die Hoerproben auf v-m-p.com, die jeweils
 * „mit Emmo" bzw. „mit David" ausgewiesen sind). Die Texte nennen deshalb
 * nirgends eine feste Saengerbesetzung.
 */

import type { SiteContentSchema } from "@bands/content";

const BAND_NAME = "CoverSnake";
const BAND_EMAIL = "info@v-m-p.com";
const SOCIAL_TEXT =
  "Einblicke hinter die Kulissen, neue Termine und Ausschnitte aus unseren Auftritten.";

export const contentSchema: SiteContentSchema = {
  pages: [
    // ─────────────────────────────────────────────────────────────
    // 1. Allgemein
    // ─────────────────────────────────────────────────────────────
    {
      slug: "global",
      title: "Allgemein",
      path: "/",
      description: "Stammdaten der Band — erscheinen im Footer und in Anfrage-Mails.",
      groups: [
        {
          title: "Stammdaten",
          fields: [
            { key: "band_name", label: "Bandname", type: "text", default: BAND_NAME,
              help: "Wird u. a. in Ueberschriften und im Betreff der Anfrage-Mail verwendet." },
            { key: "band_claim", label: "Claim", type: "text",
              default: "A Tribute to Whitesnake" },
            { key: "band_genre", label: "Genre", type: "text", default: "Hard Rock / Tribute" },
            { key: "band_location", label: "Standort", type: "text", default: "Darmstadt · Rhein-Main" },
            { key: "band_email", label: "E-Mail-Adresse", type: "text", default: BAND_EMAIL,
              help: "Ziel aller Buchungsanfragen und Mail-Buttons." },
            { key: "band_phone", label: "Telefon", type: "text", default: "06078 759568" },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 2. Startseite
    // ─────────────────────────────────────────────────────────────
    {
      slug: "home",
      title: "Startseite",
      path: "/",
      groups: [
        {
          title: "Hero",
          description: "Der erste Bildschirm der Startseite. Die Ueberschrift ist die Wortmarke.",
          fields: [
            { key: "hero_eyebrow", label: "Kleiner Text ueber dem Logo", type: "text",
              default: "Whitesnake Tribute · seit 2016" },
            { key: "hero_claim", label: "Claim", type: "text",
              default: "Decades of the Snake — vier Jahrzehnte Whitesnake, live" },
            { key: "hero_sub", label: "Unterzeile", type: "text",
              default: "Sechs Profimusiker, 90 bis 120 Minuten Show, vom bluesigen Hard Rock der Anfänge bis zu den Stadion-Hymnen der Achtziger." },
            { key: "hero_image", label: "Hero-Bild (Desktop)", type: "image", default: "/images/hero-home.webp" },
            { key: "hero_image_mobile", label: "Hero-Bild (Smartphone)", type: "image", default: "/images/hero-home-mobile.webp",
              help: "Optional. Hochformat-Zuschnitt fuer Bildschirme bis 640 px." },
            { key: "hero_dates_label", label: "Ueberschrift Terminliste", type: "text",
              default: "Nächste Termine",
              help: "Der Block erscheint nur, wenn sichtbare Termine gepflegt sind." },
          ],
        },
        {
          title: "Über die Band",
          fields: [
            { key: "about_title", label: "Ueberschrift", type: "text", default: BAND_NAME },
            { key: "about_text", label: "Text", type: "textarea", rows: 6,
              default: "Wenn donnernde Gitarrenriffs auf große Rock-Hymnen treffen und zwei Ausnahmestimmen die Bühne zum Beben bringen, dann heißt es: CoverSnake. Die von Gitarrist und Sänger Bobby Stöcker gegründete Formation zählt heute zu den erfolgreichsten und authentischsten Whitesnake-Tribute-Bands Deutschlands." },
            { key: "about_image", label: "Bild", type: "image", default: "/images/about-band.webp" },
          ],
        },
        {
          title: "Social Media",
          fields: [
            { key: "social_title", label: "Ueberschrift", type: "textarea", rows: 2,
              default: "News auf\nInstagram",
              help: "Zeilenumbruch = Umbruch in der Ueberschrift." },
            { key: "social_text", label: "Text", type: "textarea", rows: 3, default: SOCIAL_TEXT },
            { key: "social_image", label: "Bild", type: "image", default: "/images/social-news.webp" },
          ],
        },
        {
          title: "Anlässe",
          description: "Abschnitt mit Foto-Karussell und Verweis auf Show & Repertoire.",
          fields: [
            { key: "occasions_title", label: "Ueberschrift", type: "text",
              default: "Für jede Bühne die passende Show" },
            { key: "occasions_text", label: "Text", type: "textarea", rows: 5,
              default: "Ob Stadtfest, Rockfestival, Clubshow oder Firmenevent: CoverSnake liefert eine professionelle, publikumsnahe und mitreißende Tribute-Show — je nach Venue mit LED-Walls, Visuals und großer Lichtshow." },
          ],
        },
        {
          title: "Buchungs-CTA",
          description: "Dunkler Abschnitt am Seitenende.",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text",
              default: "Whitesnake live auf Ihrer Bühne" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3,
              default: "90 bis 120 Minuten Arena-Rock mit allen Klassikern. Fragen Sie Ihr Datum an." },
          ],
        },
      ],
      lists: [
        {
          key: "events",
          title: "Termine",
          description: "Erscheinen im Hero und auf der Media-Seite.",
          table: "events",
          hasVisible: true,
          fields: [
            { key: "date", label: "Datum", type: "date", flex: 1 },
            { key: "name", label: "Veranstaltung", type: "text", flex: 2 },
            { key: "location", label: "Ort", type: "text", flex: 2 },
            { key: "link", label: "Link (optional)", type: "url", flex: 2 },
          ],
          newRow: { name: "", date: "", location: "", link: "", visible: true },
        },
        {
          key: "section_images_occasions",
          title: "Bilder Anlässe-Karussell",
          table: "section_images",
          hasVisible: true,
          filter: { column: "section_key", value: "occasions" },
          maxItems: 3,
          fields: [{ key: "url", label: "Bild", type: "image", flex: 2 }],
          newRow: { section_key: "occasions", url: "", visible: true },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 3. Die Band
    // ─────────────────────────────────────────────────────────────
    {
      slug: "about",
      title: "Die Band",
      path: "/about",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/about-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Die Band" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 4,
              default: "CoverSnake wurde 2016 von Gitarrist und Sänger Bobby Stöcker gegründet und lässt den Spirit der Rock-Ikonen um David Coverdale aufleben — sechs Profimusiker, hundert Prozent live." },
          ],
        },
        {
          title: "Hauptabschnitt",
          description: "Bild links, Text rechts.",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/about.webp" },
            { key: "about_title", label: "Ueberschrift", type: "text",
              default: "Keine Kopie — eine Rockband." },
            { key: "text_bottom", label: "Text", type: "textarea", rows: 10,
              default: "Unter dem Motto „Decades of the Snake“ nimmt die sechsköpfige Profi-Band ihr Publikum mit auf eine Reise durch über vier Jahrzehnte Whitesnake-Geschichte — vom bluesigen Hard Rock der frühen Jahre bis zu den weltbekannten Stadion-Hymnen der Achtziger.\nKlassiker wie „Here I Go Again“, „Is This Love“ oder „Still Of The Night“ werden mit hoher musikalischer Präzision und Liebe zum Detail zelebriert. Mit den Frontmännern Emmo Acar und David Readman steht dabei eine Ausnahmestimme am Mikrofon.\nDavid Readman stand bereits gemeinsam mit den ehemaligen Whitesnake-Musikern Doug Aldrich und Brian Tichy auf der Bühne. Emmo Acar war bei „The Voice of Germany“ zu sehen und tourt mit seiner Band Fighter V.\nJe nach Venue und Eventgröße sorgt eine Bühnenproduktion mit LED-Walls, Visuals und professioneller Lichtshow für echtes Arena-Rock-Feeling.",
              help: "Ein Absatz pro Zeile. Leere Zeilen werden ignoriert." },
          ],
        },
        {
          title: "Musiker-Karussell",
          description: "Bildlaufleiste mit den Portraits der Musiker. Der Abschnitt erscheint nur, wenn unten Musiker gepflegt sind.",
          fields: [
            { key: "members_title", label: "Ueberschrift", type: "text", default: "Die Musiker" },
          ],
        },
      ],
      lists: [
        {
          key: "band_members",
          title: "Musiker",
          description: "Portraits fuer das Karussell auf dieser Seite. Bewusst leer angelegt — es liegen keine freigegebenen Portraitfotos und Rollenzuordnungen vor.",
          table: "band_members",
          hasVisible: true,
          fields: [
            { key: "name", label: "Name", type: "text", flex: 2 },
            { key: "role", label: "Rolle", type: "text", flex: 2, placeholder: "z. B. Lead Vocals" },
            { key: "image_url", label: "Foto", type: "image", flex: 2 },
          ],
          newRow: { name: "", role: "", image_url: "", visible: true },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 4. Show & Repertoire
    // ─────────────────────────────────────────────────────────────
    {
      slug: "services",
      title: "Show & Repertoire",
      path: "/services",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/services-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Show & Repertoire" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3,
              default: "90 bis 120 Minuten Whitesnake in Sechser-Besetzung — je nach Anlass als Clubshow oder als große Bühnenproduktion mit LED-Walls und Lichtshow." },
          ],
        },
        {
          title: "Besetzung & Ablauf",
          description: "Ueberschrift und Einleitung. Line-up und Showablauf pflegen Sie in der Liste unten.",
          fields: [
            { key: "besetzung_title", label: "Ueberschrift", type: "text", default: "Besetzung & Ablauf" },
            { key: "besetzung_text", label: "Einleitung", type: "textarea", rows: 4,
              default: "CoverSnake spielt in einer festen Sechser-Besetzung. Links das Line-up auf der Bühne, rechts der typische Ablauf eines Abends." },
          ],
        },
        {
          title: "Repertoire",
          description: "Songliste als Kachelraster.",
          fields: [
            { key: "repertoire_title", label: "Ueberschrift", type: "text", default: "Songs im Programm" },
            { key: "repertoire_text", label: "Einleitung", type: "textarea", rows: 3,
              default: "Ein Auszug aus dem Programm — die komplette Setlist stimmen wir auf Ihre Veranstaltung ab." },
            { key: "repertoire_songs", label: "Songs", type: "textarea", rows: 10,
              default: "Here I Go Again\nIs This Love\nStill of the Night\nFool for Your Loving\nGive Me All Your Love\nWalking in the Shadow of the Blues\nMistreated\nCrying in the Rain\nThe Deeper the Love\nBurn",
              help: "Ein Song pro Zeile. Leere Zeilen werden ignoriert. Aktuell nur die auf coversnake.com und v-m-p.com belegten Titel — weitere im Admin ergaenzen." },
          ],
        },
        {
          title: "Technik",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/services-technik.webp" },
            { key: "technik_title", label: "Ueberschrift", type: "text", default: "Technik & Bühnenproduktion" },
            { key: "technik_text", label: "Text", type: "textarea", rows: 5,
              default: "Je nach Venue und Eventgröße bringt die Band die komplette Produktion mit — von PA und Monitoring über Licht bis zur Backline. Für größere Bühnen kommen LED-Walls und Visuals dazu, die die Show optisch tragen." },
            { key: "technik_note", label: "Hinweis darunter", type: "textarea", rows: 3,
              default: "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung." },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text", default: "Interesse?" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3,
              default: "Wir erstellen gerne ein maßgeschneidertes Angebot für Ihre Veranstaltung — inklusive Band, Bühne und Technik." },
          ],
        },
      ],
      lists: [
        {
          key: "besetzung",
          title: "Besetzung & Ablauf",
          description: "Zwei Spalten: die erste Gruppe ist das Line-up, die zweite der Showablauf.",
          table: "besetzung_gruppen",
          fields: [
            { key: "name", label: "Spaltenüberschrift", type: "text", flex: 2 },
            { key: "beschreibung", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
          ],
          newRow: { name: "", beschreibung: "" },
          child: {
            table: "besetzung_eintraege",
            foreignKey: "gruppe_id",
            title: "Einträge",
            fields: [
              { key: "name", label: "Bezeichnung", type: "text", flex: 2 },
              { key: "beschreibung", label: "Detail", type: "text", flex: 3 },
            ],
            newRow: { name: "", beschreibung: "" },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 5. Media & News
    // ─────────────────────────────────────────────────────────────
    {
      slug: "media",
      title: "Media & News",
      path: "/media",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/media-header.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Media & News" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3,
              default: "Aktuelle Videos, Spieltermine und Neuigkeiten von CoverSnake." },
          ],
        },
        {
          title: "Videos",
          fields: [
            { key: "videos_title", label: "Ueberschrift", type: "text", default: "Auf der Bühne" },
            { key: "video_text", label: "Text unter dem Hauptvideo", type: "textarea", rows: 3, default: "",
              help: "Optional — erscheint nur, wenn ausgefuellt." },
          ],
        },
        {
          title: "Termine",
          fields: [
            { key: "events_title", label: "Ueberschrift", type: "text", default: "Öffentliche Termine" },
          ],
        },
        {
          title: "Social Media",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/media-social.webp" },
            { key: "social_title", label: "Ueberschrift", type: "text", default: "News auf Instagram & Facebook" },
            { key: "social_text", label: "Text", type: "textarea", rows: 3, default: SOCIAL_TEXT },
          ],
        },
      ],
      lists: [
        {
          key: "media_videos",
          title: "Videos",
          table: "media_videos",
          fields: [
            { key: "youtube_url", label: "YouTube-Link", type: "url", flex: 3 },
            { key: "title", label: "Titel (optional)", type: "text", flex: 2,
              placeholder: "leer = automatisch von YouTube" },
          ],
          newRow: { youtube_url: "", title: "" },
        },
        {
          key: "social_links",
          title: "Social-Media-Profile",
          table: "social_links",
          fields: [
            { key: "platform", label: "Plattform", type: "select",
              options: ["instagram", "facebook", "youtube", "spotify", "tiktok"], flex: 1 },
            { key: "url", label: "Link", type: "url", flex: 3 },
          ],
          newRow: { platform: "instagram", url: "" },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 6. Galerie
    // ─────────────────────────────────────────────────────────────
    {
      slug: "galerie",
      title: "Galerie",
      path: "/galerie",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/gallery-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Galerie" },
            { key: "page_hero_text", label: "Text im Seitenkopf", type: "textarea", rows: 2,
              default: "Eindrücke von Clubshows, Stadtfesten und Rockfestivals." },
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
          title: "Galeriebilder",
          description: "Unbegrenzt. Reihenfolge per Ziehen aendern.",
          table: "media_images",
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
            { key: "caption", label: "Bildunterschrift", type: "text", flex: 3 },
          ],
          newRow: { url: "", caption: "" },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 7. Referenzen & Netzwerk
    // ─────────────────────────────────────────────────────────────
    {
      slug: "referenzen",
      title: "Referenzen",
      path: "/referenzen",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/referenzen-header.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Referenzen & Netzwerk" },
          ],
        },
        {
          title: "Referenzen",
          description: "Der Abschnitt erscheint nur, wenn unten Referenzen gepflegt sind.",
          fields: [
            { key: "referenzen_title", label: "Ueberschrift", type: "text", default: "Wo wir gespielt haben" },
            { key: "referenzen_text", label: "Text", type: "textarea", rows: 3,
              default: "Eine Auswahl der Veranstalter, Festivals und Clubs, die CoverSnake gebucht haben." },
          ],
        },
        {
          title: "Partner & Netzwerk",
          fields: [
            { key: "partner_title", label: "Ueberschrift", type: "text", default: "Partner & Netzwerk" },
            { key: "partner_text", label: "Einleitung", type: "textarea", rows: 3,
              default: "Wir arbeiten mit einem festen Netzwerk zusammen: erfahrene Foto- und Video-Profis sowie alle Bands aus dem VMP-Künstlerpool." },
            { key: "partner_vmp_text", label: "Hinweiskasten VMP", type: "textarea", rows: 4,
              default: "CoverSnake ist Teil des **Vivid Music Productions** Künstlerpools – einem Netzwerk aus Profibands, Musikern und Medienschaffenden für Events jeder Größe.",
              help: "Text zwischen **doppelten Sternchen** wird fett dargestellt." },
            { key: "partner_vmp_url", label: "Link zum Künstlerpool", type: "url", default: "https://v-m-p.com" },
            { key: "partner_media_title", label: "Ueberschrift Medienprofis", type: "text", default: "Foto & Video" },
            { key: "partner_pool_title", label: "Ueberschrift Künstlerpool", type: "text", default: "Künstlerpool" },
            { key: "partner_card_current", label: "Hinweis auf der eigenen Karte", type: "text", default: "Diese Website" },
            { key: "partner_card_plain", label: "Hinweis ohne Link", type: "text", default: "Auf Anfrage" },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text", default: "Auch dabei sein?" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3,
              default: "Schreiben Sie uns für Verfügbarkeiten und ein persönliches Angebot." },
          ],
        },
      ],
      lists: [
        {
          key: "referenzen",
          title: "Referenzen",
          description: "Nur belegte Auftraggeber eintragen — erfundene Firmennamen sind irreführende Werbung.",
          table: "referenzen",
          fields: [
            { key: "name", label: "Kunde / Veranstaltung", type: "text", flex: 3 },
            { key: "type", label: "Art", type: "text", flex: 2, placeholder: "z. B. Stadtfest" },
          ],
          newRow: { name: "", type: "" },
        },
        {
          key: "partner_gruppen",
          title: "Partner",
          description: "Zweistufig: eine Gruppe enthaelt mehrere Partner.",
          table: "partner_gruppen",
          hasVisible: true,
          fields: [
            { key: "name", label: "Gruppe", type: "text", flex: 2 },
            { key: "beschreibung", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
            { key: "kind", label: "Art", type: "select", options: ["media", "band"], flex: 1 },
          ],
          newRow: { name: "", beschreibung: "", kind: "band", visible: true },
          child: {
            table: "partner_eintraege",
            foreignKey: "gruppe_id",
            title: "Einträge",
            hasVisible: true,
            fields: [
              { key: "name", label: "Name", type: "text", flex: 2 },
              { key: "url", label: "Link", type: "url", flex: 3 },
            ],
            newRow: { name: "", url: "", visible: true },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 8. Kontakt & Buchung
    // ─────────────────────────────────────────────────────────────
    {
      slug: "booking",
      title: "Kontakt & Buchung",
      path: "/booking",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/booking-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Booking" },
            { key: "page_hero_text", label: "Text im Seitenkopf", type: "textarea", rows: 3,
              default: "Fragen Sie Ihr Datum an und erhalten Sie ein maßgeschneidertes Angebot. Wir melden uns in der Regel innerhalb von 24 Stunden." },
          ],
        },
        {
          title: "Kontaktspalte",
          fields: [
            { key: "booking_title", label: "Ueberschrift", type: "text", default: "CoverSnake anfragen" },
            { key: "booking_text", label: "Text", type: "textarea", rows: 3,
              default: "Schreiben Sie uns für Verfügbarkeiten, Konditionen und individuelle Wünsche. Wir melden uns in der Regel innerhalb von 24 Stunden." },
            { key: "booking_email_label", label: "Beschriftung E-Mail", type: "text", default: "E-Mail" },
            { key: "booking_location_label", label: "Beschriftung Standort", type: "text", default: "Standort" },
          ],
        },
        {
          title: "Hilfreiche Angaben",
          fields: [
            { key: "booking_checklist_intro", label: "Einleitung", type: "textarea", rows: 4,
              default: "Am schnellsten geht es über das Formular rechts. Wenn Sie lieber direkt schreiben: Die Liste darunter enthält alles, was wir für ein belastbares Angebot brauchen." },
            { key: "booking_checklist_title", label: "Ueberschrift", type: "text",
              default: "Hilfreiche Angaben für Ihre Anfrage" },
            { key: "booking_checklist_first", label: "Erster Punkt", type: "text",
              default: "Bitte geben Sie im Betreff den Namen der Band an: **CoverSnake**.",
              help: "Text zwischen **doppelten Sternchen** wird fett dargestellt." },
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
            { key: "booking_form_occasion_placeholder", label: "Auswahl-Platzhalter", type: "text", default: "Bitte auswählen ..." },
            { key: "booking_form_message_label", label: "Beschriftung Nachricht", type: "text", default: "Nachricht" },
            { key: "booking_form_submit", label: "Beschriftung Button", type: "text", default: "Anfrage senden" },
            { key: "booking_success_title", label: "Ueberschrift nach dem Senden", type: "text", default: "Nachricht gesendet!" },
            { key: "booking_success_text", label: "Text nach dem Senden", type: "textarea", rows: 2,
              default: "Wir melden uns so schnell wie möglich bei Ihnen." },
          ],
        },
      ],
      lists: [
        {
          key: "occasions",
          title: "Anlässe",
          description: "Auswahlliste im Formular und Kacheln auf der Startseite.",
          table: "occasions",
          hasVisible: true,
          fields: [
            { key: "icon", label: "Symbol", type: "text", flex: 1, placeholder: "z. B. 🎪" },
            { key: "title", label: "Titel", type: "text", flex: 2 },
            { key: "description", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
          ],
          newRow: { icon: "", title: "", description: "", visible: true },
        },
        {
          key: "inquiry_questions",
          title: "Fragen für Anfrage und Checkliste",
          description: "Erscheinen in der Checkliste und in der vorausgefüllten E-Mail.",
          table: "inquiry_questions",
          hasVisible: true,
          fields: [
            { key: "text", label: "Frage", type: "text", flex: 4 },
            { key: "in_template", label: "In E-Mail-Vorlage", type: "boolean", flex: 1 },
          ],
          newRow: { text: "", in_template: true, visible: true },
        },
      ],
    },
  ],
};

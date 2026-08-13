/**
 * Inhaltsschema fuer GROOVE CONTROL.
 *
 * Diese Datei deklariert JEDEN editierbaren Text und jedes editierbare Bild der
 * Website — einmal, an einer Stelle. Der Wert in `default` ist zugleich:
 *   1. Vorlage fuer die Formulare im Admin-Bereich,
 *   2. Rueckfall im Code (wenn die Datenbank nichts liefert),
 *   3. Seed, mit dem die Datenbank erstmalig befuellt wird.
 *
 * Inhalte stammen von der Bandwebsite (info080059.wixsite.com/groovecontrol)
 * und von v-m-p.com/groove-control.
 *
 * BILDER: Alle Bildfelder zeigen vorerst auf `/images/placeholder.svg`.
 * Sobald echtes Material vorliegt, wird es im Admin hochgeladen — der
 * Platzhalter verhindert solange kaputte Bildverweise.
 *
 * TON: Groove Control siezt („Ihr Event", „Buchen Sie"). Ueberschriften folgen
 * dem Zwei-Zeiler-Schema: neutrale Zeile, darunter das kursive Gold-Wort.
 */

import type { SiteContentSchema } from "@bands/content";

const BAND_NAME = "Groove Control";
const BAND_EMAIL = "info@v-m-p.com";

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
              default: "Die Partyband Deluxe aus Frankfurt am Main" },
            { key: "band_genre", label: "Genre", type: "text", default: "Funk / Soul / Dance / Pop" },
            { key: "band_location", label: "Standort", type: "text", default: "Frankfurt am Main" },
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
          description: "Der erste Bildschirm der Startseite.",
          fields: [
            { key: "hero_eyebrow", label: "Kleiner Text ueber dem Titel", type: "text",
              default: "Partyband Deluxe · Frankfurt am Main" },
            { key: "hero_title", label: "Grosse Ueberschrift", type: "textarea", rows: 2,
              default: "Ihr Event.\nUnser Sound.",
              help: "Zwei Zeilen. Die zweite Zeile wird kursiv in Gold dargestellt." },
            { key: "hero_claim", label: "Claim", type: "text",
              default: "Die exklusive Partyband für Ihren Event und Ihre Hochzeit" },
            { key: "hero_sub", label: "Unterzeile", type: "text",
              default: "Seit über 15 Jahren bundesweit auf den Bühnen." },
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
              default: "Groove Control ist die Partyband Deluxe aus Frankfurt am Main. Seit über 15 Jahren gehört die Band bundesweit zu den erfolgreichsten Partybands — mit einem Repertoire von begleitender Dinner- und Loungemusik über Tanz-Standards bis zu Funk-, Soul- und Pop-Rock-Partysongs." },
            { key: "about_image", label: "Bild", type: "image", default: "/images/about-band.webp" },
          ],
        },
        {
          title: "Social Media",
          fields: [
            { key: "social_title", label: "Ueberschrift", type: "textarea", rows: 2,
              default: "News auf\nInstagram",
              help: "Zeilenumbruch = Umbruch in der Ueberschrift." },
            { key: "social_text", label: "Text", type: "textarea", rows: 3,
              default: "Einblicke hinter die Kulissen, neue Termine und Ausschnitte aus unseren Auftritten." },
            { key: "social_image", label: "Bild", type: "image", default: "/images/social-news.webp" },
          ],
        },
        {
          title: "Anlässe",
          description: "Abschnitt mit Foto-Karussell und Verweis auf Programm & Besetzung.",
          fields: [
            { key: "occasions_title", label: "Ueberschrift", type: "text",
              default: "Für jeden Anlass die passende Besetzung" },
            { key: "occasions_text", label: "Text", type: "textarea", rows: 5,
              default: "Ob Firmenevent, Gala, Stadtfest oder Hochzeit: Groove Control passt sich Ihrem Rahmen an. Vom Dinner-Set zum Ankommen bis zur vollen Partybesetzung, wenn die Tanzfläche gefüllt ist." },
          ],
        },
        {
          title: "Buchungs-CTA",
          description: "Dunkler Abschnitt am Seitenende.",
          fields: [
            { key: "cta_title", label: "Ueberschrift", type: "text",
              default: "Livemusik auf Top-Niveau für Ihren Event" },
            { key: "cta_text", label: "Text", type: "textarea", rows: 3,
              default: "Dinner & Lounge, Funk & Soul, Dance & Disco, Pop & Rock — wir stellen den Soundtrack für Ihren Abend zusammen." },
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
    // 3. Über uns
    // ─────────────────────────────────────────────────────────────
    {
      slug: "about",
      title: "Über uns",
      path: "/about",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/about-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Über uns" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 4,
              default: "100 % live, 100 % Profis. Groove Control besteht aus erfahrenen Session-Musikern und charismatischen Leadsängern, die mit etablierten Künstlern auf Tour waren." },
          ],
        },
        {
          title: "Hauptabschnitt",
          description: "Bild links, Text rechts.",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/about.webp" },
            { key: "about_title", label: "Ueberschrift", type: "textarea", rows: 2,
              default: "Erfahrung, die man\nhört.",
              help: "Zwei Zeilen. Die zweite Zeile wird hervorgehoben." },
            { key: "text_bottom", label: "Text", type: "textarea", rows: 8,
              default: "Groove Control spielt seit über 15 Jahren auf Firmenevents, Galas, Stadtfesten und Hochzeiten im gesamten Bundesgebiet.\nZu den Auftraggebern zählen unter anderem T-Systems, die Daimler AG, Bridgestone, Sony Ericsson und die Deutsche Bank.\nGespielt wurde unter anderem für Matthias Steiner, auf Johann Lafers Burg Stromburg und beim Brandenburgischen Sommerabend von Ministerpräsident Matthias Platzeck.",
              help: "Ein Absatz pro Zeile. Leere Zeilen werden ignoriert." },
          ],
        },
        {
          title: "Musiker-Karussell",
          description: "Bildlaufleiste mit den Portraits der Musiker.",
          fields: [
            { key: "members_title", label: "Ueberschrift", type: "text", default: "Die Band" },
          ],
        },
      ],
      lists: [
        {
          key: "band_members",
          title: "Musiker",
          description: "Portraits fuer das Karussell auf dieser Seite.",
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
    // 4. Programm & Besetzung
    // ─────────────────────────────────────────────────────────────
    {
      slug: "services",
      title: "Programm & Besetzung",
      path: "/services",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/services-hero.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Programm & Besetzung" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3,
              default: "Vom kompakten Sextett bis zur neunköpfigen XL-Besetzung — Groove Control bringt die passende Musik für jeden Teil des Abends." },
          ],
        },
        {
          title: "Besetzung",
          description: "Ueberschrift und Einleitung. Die Besetzungen selbst pflegen Sie in der Liste unten.",
          fields: [
            { key: "besetzung_title", label: "Ueberschrift", type: "text", default: "Besetzung" },
            { key: "besetzung_text", label: "Einleitung", type: "textarea", rows: 4,
              default: "Groove Control ist in verschiedenen Besetzungen buchbar — vom kompakten Sextett für konzentrierte Energie bis zur neunköpfigen XL-Besetzung mit maximaler Bühnenwirkung." },
          ],
        },
        {
          title: "Technik",
          fields: [
            { key: "image_main", label: "Bild", type: "image", default: "/images/services-technik.webp" },
            { key: "technik_title", label: "Ueberschrift", type: "text", default: "Technik" },
            { key: "technik_text", label: "Text", type: "textarea", rows: 5,
              default: "Auf Wunsch bringen wir das komplette Setup mit — von PA und Monitoring bis zu Licht und Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt." },
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
          title: "Besetzungen",
          description: "Zweistufig: eine Gruppe (z. B. „Kompakt“) enthaelt mehrere Besetzungen.",
          table: "besetzung_gruppen",
          fields: [
            { key: "name", label: "Gruppe", type: "text", flex: 2 },
            { key: "beschreibung", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
          ],
          newRow: { name: "", beschreibung: "" },
          child: {
            table: "besetzung_eintraege",
            foreignKey: "gruppe_id",
            title: "Einträge",
            fields: [
              { key: "name", label: "Bezeichnung", type: "text", flex: 2 },
              { key: "beschreibung", label: "Besetzung", type: "text", flex: 3 },
            ],
            newRow: { name: "", beschreibung: "" },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 5. Media, News & Termine
    // ─────────────────────────────────────────────────────────────
    {
      slug: "media",
      title: "Media, News & Termine",
      path: "/media",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            { key: "page_hero_image", label: "Hintergrundbild", type: "image", default: "/images/media-header.webp" },
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Media, News & Termine" },
            { key: "text_top", label: "Text im Seitenkopf", type: "textarea", rows: 3,
              default: "Aktuelle Videos, Spieltermine und Neuigkeiten von Groove Control." },
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
            { key: "social_title", label: "Ueberschrift", type: "text", default: "News auf Instagram" },
            { key: "social_text", label: "Text", type: "textarea", rows: 3,
              default: "Einblicke hinter die Kulissen, neue Termine und Ausschnitte aus unseren Auftritten." },
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
              default: "Eindrücke von Firmenevents, Galas und Hochzeiten." },
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
    // 7. Referenzen
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
            { key: "page_hero_title", label: "Ueberschrift", type: "text", default: "Referenzen" },
          ],
        },
        {
          title: "Referenzen",
          fields: [
            { key: "referenzen_title", label: "Ueberschrift", type: "text", default: "Unsere Kunden" },
            { key: "referenzen_text", label: "Text", type: "textarea", rows: 3,
              default: "Eine Auswahl der Unternehmen, Veranstalter und Privatkunden, die Groove Control für ihre Events gebucht haben." },
          ],
        },
        {
          title: "Partner & Netzwerk",
          fields: [
            { key: "partner_title", label: "Ueberschrift", type: "text", default: "Partner & Netzwerk" },
            { key: "partner_text", label: "Einleitung", type: "textarea", rows: 3,
              default: "Wir arbeiten mit einem festen Netzwerk zusammen: erfahrene Foto- und Video-Profis sowie alle Bands aus dem VMP-Künstlerpool." },
            { key: "partner_vmp_text", label: "Hinweiskasten VMP", type: "textarea", rows: 4,
              default: "Groove Control ist Teil des **Vivid Music Productions** Künstlerpools – einem Netzwerk aus Profibands, Musikern und Medienschaffenden für Events jeder Größe.",
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
          table: "referenzen",
          fields: [
            { key: "name", label: "Kunde", type: "text", flex: 3 },
            { key: "type", label: "Art", type: "text", flex: 2, placeholder: "z. B. Firmenevent" },
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
            { key: "booking_title", label: "Ueberschrift", type: "text", default: "Groove Control anfragen" },
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
              default: "Schicken Sie uns einfach eine E-Mail. Am schnellsten geht das über das Kontaktformular rechts – es enthält bereits alle wichtigen Fragen und öffnet automatisch Ihr E-Mail-Programm mit einer fertigen Vorlage." },
            { key: "booking_checklist_title", label: "Ueberschrift", type: "text",
              default: "Hilfreiche Angaben für Ihre Anfrage" },
            { key: "booking_checklist_first", label: "Erster Punkt", type: "text",
              default: "Bitte geben Sie im Betreff den Namen der Band an: **Groove Control**.",
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
            { key: "icon", label: "Symbol", type: "text", flex: 1, placeholder: "z. B. 🏢" },
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

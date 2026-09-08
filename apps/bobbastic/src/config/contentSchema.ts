/**
 * Inhaltsschema fuer BOBbastic.
 *
 * Diese Datei deklariert JEDEN editierbaren Text und jedes editierbare Bild der
 * Website — einmal, an einer Stelle. Der Wert in `default` ist exakt der Text,
 * der heute im Code steht. Daraus entstehen automatisch:
 *   1. die Formulare im Admin-Bereich,
 *   2. der Fallback im Code (wenn die Datenbank nichts liefert),
 *   3. der Seed, mit dem die Datenbank erstmalig befuellt wird.
 *
 * Neu angelegte Band (Erstbefuellung) — anders als bei We Rock/Spirit of Soul
 * gibt es hier noch KEINE Kundeninhalte in der Datenbank, Schluessel duerfen
 * also frei benannt werden. Bildfelder zeigen auf echte Fotos aus dem
 * VMP-Künstlerpool-Speicher (Supabase-Projekt "VMP-Künstlerpool", Bucket
 * vmp-images/bands/bobbastic/) — Quelle: v-m-p.com/bobbastic. Ein eigenes
 * Logo existiert noch nicht (`logo_image` bleibt leer).
 *
 * Aenderungen an `default` aendern die Website — nur uebernehmen, wenn der
 * Text im Code ebenfalls angepasst wurde.
 */

import type { SiteContentSchema } from "@bands/content";

// Mehrfach verwendete Texte (Kontaktadresse, Bandname) als Konstanten, damit
// Wiederholungen nicht auseinanderlaufen.
const BAND_NAME = "BOBbastic";
const BAND_EMAIL = "info@v-m-p.com";

// Echte Fotos aus dem VMP-Künstlerpool-Speicher (Supabase-Projekt
// "VMP-Künstlerpool", oeffentlicher Bucket) — Quelle: v-m-p.com/bobbastic.
const IMG =
  "https://zwhpyvrnljivsiarqcmp.supabase.co/storage/v1/object/public/vmp-images/bands/bobbastic/";

export const contentSchema: SiteContentSchema = {
  pages: [
    // ─────────────────────────────────────────────────────────────
    // 1. Allgemein & Footer
    // ─────────────────────────────────────────────────────────────
    {
      slug: "global",
      title: "Allgemein & Footer",
      path: "/",
      description:
        "Stammdaten der Band sowie Texte, die auf jeder Seite erscheinen (Navigation und Footer).",
      groups: [
        {
          title: "Stammdaten",
          description: "Name, Claim und Kontaktdaten — erscheinen im Footer und in Anfrage-Mails.",
          fields: [
            {
              key: "band_name",
              label: "Bandname",
              type: "text",
              default: BAND_NAME,
              help: "Wird u. a. in Ueberschriften und im Betreff der Anfrage-Mail verwendet.",
            },
            {
              key: "band_claim",
              label: "Claim",
              type: "text",
              default: "Drei Musiker. Volle Bühne. Volle Energie.",
            },
            {
              key: "band_genre",
              label: "Genre",
              type: "text",
              default: "Rock Cover / Party Rock",
            },
            {
              key: "band_location",
              label: "Standort",
              type: "text",
              default: "Frankfurt / Darmstadt / Aschaffenburg",
            },
            {
              key: "band_email",
              label: "E-Mail-Adresse",
              type: "text",
              default: BAND_EMAIL,
              help: "Ziel aller Buchungsanfragen und Mail-Buttons.",
            },
            {
              key: "logo_image",
              label: "Logo",
              type: "image",
              default: "",
              help: "Noch kein eigenes Logo vorhanden — bleibt leer, bis eines geliefert wird.",
            },
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
            {
              key: "hero_claim",
              label: "Claim",
              type: "text",
              default: "Das Party Rocktrio",
            },
            {
              key: "hero_sub",
              label: "Unterzeile",
              type: "text",
              default: "Rock-Klassiker bis Charts-Hits – kompakt, laut, live",
            },
            {
              key: "hero_image",
              label: "Hero-Bild (Desktop)",
              type: "image",
              default: `${IMG}1778957811091-xe32q.webp`,
            },
            {
              key: "hero_image_mobile",
              label: "Hero-Bild (Smartphone)",
              type: "image",
              default: `${IMG}1778957811091-xe32q.webp`,
              help: "Bislang derselbe Ausschnitt wie das Desktop-Bild — noch kein eigener Hochformat-Zuschnitt vorhanden.",
            },
            {
              key: "hero_dates_label",
              label: "Ueberschrift Terminliste",
              type: "text",
              default: "Nächste öffentliche Auftritte",
              help: "Der Block erscheint nur, wenn sichtbare Termine gepflegt sind.",
            },
          ],
        },
        {
          title: "Über die Band",
          description: "Abschnitt mit Bandfoto, Kurzportrait und Zahlen.",
          fields: [
            {
              key: "about_title",
              label: "Ueberschrift",
              type: "text",
              default: BAND_NAME,
            },
            {
              key: "about_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "BOBbastic – das Party Rocktrio aus Frankfurt / Darmstadt / Aschaffenburg. Drei Musiker, volle Bühne, volle Energie: Das Trio liefert Sound und Power einer größeren Band – mit kraftvollen Gitarren, sattem Groove und mehrstimmigem Gesang. Von Rock-Klassikern wie ZZ Top über die 90er (Blink-182, Green Day) bis zu aktuellen Charts-Rocksongs wird alles geboten, was rockt – die ideale, kompakte Band für Firmenfeiern, Stadtfeste, Hochzeiten und jede Party, die es richtig krachen lassen soll.",
            },
            {
              key: "about_image",
              label: "Bild",
              type: "image",
              default: `${IMG}1778957569394-om2wz.webp`,
            },
          ],
        },
        {
          title: "Social Media",
          fields: [
            {
              key: "social_title",
              label: "Ueberschrift",
              type: "textarea",
              default: "News auf Instagram\n& Facebook",
              help: "Zeilenumbruch = Umbruch in der Überschrift.",
            },
            {
              key: "social_text",
              label: "Text",
              type: "textarea",
              rows: 3,
              default:
                "Bleibt up to date — neue Auftritte, Behind-the-Scenes und direkte Einblicke in unser Bandleben.",
            },
            {
              key: "social_image",
              label: "Bild",
              type: "image",
              default: `${IMG}1778957337299-pj319.webp`,
            },
          ],
        },
        {
          title: "Anlässe",
          description: "Abschnitt mit Foto-Karussell und Verweis auf Programm & Besetzung.",
          fields: [
            {
              key: "occasions_title",
              label: "Ueberschrift",
              type: "text",
              default: "Bucht uns für Eure nächste Rock-Party",
            },
            {
              key: "occasions_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "Egal ob Firmenfeier, Stadtfest, Hochzeit oder Clubgig: BOBbastic passt sich jedem Rahmen flexibel an. Als kompaktes Trio liefern wir die volle Energie einer großen Band — direkt, unkompliziert und garantiert tanzbar.",
            },
          ],
        },
        {
          title: "Buchungs-CTA",
          description: "Dunkler Abschnitt am Seitenende.",
          fields: [
            {
              key: "cta_title",
              label: "Ueberschrift",
              type: "text",
              default: "Rock-Power für Euer Event",
            },
            {
              key: "cta_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "Von ZZ Top über die 90er-Hits von Blink-182 und Green Day bis zu aktuellen Charts-Rocksongs – wir bringen alles, was rockt, auf Eure Bühne.",
            },
          ],
        },
      ],
      lists: [
        {
          key: "events",
          title: "Öffentliche Termine",
          description:
            "Erscheinen im Hero (maximal drei) und vollstaendig auf der Seite „Media & News“.",
          table: "events",
          hasVisible: true,
          fields: [
            { key: "date", label: "Datum", type: "date", flex: 1 },
            { key: "name", label: "Veranstaltung", type: "text", flex: 2 },
            { key: "location", label: "Ort", type: "text", flex: 2 },
            { key: "link", label: "Link (Tickets / Info)", type: "url", flex: 2, placeholder: "https://" },
          ],
          newRow: { date: "", name: "", location: "", link: "", visible: true },
        },
        {
          key: "section_images_party",
          title: "Bilder Party-Karussell",
          description: "Foto-Karussell im Abschnitt „Anlässe“.",
          table: "section_images",
          hasVisible: true,
          filter: { column: "section_key", value: "party" },
          maxItems: 3,
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
          ],
          newRow: { section_key: "party", url: "", visible: true },
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778957733377-v57ox.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Über uns",
            },
            {
              key: "text_top",
              label: "Einleitungstext",
              type: "textarea",
              rows: 8,
              default:
                "Wenn drei Musiker die Energie einer ganzen Band auf die Bühne bringen, dann heißt es: BOBbastic – Das Party Rocktrio. Kraftvolle Gitarren, satter Groove und mehrstimmiger Gesang treffen auf ein Repertoire von Rock-Klassikern bis zu den Charts von heute – authentisch, energiegeladen und mit jeder Menge Spielfreude.",
            },
          ],
        },
        {
          title: "Hauptabschnitt",
          description: "Bild links, Text rechts.",
          fields: [
            {
              key: "image_main",
              label: "Bild",
              type: "image",
              default: `${IMG}1778957027543-8jdae.webp`,
            },
            {
              key: "about_title",
              label: "Ueberschrift",
              type: "text",
              default: "Rock-Power im kompakten Trio",
            },
            {
              key: "text_bottom",
              label: "Text",
              type: "textarea",
              rows: 8,
              default:
                "BOBbastic steht für ehrliche Livemusik und einen Abend voller Energie. Von ZZ Top über die 90er-Hits von Blink-182 und Green Day bis zu aktuellen Charts-Rocksongs bringt das Trio alles, was rockt, kompromisslos auf die Bühne — die ideale, kompakte Band für Firmenfeiern, Stadtfeste, Hochzeiten und jede Party, die es richtig krachen lassen soll.",
              help: "Ein Absatz pro Zeile. Leere Zeilen werden ignoriert.",
            },
          ],
        },
        {
          title: "Musiker-Karussell",
          description: "Bildlaufleiste mit den Portraits der Musiker.",
          fields: [
            {
              key: "members_title",
              label: "Ueberschrift",
              type: "text",
              default: "Die Band",
            },
          ],
        },
      ],
      lists: [
        {
          key: "band_members",
          title: "Musiker",
          description:
            "Portraits fuer das Karussell auf der Seite „Über uns“. Bisher leer — die Namen „Bobby“ und „Kai“ sind von der Bandwebsite bestaetigt, aber ohne zuordenbares Foto; bitte hier passende Portraits ergaenzen.",
          table: "band_members",
          hasVisible: true,
          fields: [
            { key: "name", label: "Name", type: "text", flex: 2 },
            { key: "role", label: "Rolle", type: "text", flex: 2, placeholder: "z. B. Gitarre / Gesang" },
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778958987138-fbgzg.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Programm & Besetzung",
            },
            {
              key: "text_top",
              label: "Einleitungstext",
              type: "textarea",
              rows: 3,
              default:
                "Als kompaktes Rock-Trio bringt BOBbastic die volle Energie einer großen Band auf jede Bühne — flexibel im Setup, groß im Sound.",
            },
          ],
        },
        {
          title: "Besetzung",
          fields: [
            {
              key: "besetzung_title",
              label: "Ueberschrift",
              type: "text",
              default: "Besetzung",
            },
            {
              key: "besetzung_text",
              label: "Text",
              type: "textarea",
              rows: 12,
              default:
                "BOBbastic tritt in der Kernbesetzung als Trio auf: Gitarre/Gesang, Bass und Schlagzeug. Durch mehrstimmigen Gesang und ein druckvolles Live-Setup entsteht trotz kompakter Besetzung ein voller, ausgereifter Bandsound — ideal für Locations und Bühnen, auf denen eine große Besetzung nicht möglich oder nicht gewünscht ist.",
              help: "Leerzeile = neuer Absatz, einfacher Zeilenumbruch = Umbruch innerhalb des Absatzes.",
            },
          ],
        },
        {
          title: "Programm",
          fields: [
            {
              key: "programm_title",
              label: "Ueberschrift",
              type: "text",
              default: "Programm",
            },
            {
              key: "programm_text",
              label: "Text",
              type: "textarea",
              rows: 10,
              default:
                "Musikalisch bietet BOBbastic ein rundum Rock-Coverprogramm: von den Klassikern wie ZZ Top über die 90er-Hits von Blink-182 und Green Day bis hin zu aktuellen Rocksongs aus den Charts. Die ideale, kompakte Band für Firmenfeiern, Stadtfeste, Hochzeiten und alle, die eine fetzige Rock-Party feiern wollen.",
            },
          ],
        },
        {
          title: "Technik",
          fields: [
            {
              key: "image_main",
              label: "Bild",
              type: "image",
              default: `${IMG}1778957550680-od6dd.webp`,
            },
            {
              key: "technik_title",
              label: "Ueberschrift",
              type: "text",
              default: "Technik",
            },
            {
              key: "technik_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "Auf Wunsch bringen wir das komplette Setup mit – von PA und Monitoring bis zu Licht und Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt.",
            },
            {
              key: "technik_note",
              label: "Hinweis darunter",
              type: "textarea",
              rows: 3,
              default:
                "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung.",
            },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            {
              key: "cta_title",
              label: "Ueberschrift",
              type: "text",
              default: "Interesse?",
            },
            {
              key: "cta_text",
              label: "Text",
              type: "textarea",
              rows: 3,
              default:
                "Wir erstellen gerne ein maßgeschneidertes Angebot für Eure Veranstaltung — inkl. Band, Bühne und Technik.",
            },
          ],
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778957745676-pin72.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Media & News",
            },
            {
              key: "text_top",
              label: "Einleitungstext",
              type: "textarea",
              rows: 3,
              default: "Aktuelle Spieltermine, Videos und Social Media von BOBbastic.",
            },
          ],
        },
        {
          title: "Videos",
          fields: [
            {
              key: "videos_title",
              label: "Ueberschrift",
              type: "text",
              default: "Auf der Bühne",
            },
            {
              key: "video_text",
              label: "Beschreibung unter dem Hauptvideo",
              type: "textarea",
              rows: 3,
              default: "",
              help: "Bleibt das Feld leer, wird keine Beschreibung angezeigt. Noch keine bestaetigten Video-Links vorhanden.",
            },
          ],
        },
        {
          title: "Termine",
          description: "Ueberschriften der Terminspalte — die Termine selbst stehen unten.",
          fields: [
            {
              key: "events_title",
              label: "Ueberschrift",
              type: "text",
              default: "Öffentliche Termine",
            },
          ],
        },
        {
          title: "Social Media",
          fields: [
            {
              key: "image_main",
              label: "Bild",
              type: "image",
              default: `${IMG}1778957758329-rswbz.webp`,
            },
            {
              key: "social_title",
              label: "Ueberschrift",
              type: "text",
              default: "News auf Instagram & Facebook",
            },
            {
              key: "social_text",
              label: "Text",
              type: "textarea",
              rows: 3,
              default:
                "Bleibt up to date — neue Auftritte, Fotos, Behind-the-Scenes und direkte Einblicke in unser Bandleben.",
            },
          ],
        },
      ],
      lists: [
        {
          key: "media_videos",
          title: "Videos",
          description: "Das erste Video wird gross angezeigt, alle weiteren als Playlist.",
          table: "media_videos",
          fields: [
            { key: "title", label: "Titel", type: "text", flex: 3 },
            {
              key: "youtube_url",
              label: "YouTube-Link",
              type: "url",
              flex: 3,
              placeholder: "https://www.youtube.com/watch?v=...",
            },
          ],
          newRow: { title: "", youtube_url: "" },
        },
        {
          key: "social_links",
          title: "Social-Media-Profile",
          table: "social_links",
          fields: [
            {
              key: "platform",
              label: "Plattform",
              type: "select",
              options: ["instagram", "facebook", "youtube"],
              flex: 1,
            },
            { key: "url", label: "Profil-Link", type: "url", flex: 3, placeholder: "https://" },
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778958143297-0hx3k.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Galerie",
            },
            {
              key: "page_hero_text",
              label: "Einleitungstext",
              type: "textarea",
              rows: 3,
              default: "Eindrücke von unseren Live-Auftritten und Bühnenmomenten.",
            },
          ],
        },
        {
          title: "Fotoraster",
          fields: [
            {
              key: "gallery_title",
              label: "Ueberschrift",
              type: "text",
              default: "Fotos",
            },
          ],
        },
      ],
      lists: [
        {
          key: "media_images",
          title: "Galeriefotos",
          description:
            "Sind hier keine Fotos gepflegt, zeigt die Seite die 28 Standardbilder aus `/images/gallery/` (Vorlage von We Rock — fuer BOBbastic ungeeignet, da echte Fotos vorliegen und ueber den Seed befuellt werden).",
          table: "media_images",
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
            { key: "caption", label: "Bildunterschrift", type: "text", flex: 3 },
            { key: "credit", label: "Fotocredit", type: "text", flex: 2 },
          ],
          newRow: { url: "", caption: "", credit: "" },
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
      description:
        "Achtung: Firmennamen nur eintragen, wenn die Band dort tatsaechlich gespielt hat.",
      groups: [
        {
          title: "Seitenkopf",
          fields: [
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778957761812-bzla4.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Referenzen",
            },
          ],
        },
        {
          title: "Referenzen",
          fields: [
            {
              key: "referenzen_title",
              label: "Ueberschrift",
              type: "text",
              default: "Unsere Kunden",
            },
            {
              key: "referenzen_text",
              label: "Einleitungstext",
              type: "textarea",
              rows: 3,
              default:
                "Firmen, Veranstalter und Privatkunden, die BOBbastic für ihre Events gebucht haben.",
            },
          ],
        },
        {
          title: "Partner & Netzwerk",
          fields: [
            {
              key: "partner_title",
              label: "Ueberschrift",
              type: "text",
              default: "Partner & Netzwerk",
            },
            {
              key: "partner_text",
              label: "Einleitungstext",
              type: "textarea",
              rows: 4,
              default:
                "Wir arbeiten mit einem festen Netzwerk zusammen: erfahrene Foto- und Video-Profis sowie alle Bands aus dem VMP-Künstlerpool – jede mit ihrer eigenen Website.",
            },
            {
              key: "partner_vmp_text",
              label: "Hinweiskasten VMP",
              help: "Text zwischen **doppelten Sternchen** wird fett dargestellt.",
              type: "textarea",
              rows: 4,
              default:
                "BOBbastic ist Teil des **Vivid Music Productions** Künstlerpools – einem Netzwerk aus Profibands, Musikern und Medienschaffenden für Events jeder Größe.",
            },
            {
              key: "partner_vmp_url",
              label: "Link im Hinweiskasten",
              type: "url",
              default: "https://v-m-p.com",
            },
            {
              key: "partner_media_title",
              label: "Ueberschrift Medien-Block",
              type: "text",
              default: "Foto & Video",
            },
            {
              key: "partner_pool_title",
              label: "Ueberschrift Künstlerpool-Block",
              type: "text",
              default: "Künstlerpool",
            },
            {
              key: "partner_card_current",
              label: "Hinweis auf der eigenen Karte",
              type: "text",
              default: "Diese Website",
            },
            {
              key: "partner_card_plain",
              label: "Hinweis auf Karten ohne Link",
              type: "text",
              default: "Auf Anfrage",
            },
          ],
        },
        {
          title: "Buchungs-CTA",
          fields: [
            {
              key: "cta_title",
              label: "Ueberschrift",
              type: "text",
              default: "Auch dabei sein?",
            },
            {
              key: "cta_text",
              label: "Text",
              type: "textarea",
              rows: 3,
              default: "Schreibt uns für Verfügbarkeiten und ein persönliches Angebot.",
            },
          ],
        },
      ],
      lists: [
        {
          key: "referenzen",
          title: "Referenzen",
          description:
            "Speist auch die Leiste „Bekannte Veranstalter“ auf der Startseite. Ab 12 Eintraegen laeuft das vierspaltige Laufband. Bisher leer — auf den Quellseiten sind keine konkreten Auftraggeber dokumentiert.",
          table: "referenzen",
          fields: [
            { key: "name", label: "Kunde / Veranstalter", type: "text", flex: 3 },
            {
              key: "type",
              label: "Art",
              type: "text",
              flex: 2,
              placeholder: "z. B. Festival, Club, Firmenevent",
            },
          ],
          newRow: { name: "", type: "" },
        },
        {
          key: "partner_gruppen",
          title: "Partner",
          description:
            "Zweistufig: eine Gruppe (z. B. „Fotografie“ oder „Tribute Bands“) enthaelt mehrere Partner. Bleibt leer, solange keine Zeilen gepflegt sind — die Seite zeigt dann automatisch das gemeinsame VMP-Verzeichnis aus dem Code (`src/lib/partners.ts`).",
          table: "partner_gruppen",
          hasVisible: true,
          fields: [
            { key: "name", label: "Gruppe", type: "text", flex: 2 },
            { key: "beschreibung", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
            {
              key: "kind",
              label: "Block",
              type: "select",
              options: ["media", "band"],
              flex: 1,
              placeholder: "media = Foto & Video, band = Künstlerpool",
            },
          ],
          newRow: { name: "", beschreibung: "", kind: "band", visible: true },
          child: {
            table: "partner_eintraege",
            foreignKey: "gruppe_id",
            title: "Partner",
            fields: [
              { key: "name", label: "Name", type: "text", flex: 2 },
              { key: "url", label: "Website", type: "url", flex: 3, placeholder: "https://" },
            ],
            newRow: { name: "", url: "", visible: true },
            hasVisible: true,
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: `${IMG}1778957766061-btcul.webp`,
            },
            {
              key: "page_hero_title",
              label: "Ueberschrift",
              type: "text",
              default: "Booking",
            },
            {
              key: "page_hero_text",
              label: "Einleitungstext",
              type: "textarea",
              rows: 3,
              default:
                "Jetzt Euer Datum anfragen und ein maßgeschneidertes Angebot erhalten. Wir melden uns innerhalb von 24 Stunden.",
            },
          ],
        },
        {
          title: "Kontaktspalte",
          fields: [
            {
              key: "booking_title",
              label: "Ueberschrift",
              type: "text",
              default: "BOBbastic anfragen",
            },
            {
              key: "booking_text",
              label: "Text",
              type: "textarea",
              rows: 3,
              default:
                "Schreibt uns für Verfügbarkeiten, Konditionen und individuelle Wünsche. Wir melden uns in der Regel innerhalb von 24 Stunden.",
            },
            {
              key: "booking_email_label",
              label: "Beschriftung E-Mail",
              type: "text",
              default: "E-Mail",
            },
            {
              key: "booking_location_label",
              label: "Beschriftung Standort",
              type: "text",
              default: "Standort",
            },
          ],
        },
        {
          title: "Hilfreiche Angaben",
          description: "Einleitung und Ueberschrift der Fragenliste — die Fragen selbst stehen unten.",
          fields: [
            {
              key: "booking_checklist_intro",
              label: "Einleitung",
              type: "textarea",
              rows: 4,
              default:
                "Schickt uns einfach eine E-Mail. Am schnellsten geht das über das Kontaktformular rechts – es enthält bereits alle wichtigen Fragen und öffnet automatisch Euer E-Mail-Programm mit einer fertigen Vorlage.",
            },
            {
              key: "booking_checklist_title",
              label: "Ueberschrift",
              type: "text",
              default: "Hilfreiche Angaben für Eure Anfrage",
            },
            {
              key: "booking_checklist_first",
              label: "Erster Punkt der Liste",
              type: "text",
              default: "Bitte gebt im Betreff den Namen der Band an: BOBbastic.",
            },
          ],
        },
        {
          title: "Formular",
          fields: [
            {
              key: "booking_form_name_label",
              label: "Feld „Name“",
              type: "text",
              default: "Name",
            },
            {
              key: "booking_form_email_label",
              label: "Feld „E-Mail“",
              type: "text",
              default: "E-Mail",
            },
            {
              key: "booking_form_phone_label",
              label: "Feld „Telefon“",
              type: "text",
              default: "Telefon",
            },
            {
              key: "booking_form_date_label",
              label: "Feld „Veranstaltungsdatum“",
              type: "text",
              default: "Veranstaltungsdatum",
            },
            {
              key: "booking_form_occasion_label",
              label: "Feld „Anlass“",
              type: "text",
              default: "Anlass",
            },
            {
              key: "booking_form_occasion_placeholder",
              label: "Platzhalter im Auswahlfeld",
              type: "text",
              default: "Bitte auswählen ...",
            },
            {
              key: "booking_form_message_label",
              label: "Feld „Nachricht“",
              type: "text",
              default: "Nachricht",
            },
            {
              key: "booking_form_submit",
              label: "Absende-Button",
              type: "text",
              default: "Anfrage senden",
            },
            {
              key: "booking_success_title",
              label: "Bestätigung — Ueberschrift",
              type: "text",
              default: "Nachricht gesendet!",
            },
            {
              key: "booking_success_text",
              label: "Bestätigung — Text",
              type: "textarea",
              rows: 2,
              default: "Wir melden uns so schnell wie möglich bei euch.",
            },
          ],
        },
      ],
      lists: [
        {
          key: "occasions",
          title: "Anlässe",
          description: "Auswahlmoeglichkeiten im Formularfeld „Anlass“.",
          table: "occasions",
          hasVisible: true,
          fields: [
            { key: "icon", label: "Icon", type: "text", flex: 1, placeholder: "z. B. 🎸" },
            { key: "title", label: "Titel", type: "text", flex: 2 },
            { key: "description", label: "Beschreibung", type: "textarea", rows: 2, flex: 3 },
          ],
          newRow: { icon: "", title: "", description: "", visible: true },
        },
        {
          key: "inquiry_questions",
          title: "Fragen zur Veranstaltung",
          description:
            "Erscheinen unter „Hilfreiche Angaben“. Ist „In Vorlage“ aktiv, steht die Frage zusaetzlich in der vorausgefuellten E-Mail.",
          table: "inquiry_questions",
          hasVisible: true,
          fields: [
            { key: "text", label: "Frage", type: "text", flex: 5 },
            { key: "in_template", label: "In Vorlage", type: "boolean", flex: 1 },
          ],
          newRow: { text: "", in_template: true, visible: true },
        },
      ],
    },
  ],
};

export default contentSchema;

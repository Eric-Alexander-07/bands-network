/**
 * Inhaltsschema fuer WE ROCK.
 *
 * Diese Datei deklariert JEDEN editierbaren Text und jedes editierbare Bild der
 * Website — einmal, an einer Stelle. Der Wert in `default` ist exakt der Text,
 * der heute im Code steht. Daraus entstehen automatisch:
 *   1. die Formulare im Admin-Bereich,
 *   2. der Fallback im Code (wenn die Datenbank nichts liefert),
 *   3. der Seed, mit dem die Datenbank erstmalig befuellt wird.
 *
 * WICHTIG: Die Schluessel `text_top`, `text_bottom`, `image_main`,
 * `besetzung_text`, `technik_text` und `video_text` sind bereits in der
 * Datenbank in Benutzung. Sie duerfen NICHT umbenannt werden, sonst gehen
 * bestehende Kundeninhalte verloren.
 *
 * Aenderungen an `default` aendern die Website — nur uebernehmen, wenn der
 * Text im Code ebenfalls angepasst wurde.
 */

import type { SiteContentSchema } from "@bands/content";

// Mehrfach verwendete Texte (Kontaktadresse, Bandname) als Konstanten, damit
// Wiederholungen nicht auseinanderlaufen.
const BAND_NAME = "We Rock";
const BAND_EMAIL = "info@v-m-p.com";

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
              default:
                "Classic Rock / Hardrock / Melodic Rock – druckvoll, authentisch, unvergesslich!",
            },
            {
              key: "band_genre",
              label: "Genre",
              type: "text",
              default: "Classic Rock Tribute",
            },
            {
              key: "band_location",
              label: "Standort",
              type: "text",
              default: "Darmstadt",
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
              default: "/images/logo_tansparent.png",
              help: "Transparentes PNG — wird im Hero, in der Navigation und als Hintergrund verwendet.",
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
              default: "Die Classic Rock Tribute Show",
            },
            {
              key: "hero_sub",
              label: "Unterzeile",
              type: "text",
              default: "Die größten Rock Hymnen aus 5 Jahrzehnten",
            },
            {
              key: "hero_image",
              label: "Hero-Bild (Desktop)",
              type: "image",
              default: "/images/hero-home.webp",
            },
            {
              key: "hero_image_mobile",
              label: "Hero-Bild (Smartphone)",
              type: "image",
              default: "/images/hero-home-mobile.webp",
              help: "Hochformat-Zuschnitt fuer Bildschirme bis 640 px.",
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
                "WE ROCK – Die Classic Rock Tribute Show ist ein 7-köpfiges Profi-Ensemble aus der Rhein-Main-Region um Darmstadt / Frankfurt a. Main und Aschaffenburg. Mit vier sich abwechselnden Sängern und einem vielseitigen Repertoire, bringen sie die größten Rock Hymnen aus 5 Jahrzehnten authentisch auf die Bühne. Kraftvolle Stimmen, legendäre Gitarrenriffs und pure Rockenergie.",
            },
            {
              key: "about_image",
              label: "Bild",
              type: "image",
              default: "/images/about-band.webp",
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
              default: "/images/social-news.webp",
            },
          ],
        },
        {
          title: "Anlässe / Tribute-Events",
          description: "Abschnitt mit Foto-Karussell und Verweis auf Programm & Besetzung.",
          fields: [
            {
              key: "occasions_title",
              label: "Ueberschrift",
              type: "text",
              default: "Bucht uns für Euren Rock-Tribute Event",
            },
            {
              key: "occasions_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "Egal ob Club-Gig, Stadtfest, großes Tribute-Festival oder Ihr exklusives Firmen- und Privatevent: We Rock passt sich jedem Rahmen flexibel an. Mit maßgeschneiderter Besetzung und flexiblem Sound-Setup liefern wir genau die richtige Energie zur richtigen Zeit. Wir bringen Eure Location zum Kochen und garantieren ein unvergessliches Live-Erlebnis!",
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
              default: "Rock Hymnen aus 5 Dekaden für Ihr Event",
            },
            {
              key: "cta_text",
              label: "Text",
              type: "textarea",
              rows: 6,
              default:
                "Queen, Bon Jovi, Van Halen, AC/DC, Journey, Foreigner, Ozzy Osbourne, Led Zeppelin, Deep Purple, Whitesnake, Dio, Rainbow, Toto, Guns N' Roses, Bryan Adams, ZZ-Top, Billy Idol, Kiss, Loverboy, Alice Cooper, Survivor, John Miles, Scorpions, Judas Priest, Heart, Cheap Trick u.v.m.",
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
          key: "section_images_tribute",
          title: "Bilder Tribute-Karussell",
          description: "Foto-Karussell im Abschnitt „Anlässe / Tribute-Events“.",
          table: "section_images",
          hasVisible: true,
          filter: { column: "section_key", value: "tribute" },
          maxItems: 3,
          fields: [
            { key: "url", label: "Bild", type: "image", flex: 2 },
          ],
          newRow: { section_key: "tribute", url: "", visible: true },
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
              default: "/images/about-hero.webp",
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
                "Wenn kraftvolle Stimmen, legendäre Gitarrenriffs und pure Rock-Energie aufeinandertreffen, dann heißt es: WE ROCK – The Classic Rock Tribute Show. Die Band bringt das Beste aus Classic Rock, Hard Rock und Melodic Rock der 70er- und 80er-Jahre bis in die Gegenwart auf die Bühne – authentisch, energiegeladen und mit jeder Menge Leidenschaft. Frontmann Emmo Acar und Sängerin Jessica Conte sorgen dabei gemeinsam mit einer hochkarätig besetzten Band aus Ausnahme-Musikern für ein mitreißendes Live-Erlebnis voller Power, Emotionen und echter Rock'n'Roll-Momente.",
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
              default: "/images/about.webp",
            },
            {
              key: "about_title",
              label: "Ueberschrift",
              type: "text",
              default: "Rock Hymnen für Euren Event!",
            },
            {
              key: "text_bottom",
              label: "Text",
              type: "textarea",
              rows: 8,
              default:
                "WE ROCK stehen für ehrliche Livemusik, Spielfreude und einen Abend voller unvergesslicher Rockklassiker. Mit maximaler Leidenschaft, musikalischer Klasse und viel Liebe zum Detail entführt die Band ihr Publikum auf eine Reise durch die größten Rock-Dekaden aller Zeiten. WE ROCK – die ultimative Classic Rock Party. Rockig - Leidenschaftlich - Handgemacht.",
              help: "Ein Absatz pro Zeile. Leere Zeilen werden ignoriert.",
            },
          ],
        },
        {
          title: "Musiker-Karussell",
          description: "Bildlaufleiste mit den Portraits der Saenger und Musiker.",
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
          description: "Portraits fuer das Karussell auf der Seite „Über uns“.",
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
            {
              key: "page_hero_image",
              label: "Hintergrundbild",
              type: "image",
              default: "/images/gallery/live-1.webp",
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
                "Vom intimen Dinner bis zur 9-köpfigen Full-Band mit Multimedia-Show — We Rock bringt die passende Musik und Energie für jeden Anlass.",
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
                "Insgesamt sind wir in der Ausgangsbesetzung 7 Musiker und ein Techniker. 2 Sänger bilden die Frontstimmen, und fünf Profimusiker aus dem Rhein-Main-Gebiet die Begleitband.\n\nDas besondere Highlight von WE ROCK: Fast alle Musiker der Band übernehmen zusätzlich Gesangsparts. Dadurch gibt es auch bei der 7er Besetzung alleine 4 Lead-Stimmen und es entsteht ein außergewöhnlich vielseitiger und authentischer Sound mit einem breitgefächerten Programm – perfekt für die großen Rockklassiker & Hymnen unterschiedlichster Dekaden und Stilrichtungen. Je nach Event und Verfügbarkeit kann es sein, dass auch die Frontsänger einmal wechseln, oder bei großen Events und Bühnen weitere hinzugenommen werden. So kann die Band sogar auf bis zu 9 Akteure ausgebaut werden.",
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
                "Musikalisch spannt die Band einen weiten Bogen in Sachen Classic Rock. Legendäre Hymnen von Led Zeppelin, Queen, AC/DC und Guns N' Roses sind natürlich gesetzt. Ebenso wie Songs der Hardrock Ikonen Deep Purple, Whitesnake, Dio, Rainbow, Van Halen und Ozzy Osbourne. Auch melodischer Arena Rock von Def Leppard, TOTO, Journey und Foreigner wird im variablen Repertoire ebenso berücksichtigt wie Bluesrock-Perlen von Gary Moore, ZZ-Top oder den Black Crowes. Auf Wunsch und in Absprache mit der Band können einzelne Schwerpunkte auf kleine Tribute Blocks von 4–5 Songs einzelner Bands wie Whitesnake, Deep Purple, Bryan Adams oder ins Programm einfließen.",
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
              default: "/images/gallery/live-8.webp",
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
                "Wir bringen auf Wunsch das komplette Bühnen-Setup mit – von PA-Anlage und Monitoring bis zu Lichtanlage und Backline. Unsere erfahrenen Techniker kennen die Anforderungen großer Rock-Shows und sorgen für optimalen Sound in jeder Location.",
            },
            {
              key: "technik_note",
              label: "Hinweis darunter",
              type: "textarea",
              rows: 3,
              default:
                "Gerne erstellen wir Ihnen ein Paket-Angebot über Band, Bühne, Tonanlage & Licht inkl. technischer Betreuung.",
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
                "Wir erstellen gerne ein maßgeschneidertes Angebot für Ihre Veranstaltung — inkl. Band, Bühne und Technik.",
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
              default: "/images/media-header.webp",
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
              default: "Aktuelle Spieltermine, Videos und Social Media von We Rock.",
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
              help: "Bleibt das Feld leer, wird keine Beschreibung angezeigt.",
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
              default: "/images/media-social.webp",
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
              default: "/images/gallery/live-3.webp",
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
              default: "Eindrücke von unseren Live-Auftritten, Studio-Sessions und Events.",
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
            "Sind hier keine Fotos gepflegt, zeigt die Seite die 28 Standardbilder aus `/images/gallery/`.",
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
              default: "/images/referenzen-header.webp",
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
                "Eine Auswahl der Unternehmen, Veranstalter und Privatkunden, die We Rock für ihre Events gebucht haben.",
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
                "We Rock ist Teil des **Vivid Music Productions** Künstlerpools – einem Netzwerk aus Profibands, Musikern und Medienschaffenden für Events jeder Größe.",
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
              default: "Schreib uns für Verfügbarkeiten und ein persönliches Angebot.",
            },
          ],
        },
      ],
      lists: [
        {
          key: "referenzen",
          title: "Referenzen",
          description:
            "Speist auch die Leiste „Bekannte Veranstalter“ auf der Startseite. Ab 12 Eintraegen laeuft das vierspaltige Laufband.",
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
            "Zweistufig: eine Gruppe (z. B. „Fotografie“ oder „Tribute Bands“) enthaelt mehrere Partner.",
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
              placeholder: "media = Foto & Video, pool = Künstlerpool",
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
              default: "/images/kontakt-hero.webp",
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
                "Jetzt euer Datum anfragen und ein maßgeschneidertes Angebot erhalten. Wir melden uns innerhalb von 24 Stunden.",
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
              default: "We Rock anfragen",
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
                "Schickt uns einfach eine E-Mail. Am schnellsten geht das über das Kontaktformular rechts – es enthält bereits alle wichtigen Fragen und öffnet automatisch euer E-Mail-Programm mit einer fertigen Vorlage.",
            },
            {
              key: "booking_checklist_title",
              label: "Ueberschrift",
              type: "text",
              default: "Hilfreiche Angaben für Ihre Anfrage",
            },
            {
              key: "booking_checklist_first",
              label: "Erster Punkt der Liste",
              type: "text",
              default: "Bitte gebt im Betreff den Namen der Band an: We Rock.",
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

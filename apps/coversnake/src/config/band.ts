/**
 * Stammdaten und Rueckfallwerte fuer COVERSNAKE.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Quellen aller Inhalte: coversnake.com (Gruendungsjahr, Motto, Besetzungs-
 * groesse, Showlaenge), v-m-p.com/coversnake (Bandtext, Hoerproben, Buehnen-
 * produktion, Kontaktdaten) und die VMP-Datenbank (Repertoire, YouTube-Links,
 * Social-Profile).
 *
 * GRUENDUNGSJAHR: Die Quellen widersprechen sich. coversnake.com nennt
 * „Mitte 2016", v-m-p.com „vor 10 Jahren" (was 2016 entspricht), ein aelterer
 * Datensatz im VMP-Backend dagegen 2015. Hier gilt 2016 — zwei von drei
 * Quellen, darunter die Seite der Band selbst.
 *
 * Bewusst NICHT gesetzt: `clients` und `references`. Fuer diese Band sind
 * keine Auftraggeber belegt — erfundene Firmennamen waeren irrefuehrende
 * Werbung nach § 5 UWG. Die Listen werden im Admin gepflegt.
 *
 * Ebenfalls leer: `about.members`. Emmo Acar und David Readman teilen sich das
 * Mikrofon je nach Termin, die uebrigen drei Musiker sind nirgends namentlich
 * belegt. Eine feste Namensliste waere schnell falsch.
 */
export const band = {
  name: "CoverSnake",
  claim: "A Tribute to Whitesnake",
  tagline: "Decades of the Snake",
  genre: "Hard Rock / Tribute",
  location: "Darmstadt · Rhein-Main",
  email: "info@v-m-p.com",
  phone: "06078 759568",

  nav: [
    { label: "Home", href: "/" },
    { label: "Die Band", href: "/about" },
    { label: "Show & Repertoire", href: "/services" },
    { label: "Media & News", href: "/media" },
    { label: "Galerie", href: "/galerie" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Kontakt", href: "/booking" },
  ],

  dates: [],

  facts: [
    { value: "2016", label: "gegründet" },
    { value: "6", label: "Musiker" },
  ],

  occasions: [
    {
      icon: "🎪",
      title: "Stadtfeste & Open Air",
      description:
        "Große Bühnen, breites Publikum: die Hymnen von Whitesnake ziehen vom ersten Riff an.",
    },
    {
      icon: "🤘",
      title: "Rockfestivals",
      description:
        "Bis zu zwei Stunden Hard Rock mit druckvollem Sound und originalgetreuen Arrangements.",
    },
    {
      icon: "🍺",
      title: "Clubshows",
      description:
        "Nah am Publikum, laut und direkt — die Band in ihrem ursprünglichen Element.",
    },
    {
      icon: "🏢",
      title: "Firmenevents & Galas",
      description:
        "Livemusik als Höhepunkt des Abends — professionell, pünktlich, bühnenerfahren.",
    },
  ],

  /** Rueckfall, solange keine Videos in der Datenbank gepflegt sind. */
  videos: [
    { id: "MmmC-Swcnmg", title: "CoverSnake – Burn (Trailer)" },
  ] as { id: string; title?: string; description?: string }[],

  /**
   * Rueckfall fuer die Uebersicht auf /services. Die Band spielt in EINER
   * festen Sechser-Besetzung — deshalb steht links das Line-up und rechts
   * der Ablauf der Show, nicht wie bei den Partybands zwei Besetzungsgroessen.
   *
   * Das Line-up nennt bewusst nur Instrumente, keine Namen: die Saenger
   * wechseln je nach Termin (siehe Kopfkommentar).
   */
  formations: {
    small: [
      { name: "Lead Vocals", lineup: "Wechselnde Frontmänner" },
      { name: "Gitarre", lineup: "Leadgitarre und Gesang" },
      { name: "Gitarre", lineup: "Rhythmusgitarre" },
      { name: "Bass", lineup: "Bassgitarre und Backing Vocals" },
      { name: "Schlagzeug", lineup: "Drums" },
      { name: "Keyboards", lineup: "Keys und Backing Vocals" },
    ],
    full: [
      { name: "Erstes Set", lineup: "Die frühen, bluesigen Jahre" },
      { name: "Zweites Set", lineup: "Die Stadion-Hymnen der Achtziger" },
      { name: "Zugaben", lineup: "Die großen Klassiker zum Schluss" },
    ],
  },

  /** Keine belegten Auftraggeber — siehe Kopfkommentar. */
  clients: [] as string[],

  socials: {
    instagram: "https://www.instagram.com/coversnake_band/",
    facebook: "https://www.facebook.com/CoverSnakeBand/",
  },

  about: {
    bio: "Wenn donnernde Gitarrenriffs auf große Rock-Hymnen treffen und zwei Ausnahmestimmen die Bühne zum Beben bringen, dann heißt es: CoverSnake. Die von Gitarrist und Sänger Bobby Stöcker gegründete Formation zählt heute zu den erfolgreichsten und authentischsten Whitesnake-Tribute-Bands Deutschlands.",
    shows: [],
    members: [],
  },

  /** Keine belegten Referenzen — siehe Kopfkommentar. */
  references: [] as { client: string; type?: string }[],

  technik: {
    intro:
      "Je nach Venue und Eventgröße bringt die Band die komplette Produktion mit — von PA und Monitoring über Licht bis zur Backline. Für größere Bühnen kommen LED-Walls und Visuals dazu, die die Show optisch tragen.",
    packages: [],
    note: "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung.",
  },

  services: [],
};

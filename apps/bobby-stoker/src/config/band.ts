/**
 * Stammdaten und Rueckfallwerte fuer die BOBBY STOKER BAND.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Quellen aller Inhalte: Bandeintrag "bobby-stoker" im VMP-Künstlerpool
 * (Bio, Tagline, Repertoire-Schlagworte, YouTube-Links, Social-Profile) sowie
 * die Fotos aus demselben Pool (Bandfoto-Credits auf der "Everglow"-CD/-LP:
 * Musikerbesetzung, Erscheinungsjahr 2022).
 *
 * Bewusst NICHT gesetzt: `references`. Fuer diese Band sind keine
 * Auftraggeber belegt — erfundene Firmennamen waeren irrefuehrende Werbung
 * nach § 5 UWG. Die Liste wird im Admin gepflegt.
 */
export const band = {
  name: "Bobby Stoker Band",
  claim: "Blues Rock · Classic Rock · Eigenkompositionen aus dem Album „Everglow“",
  tagline: "Handgemachte Livemusik mit Herz",
  genre: "Blues Rock / Classic Rock",
  location: "Rhein-Main-Gebiet · Groß-Umstadt",
  email: "info@v-m-p.com",
  phone: "06078 759568",

  nav: [
    { label: "Home", href: "/" },
    { label: "Über Bobby", href: "/about" },
    { label: "Programm", href: "/services" },
    { label: "Media & Termine", href: "/media" },
    { label: "Galerie", href: "/galerie" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Kontakt", href: "/booking" },
  ],

  dates: [],

  facts: [
    { value: "4", label: "Musiker" },
    { value: "2022", label: "Album „Everglow“" },
  ],

  occasions: [
    {
      icon: "🎸",
      title: "Clubkonzerte",
      description:
        "Handgemachte Rock- und Bluesabende mit Eigenkompositionen und ausgewählten Coversongs.",
    },
    {
      icon: "🏢",
      title: "Firmenevents & Galas",
      description:
        "Livemusik mit Klasse und Erfahrung — professionell, druckvoll, bühnenerprobt.",
    },
    {
      icon: "🎪",
      title: "Stadtfeste & Festivals",
      description:
        "Energiegeladene Rockshow für große Bühnen und breites Publikum.",
    },
    {
      icon: "🤝",
      title: "Kombi mit Tribute-Acts",
      description:
        "Auf Anfrage gemeinsam mit anderen Bands aus dem VMP-Künstlerpool für Stadtfest, Club oder Festival.",
    },
  ],

  /** Rueckfall, solange keine Videos in der Datenbank gepflegt sind — die 5 auf v-m-p.com verlinkten Songs. */
  videos: [
    { id: "fE-tq-QfesU", title: "Waitin' For The Night" },
    { id: "3ceEF7hjvLA", title: "Everglow" },
    { id: "0oKuRRG8M34", title: "The Devil In Me" },
    { id: "2f8k_gB0VhU", title: "Best Way Out" },
    { id: "mSBn_GLDNVY", title: "Yesterday's Gone" },
  ] as { id: string; title?: string; description?: string }[],

  /** Keine belegten Auftraggeber — siehe Kopfkommentar. */
  clients: [] as string[],

  socials: {
    instagram: "https://www.instagram.com/bobbystoker/",
    facebook: "https://www.facebook.com/BobbyStokerBand/",
  },

  about: {
    bio: "Mit seinem eigenständigen Mix aus melodiösem Rock & Blues und einer Prise Soul steht Bobby Stoker seit Jahrzehnten für handgemachte Livemusik auf höchstem Niveau. Der erfahrene Gitarrist, Sänger und Songwriter begeistert mit eingängigen Eigenkompositionen, authentischem Sound und zusammen mit seiner Band mit einer energiegeladenen Bühnenpräsenz.",
    shows: [],
    /** Besetzung laut Musiker-Credits der "Everglow"-Veröffentlichung (CD/LP, Vivid Music Productions 2022). */
    members: [
      { name: "Bobby Stoker", role: "Gitarre & Gesang" },
      { name: "Willy Wagner", role: "Bass" },
      { name: "Jürgen „Lucki“ Lucas", role: "Schlagzeug" },
      { name: "Markus Wessel", role: "Keyboards" },
    ],
  },

  /** Keine belegten Referenzen — siehe Kopfkommentar. */
  references: [] as { client: string; type?: string }[],

  technik: {
    intro:
      "Auf Wunsch bringt die Band das komplette Setup mit — von PA und Monitoring über Licht bis zur Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt.",
    packages: [],
    note: "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung.",
  },

  services: [],
};

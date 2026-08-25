/**
 * Stammdaten und Rueckfallwerte fuer THE ADAMS FAMILY.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Quellen aller Inhalte: v-m-p.com/adams-family (Bandtext, Repertoire,
 * Instagram-Profil), info080059.wixsite.com/theadamsfamily (Gruendungsjahr,
 * Showlaenge, Unplugged-Set, Kontaktdaten Vivid Music Productions).
 *
 * Bewusst NICHT gesetzt: `clients` und `references`. Fuer diese Band sind
 * keine Auftraggeber belegt — erfundene Firmennamen waeren irrefuehrende
 * Werbung nach § 5 UWG. Die Listen werden im Admin gepflegt.
 */
export const band = {
  name: "The Adams Family",
  claim: "Die Bryan Adams Tributeband",
  tagline: "A Tribute to Bryan Adams",
  genre: "Classic Rock / Tribute",
  location: "Groß-Umstadt · Rhein-Main",
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
    { value: "2002", label: "gegründet" },
    { value: "5", label: "Musiker" },
  ],

  occasions: [
    {
      icon: "🎪",
      title: "Stadtfeste & Open Air",
      description:
        "Große Bühnen, breites Publikum: die Hits von Bryan Adams funktionieren vom ersten Ton an.",
    },
    {
      icon: "🎸",
      title: "Festivals",
      description:
        "Zwei Stunden Rockshow mit druckvollem Sound und authentischen Arrangements.",
    },
    {
      icon: "🍺",
      title: "Clubkonzerte",
      description:
        "Nah am Publikum, inklusive akustischem Unplugged-Set für echte Konzertmomente.",
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
    { id: "Sjj0lO1IgDc", title: "The Adams Family – Live" },
  ] as { id: string; title?: string; description?: string }[],

  /**
   * Rueckfall fuer die Uebersicht auf /services. Die Band spielt in EINER
   * festen Fuenfer-Besetzung — deshalb steht links das Line-up und rechts
   * der Ablauf der Show, nicht wie bei den Partybands zwei Besetzungsgroessen.
   */
  formations: {
    small: [
      { name: "Lead Vocals & Gitarre", lineup: "Bobby Stöcker" },
      { name: "Gitarre", lineup: "Lead- und Rhythmusgitarre" },
      { name: "Bass", lineup: "Bassgitarre" },
      { name: "Schlagzeug", lineup: "Drums" },
      { name: "Keyboards", lineup: "Keys und Backing Vocals" },
    ],
    full: [
      { name: "Hauptset", lineup: "Rund zwei Stunden Showprogramm" },
      { name: "Unplugged-Set", lineup: "Etwa 15 Minuten akustisch, nach dem Vorbild des MTV-Unplugged-Konzerts" },
      { name: "Zugaben", lineup: "Die großen Klassiker zum Schluss" },
    ],
  },

  /** Keine belegten Auftraggeber — siehe Kopfkommentar. */
  clients: [] as string[],

  socials: {
    instagram: "https://www.instagram.com/theadamsfamily_band/",
  },

  about: {
    bio: "Mit den größten Hits von Bryan Adams und jeder Menge Rock'n'Roll im Gepäck zählt The Adams Family seit Jahren zu den renommiertesten Bryan-Adams-Tribute-Bands in Deutschland und dem deutschsprachigen Ausland.",
    shows: [],
    members: [],
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

/**
 * Stammdaten und Rueckfallwerte fuer BOBbastic.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Inhalte stammen von der Bandwebsite (info080059.wixsite.com/bobbastic) und
 * von v-m-p.com/bobbastic. Konkrete Songtitel fuer ZZ Top, Blink-182 und
 * Green Day werden dort nur als Einfluesse genannt, nicht mit Titel — daher
 * NICHT erfunden ergaenzt. Referenzen/bisherige Auftritte sind auf keiner der
 * beiden Quellen dokumentiert und bleiben deshalb leer.
 */
export const band = {
  name: "BOBbastic",
  claim: "Drei Musiker. Volle Bühne. Volle Energie.",
  tagline: "Das Party Rocktrio",
  genre: "Rock Cover / Party Rock",
  location: "Frankfurt / Darmstadt / Aschaffenburg",
  email: "info@v-m-p.com",
  phone: "06078 759568",
  accentColor: "#ff5a36",

  nav: [
    { label: "Home", href: "/" },
    { label: "Über uns", href: "/about" },
    { label: "Programm & Besetzung", href: "/services" },
    { label: "Media & News", href: "/media" },
    { label: "Galerie", href: "/galerie" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Kontakt", href: "/booking" },
  ],

  dates: [],

  facts: [
    { value: "3", label: "Musiker" },
    { value: "2×60 / 3×40", label: "Spielzeiten" },
  ],
  highlights: [
    { text: "Rock-Klassiker bis aktuelle Charts-Hits" },
    { text: "Volle Bandenergie im kompakten Trio" },
  ],

  occasions: [
    {
      icon: "🏢",
      title: "Firmenfeiern",
      description: "Rock-Power fürs Firmenevent — kompakt, laut und flexibel im Ablauf.",
    },
    {
      icon: "🎪",
      title: "Stadtfeste & Kerbs",
      description: "Explosive Rock-Sets für Bühnen auf Stadtfesten, Kerben und Open-Airs.",
    },
    {
      icon: "💍",
      title: "Hochzeiten",
      description: "Von der ersten Tanzrunde bis zur Zugabe — Rock-Party für euren großen Tag.",
    },
    {
      icon: "🎉",
      title: "Clubgigs & private Feiern",
      description: "Direkt und unkompliziert: die passende Rock-Party für jeden Rahmen.",
    },
  ],

  /** PLATZHALTER — keine bestaetigten Video-IDs auf den Quellseiten gefunden. */
  videos: [] as { id: string; title?: string; description?: string }[],

  formations: {
    small: [
      { name: "Trio", lineup: "Vocals / Gitarre, Bass, Drums" },
    ],
    full: [],
  },

  clients: [],

  socials: {
    instagram: "https://www.instagram.com/bobbastic_band/",
    facebook: "https://www.facebook.com/BOBbasticRock/",
    youtube: "https://www.youtube.com/channel/UCo2mfOcAbJLsMY1OLr6Mk8w",
  },

  about: {
    bio: "BOBbastic – das Party Rocktrio aus Frankfurt / Darmstadt / Aschaffenburg. Drei Musiker, volle Bühne, volle Energie: Das Trio liefert Sound und Power einer größeren Band – mit kraftvollen Gitarren, sattem Groove und mehrstimmigem Gesang. Von Rock-Klassikern wie ZZ Top über die 90er (Blink-182, Green Day) bis zu aktuellen Charts-Rocksongs wird alles geboten, was rockt.",
    shows: [],
    members: [],
  },

  repertoire: {
    intro: "Von den Rock-Klassikern bis zu den Charts von heute — kompromisslos aufs Trio verdichtet.",
    genres: [
      {
        name: "Rock-Klassiker",
        songs: [
          "Are You Gonna Go My Way – Lenny Kravitz",
          "Fly Away – Lenny Kravitz",
          "Sex On Fire – Kings Of Leon",
        ],
      },
      {
        name: "90er & Charts-Rock",
        songs: [
          "Kids Wanna Rock – Bryan Adams",
        ],
      },
    ],
  },

  references: [] as { client: string; type?: string }[],

  technik: {
    intro: "Auf Wunsch bringen wir das komplette Setup mit — von PA und Monitoring bis zu Licht und Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt.",
    packages: [],
    note: "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung.",
  },

  services: [],
};

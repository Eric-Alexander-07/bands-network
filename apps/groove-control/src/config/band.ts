/**
 * Stammdaten und Rueckfallwerte fuer Groove Control.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Inhalte stammen von der Bandwebsite (info080059.wixsite.com/groovecontrol)
 * und von v-m-p.com/groove-control. Als PLATZHALTER markierte Werte stammen
 * NICHT von der Band und muessen vor dem Livegang ersetzt werden.
 */
export const band = {
  name: "Groove Control",
  claim: "Die Partyband Deluxe aus Frankfurt am Main",
  tagline: "We elevate your event",
  genre: "Funk / Soul / Dance / Pop",
  location: "Frankfurt am Main",
  email: "info@v-m-p.com",
  phone: "06078 759568",

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
    { value: "15+", label: "Jahre Erfahrung" },
    { value: "6–9", label: "Musiker" },
  ],

  occasions: [
    {
      icon: "🏢",
      title: "Firmenevents & Galas",
      description:
        "Vom Empfang bis zur Aftershow — ein Abend, der zur Marke passt und das Publikum mitnimmt.",
    },
    {
      icon: "💍",
      title: "Hochzeiten",
      description:
        "Dinnermusik zum Ankommen, Partyset ab der ersten Tanzrunde. Abgestimmt auf Ihren Ablauf.",
    },
    {
      icon: "🎪",
      title: "Stadtfeste & Open Air",
      description:
        "Große Bühnen, breites Publikum: Partyklassiker, die vom ersten Ton an funktionieren.",
    },
    {
      icon: "📢",
      title: "Messen & Produktpräsentationen",
      description:
        "Livemusik als Rahmen für Roadshows, Produktpräsentationen und Incentives.",
    },
  ],

  /** PLATZHALTER — echte Videos werden im Admin gepflegt. */
  videos: [] as { id: string; title?: string; description?: string }[],

  /** Rueckfall fuer die Besetzungsuebersicht, solange die Datenbank leer ist. */
  formations: {
    small: [
      { name: "Sextett", lineup: "2 Vocals, Gitarre, Bass, Drums, Keys" },
      { name: "Septett", lineup: "2 Vocals, Gitarre, Bass, Drums, Keys, Saxophon" },
    ],
    full: [
      { name: "8er Besetzung", lineup: "3 Vocals, Gitarre, Bass, Drums, Keys, Saxophon" },
      { name: "9er Besetzung (XL)", lineup: "3 Vocals, Gitarre, Bass, Drums, Keys, Bläsersektion" },
    ],
  },

  /** Von der Bandwebsite uebernommen. */
  clients: [
    "T-Systems",
    "Daimler AG",
    "Bridgestone",
    "Sony Ericsson",
    "Deutsche Bank",
  ],

  socials: {
    instagram: "https://instagram.com/groovecontrol_band",
    facebook: "https://www.facebook.com/partybanddeluxe",
  },

  about: {
    bio: "Groove Control ist die Partyband Deluxe aus Frankfurt am Main. Seit über 15 Jahren gehört die Band bundesweit zu den erfolgreichsten Partybands — mit einem Repertoire von begleitender Dinner- und Loungemusik über Tanz-Standards bis zu Funk-, Soul- und Pop-Rock-Partysongs.",
    shows: [],
    members: [],
  },

  references: [
    { client: "T-Systems", type: "Firmenevent" },
    { client: "Daimler AG", type: "Firmenevent" },
    { client: "Bridgestone", type: "Firmenevent" },
    { client: "Sony Ericsson", type: "Firmenevent" },
    { client: "Deutsche Bank", type: "Firmenevent" },
  ],

  technik: {
    intro:
      "Auf Wunsch bringen wir das komplette Setup mit — von PA und Monitoring bis zu Licht und Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt.",
    packages: [],
    note: "Gerne erstellen wir Ihnen ein Paketangebot über Band, Bühne, Tonanlage und Licht inklusive technischer Betreuung.",
  },

  services: [],
};

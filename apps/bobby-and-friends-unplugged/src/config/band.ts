/**
 * Stammdaten und Rueckfallwerte fuer Bobby & Friends Unplugged.
 *
 * Der pflegbare Seiteninhalt liegt in `contentSchema.ts` bzw. der Datenbank.
 * Hier stehen nur Werte, die seitenuebergreifend gelten (Name, E-Mail,
 * Navigation) oder als Rueckfall dienen, solange die Datenbank leer ist.
 *
 * Inhalte stammen von v-m-p.com/bobby-and-friends und von der aelteren
 * Bandwebsite (info080059.wixsite.com/bobbyandfriends, dort unter dem
 * breiteren Namen "Bobby & Friends" ohne "Unplugged"-Zusatz).
 */
export const band = {
  name: "Bobby & Friends Unplugged",
  claim: "Handgemachte Akustikmusik für Wohnzimmerkonzerte und Dinner",
  tagline: "Weniger ist mehr",
  genre: "Unplugged / Akustik / Singer-Songwriter",
  location: "Groß-Umstadt · Rhein-Main",
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
    { value: "40", label: "Jahre auf der Bühne" },
    { value: "1–6", label: "Musiker" },
  ],

  occasions: [
    {
      icon: "🏠",
      title: "Hauskonzerte & Wohnzimmerkonzerte",
      description:
        "Kompakte akustische Atmosphäre direkt bei Ihnen zuhause — handgemachte Musik zum Anfassen nah.",
    },
    {
      icon: "🍽️",
      title: "Dinner & Empfänge",
      description:
        "Dezente Hintergrundmusik zum Ankommen, vom Aperitif bis zum Dessert.",
    },
    {
      icon: "💍",
      title: "Hochzeiten",
      description:
        "Von der Trauung bis zum Ausklang: Unplugged-Klassiker, die berühren, ohne zu übertönen.",
    },
    {
      icon: "🍷",
      title: "Restaurants & Weinkeller-Tastings",
      description:
        "Livemusik im kleinen Rahmen — ideal für Tastings, Vernissagen und besondere Abende.",
    },
  ],

  /** PLATZHALTER — echte Videos werden im Admin gepflegt. */
  videos: [] as { id: string; title?: string; description?: string }[],

  /** Rueckfall fuer die Besetzungsuebersicht, solange die Datenbank leer ist. */
  formations: {
    small: [
      { name: "Solo", lineup: "Gitarre & Gesang" },
      { name: "Duo", lineup: "+ Cajon oder zweite Stimme" },
    ],
    full: [
      { name: "Trio", lineup: "+ Percussion oder Bass" },
      { name: "Quartett bis Sextett", lineup: "Erweiterte Band-Besetzung auf Anfrage" },
    ],
  },

  /** Von der Bandwebsite (info080059.wixsite.com/bobbyandfriends) uebernommen. */
  clients: [
    "Samsung",
    "Bridgestone",
    "Deutsche Bank",
    "Audi",
    "Gruner + Jahr",
  ],

  socials: {
    instagram: "https://www.instagram.com/bobbyandfriends_band/",
  },

  about: {
    bio: "Bobby Stöcker begann mit fünf Jahren am Klavier, wechselte mit zwölf zur Gitarre und gründete mit sechzehn seine erste Band. Er spielte mit Bobby Kimball (TOTO) und Martin Engelien, stand als Lead-Gitarrist im Musical „Tommy“ von The Who im Offenbacher Capitol auf der Bühne und schrieb Songs für Melanie Thornton (La Bouche). Nach dem Motto „Weniger ist mehr“ präsentiert er sich unplugged, reduziert auf Gitarre und Gesang.",
    shows: [],
    members: [],
  },

  references: [
    { client: "Samsung", type: "Firmenevent" },
    { client: "Bridgestone", type: "Firmenevent" },
    { client: "Deutsche Bank", type: "Firmenevent" },
    { client: "Audi", type: "Firmenevent" },
    { client: "Gruner + Jahr", type: "Firmenevent" },
  ],

  technik: {
    intro:
      "Auf Wunsch bringen wir das komplette Setup mit — von PA und Monitoring bis zu Licht und Backline. Erfahrene Techniker sorgen dafür, dass der Sound im Raum sitzt.",
    packages: [],
    note: "Gerne erstellen wir Ihnen ein Paketangebot über Musiker, Technik und Ablauf inklusive persönlicher Betreuung.",
  },

  services: [],
};

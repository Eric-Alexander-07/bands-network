import Link from "next/link";
import { band } from "@/config/band";

export default function BookingCTA() {
  return (
    <section className="booking-cta">
      <div className="container booking-cta-inner">
        <span className="eyebrow" data-animate="fade-up">Jetzt anfragen</span>
        <h2 data-animate="fade-up" data-delay="100">
          Rock Hymnen aus 5 Dekaden für Ihr Event
        </h2>
        <p data-animate="fade-up" data-delay="200">
          Queen, Bon Jovi, Van Halen, AC/DC, Journey, Foreigner, Ozzy Osbourne, Led Zeppelin, Deep Purple, Whitesnake, Dio, Rainbow, Toto, Guns N&apos; Roses, Bryan Adams, ZZ-Top, Billy Idol, Kiss, Loverboy, Alice Cooper, Survivor, John Miles, Scorpions, Judas Priest, Heart, Cheap Trick u.v.m.
        </p>
        <div className="booking-cta-actions" data-animate="fade-up" data-delay="300">
          <Link href="/booking" className="btn btn-gold">
            Buchung anfragen
          </Link>
          <a href={`mailto:${band.email}`} className="btn btn-outline-light">
            {band.email}
          </a>
        </div>
      </div>
    </section>
  );
}

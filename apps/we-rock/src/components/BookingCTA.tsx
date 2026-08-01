import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import type { Content } from "@/lib/content";

export default function BookingCTA({ c }: { c: Content }) {
  return (
    <section className="booking-cta">
      <div className="container booking-cta-inner">
        <span className="eyebrow" data-animate="fade-up">Jetzt anfragen</span>
        <h2 data-animate="fade-up" data-delay="100">
          {c.cta_title}
        </h2>
        <p data-animate="fade-up" data-delay="200">
          {c.cta_text}
        </p>
        <div className="booking-cta-actions" data-animate="fade-up" data-delay="300">
          <Link href="/booking" className="btn btn-gold">
            Buchung anfragen
          </Link>
          <a href={INQUIRY_MAIL_HREF} className="btn btn-outline-light">
            {band.email}
          </a>
        </div>
      </div>
    </section>
  );
}

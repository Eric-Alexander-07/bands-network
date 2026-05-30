import Link from "next/link";
import { band } from "@/config/band";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <span className="hero-genre">
          {band.genre} · {band.location}
        </span>
        <h1 className="hero-title">{band.name}</h1>
        <p className="hero-claim">{band.claim}</p>
        <div className="hero-actions">
          <Link href="/booking" className="btn btn-primary">
            Jetzt buchen
          </Link>
          <Link href="/media" className="btn btn-ghost">
            Videos
          </Link>
        </div>
      </div>
      <span className="hero-scroll">Scroll</span>
    </section>
  );
}

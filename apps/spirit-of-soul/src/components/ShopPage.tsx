import Link from "next/link";
import { band } from "@/config/band";

export default function ShopPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/hero.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Merch &amp; mehr</span>
          <h1>Shop</h1>
          <p>T-Shirts, CDs und exklusive {band.name}-Merchandise-Artikel.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="shop-coming-soon">
            <span className="eyebrow">Bald verfügbar</span>
            <h2>Der Shop öffnet in Kürze</h2>
            <p>
              Wir arbeiten gerade an unserem Online-Shop. Schreib uns, wenn
              du Merchandise oder CDs bestellen möchtest — wir helfen dir
              direkt weiter.
            </p>
            <Link href="/kontakt" className="btn btn-primary">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>
    </>
  );
}

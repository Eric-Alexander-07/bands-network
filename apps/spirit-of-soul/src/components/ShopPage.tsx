import Link from "next/link";
import { band } from "@/config/band";
import ShopProductImages from "@/components/ShopProductImages";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ShopPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/hero.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Merchandise</span>
          <h1>Shop</h1>
          <p>20 Jahre Spirit of Soul — jetzt feiern wir mit euch.<br />CD und T-Shirts auf Anfrage bestellbar.</p>
        </div>
      </section>

      {/* Bestellhinweis */}
      <section className="section shop-info-section">
        <div className="container">
          <div className="shop-info-box" data-animate="fade-up">
            <span className="eyebrow">So bestellt ihr</span>
            <p>
              Alle Produkte kosten <strong>15,00 EUR</strong> zzgl. Versand.
              Schreibt uns eine E-Mail an{" "}
              <a href={`mailto:${band.email}`}>{band.email}</a> mit eurem
              Namen, eurer Adresse sowie der gewünschten Anzahl der CDs
              bzw. Größe und Farbe des Shirts. Gegen Vorauskasse erhaltet
              ihr eure Merch-Produkte umgehend zugeschickt.
            </p>
            <a href={`mailto:${band.email}?subject=Shop-Bestellung`} className="btn btn-primary">
              Jetzt bestellen
            </a>
          </div>
        </div>
      </section>

      {/* CD */}
      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Audio CD</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">20 Years Live</h2>
          <article className="shop-product shop-product--cd" data-animate="fade-up" data-delay="200">
            <div className="shop-product-images">
              <img
                src="/images/shop/Titel_SOS.avif"
                alt="Spirit of Soul — 20 Years Live CD"
                className="shop-product-main-img"
              />
            </div>
            <div className="shop-product-info">
              <span className="shop-product-tag">Limited · Anniversary Edition</span>
              <h3 className="shop-product-name">Spirit of Soul<br />20 Years Live</h3>
              <p className="shop-product-desc">
                Feiert mit uns 20 Jahre Spirit of Soul! Die CD beinhaltet
                10 Songs — fünf eigene Kompositionen und fünf Coverversionen
                in toller Audio-Qualität. Einen ersten Eindruck bekommt ihr
                in unserem Video{" "}
                <Link href="/media" className="shop-inline-link">
                  „20 Years Live" unter Media&nbsp;/&nbsp;News
                </Link>.
              </p>
              <div className="shop-product-price">
                <span className="shop-price-amount">15,00 EUR</span>
                <span className="shop-price-note">zzgl. Versand</span>
              </div>
              <a href={`mailto:${band.email}?subject=Bestellung: 20 Years Live CD`} className="btn btn-primary">
                Per E-Mail bestellen
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* T-Shirts */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">T-Shirts</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Merchandise</h2>
          <div className="shop-shirts-grid" data-animate="stagger">

            {/* Schwarz */}
            <article className="shop-shirt-card">
              <ShopProductImages
                front="/images/shop/prototyp_schwarz_vorne.avif"
                back="/images/shop/prototyp_schwarz_hinten.avif"
                name="T-Shirt Schwarz"
              />
              <div className="shop-shirt-info">
                <span className="shop-product-tag">T-Shirt · Schwarz</span>
                <h3 className="shop-shirt-name">Spirit of Soul Shirt</h3>
                <p className="shop-shirt-sub">2000–2020 · 20 Years Live</p>
                <div className="shop-sizes">
                  {SIZES.map((s) => <span key={s} className="shop-size-badge">{s}</span>)}
                </div>
                <ul className="shop-variants">
                  <li>Gildan Premium V-Neck (Men, normaler Schnitt)</li>
                  <li>Gildan Premium V-Neck (Woman, tailliert)</li>
                </ul>
                <div className="shop-product-price">
                  <span className="shop-price-amount">15,00 EUR</span>
                  <span className="shop-price-note">zzgl. Versand</span>
                </div>
                <a href={`mailto:${band.email}?subject=Bestellung: T-Shirt Schwarz`} className="btn btn-primary">
                  Per E-Mail bestellen
                </a>
              </div>
            </article>

            {/* Weiß */}
            <article className="shop-shirt-card">
              <ShopProductImages
                front="/images/shop/prototyp_weiss_vorne.avif"
                back="/images/shop/prototyp_weiss_hinten.avif"
                name="T-Shirt Weiß"
              />
              <div className="shop-shirt-info">
                <span className="shop-product-tag">T-Shirt · Weiß</span>
                <h3 className="shop-shirt-name">Spirit of Soul Shirt</h3>
                <p className="shop-shirt-sub">2000–2020 · 20 Years Live</p>
                <div className="shop-sizes">
                  {SIZES.map((s) => <span key={s} className="shop-size-badge">{s}</span>)}
                </div>
                <ul className="shop-variants">
                  <li>Gildan Premium V-Neck (Men, normaler Schnitt)</li>
                  <li>Gildan Premium V-Neck (Woman, tailliert)</li>
                </ul>
                <div className="shop-product-price">
                  <span className="shop-price-amount">15,00 EUR</span>
                  <span className="shop-price-note">zzgl. Versand</span>
                </div>
                <a href={`mailto:${band.email}?subject=Bestellung: T-Shirt Weiß`} className="btn btn-primary">
                  Per E-Mail bestellen
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>
    </>
  );
}

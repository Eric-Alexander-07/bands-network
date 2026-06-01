import Link from "next/link";
import { band } from "@/config/band";
import ShopProductImages from "@/components/ShopProductImages";
import ConcentricRings from "@/components/ConcentricRings";

const SIZES = ["S", "M", "L", "XL", "XXL"];

function ShopProduct({
  tag,
  name,
  subtitle,
  desc,
  price = "15,00 EUR",
  emailSubject,
  children,
}: {
  tag: string;
  name: string;
  subtitle?: string;
  desc: React.ReactNode;
  price?: string;
  emailSubject: string;
  children: React.ReactNode;
}) {
  return (
    <article className="shop-product">
      <div className="shop-product-images">
        {children}
      </div>
      <div className="shop-product-info">
        <span className="shop-product-tag">{tag}</span>
        <h3 className="shop-product-name">{name}</h3>
        {subtitle && <p className="shop-product-subtitle">{subtitle}</p>}
        <p className="shop-product-desc">{desc}</p>
        <div className="shop-product-price">
          <span className="shop-price-amount">{price}</span>
          <span className="shop-price-note">zzgl. Versand</span>
        </div>
        <a href={`mailto:${band.email}?subject=${emailSubject}`} className="btn btn-primary">
          Per E-Mail bestellen
        </a>
      </div>
    </article>
  );
}

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
              Namen, eurer Adresse sowie der gewünschten Anzahl der CDs bzw.
              Größe und Farbe des Shirts. Gegen Vorauskasse erhaltet ihr eure
              Merch-Produkte umgehend zugeschickt.
            </p>
            <a href={`mailto:${band.email}?subject=Shop-Bestellung`} className="btn btn-primary">
              Jetzt bestellen
            </a>
          </div>
        </div>
      </section>

      {/* Produkte */}
      <section className="section section-has-rings">
        <ConcentricRings className="rings-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Unsere Produkte</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Merchandise</h2>
          <div className="shop-products" data-animate="stagger">

            {/* CD */}
            <ShopProduct
              tag="Limited · Anniversary Edition"
              name="20 Years Live"
              subtitle="Audio CD"
              desc={
                <>
                  Feiert mit uns 20 Jahre Spirit of Soul! Die CD beinhaltet 10 Songs —
                  fünf eigene Kompositionen und fünf Coverversionen in toller Audio-Qualität.
                  Einen ersten Eindruck gibt es im Video{" "}
                  <Link href="/media" className="shop-inline-link">
                    &bdquo;20 Years Live&ldquo; unter Media&nbsp;/&nbsp;News
                  </Link>.
                </>
              }
              emailSubject="Bestellung: 20 Years Live CD"
            >
              <div className="shop-single-img-wrap">
                <img
                  src="/images/shop/Titel_SOS.avif"
                  alt="Spirit of Soul — 20 Years Live CD"
                  className="shop-single-img"
                />
              </div>
            </ShopProduct>

            {/* T-Shirt Schwarz */}
            <ShopProduct
              tag="T-Shirt · Schwarz"
              name="Spirit of Soul Shirt"
              subtitle="2000–2020 · 20 Years Live"
              desc={
                <>
                  Gildan Premium V-Neck in Schwarz. Erhältlich in zwei Schnitten —
                  normaler Schnitt (Men) und tailliert (Women).
                  <div className="shop-sizes">
                    {SIZES.map((s) => <span key={s} className="shop-size-badge">{s}</span>)}
                  </div>
                  <ul className="shop-variants">
                    <li>Gildan Premium V-Neck (Men, normaler Schnitt)</li>
                    <li>Gildan Premium V-Neck (Woman, tailliert)</li>
                  </ul>
                </>
              }
              emailSubject="Bestellung: T-Shirt Schwarz"
            >
              <ShopProductImages
                images={[
                  "/images/shop/prototyp_schwarz_vorne.avif",
                  "/images/shop/prototyp_schwarz_hinten.avif",
                ]}
                name="T-Shirt Schwarz"
              />
            </ShopProduct>

            {/* T-Shirt Weiß */}
            <ShopProduct
              tag="T-Shirt · Weiß"
              name="Spirit of Soul Shirt"
              subtitle="2000–2020 · 20 Years Live"
              desc={
                <>
                  Gildan Premium V-Neck in Weiß. Erhältlich in zwei Schnitten —
                  normaler Schnitt (Men) und tailliert (Women).
                  <div className="shop-sizes">
                    {SIZES.map((s) => <span key={s} className="shop-size-badge">{s}</span>)}
                  </div>
                  <ul className="shop-variants">
                    <li>Gildan Premium V-Neck (Men, normaler Schnitt)</li>
                    <li>Gildan Premium V-Neck (Woman, tailliert)</li>
                  </ul>
                </>
              }
              emailSubject="Bestellung: T-Shirt Weiß"
            >
              <ShopProductImages
                images={[
                  "/images/shop/prototyp_weiss_vorne.avif",
                  "/images/shop/prototyp_weiss_hinten.avif",
                ]}
                name="T-Shirt Weiß"
              />
            </ShopProduct>

          </div>
        </div>
      </section>
    </>
  );
}

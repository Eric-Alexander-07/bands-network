import Link from "next/link";
import { band } from "@/config/band";
import ShopProductImages from "@/components/ShopProductImages";
import ConcentricRings from "@/components/ConcentricRings";
import type { Product } from "@/lib/data";
import type { Content } from "@/lib/content";

// ─── Static fallback products ────────────────────────────────────
const STATIC_PRODUCTS = [
  {
    id: "static-1",
    tag: "Limited · Anniversary Edition",
    name: "20 Years Live",
    subtitle: "Audio CD",
    description: "Feiert mit uns 20 Jahre Spirit of Soul! Die CD beinhaltet 10 Songs — fünf eigene Kompositionen und fünf Coverversionen in toller Audio-Qualität. Einen ersten Eindruck gibt es im Video '20 Years Live' unter Media / News.",
    price: "15,00 EUR",
    image_url: "/images/shop/Titel_SOS.avif",
    image_url_back: null,
    email_subject: "Bestellung: 20 Years Live CD",
  },
  {
    id: "static-2",
    tag: "T-Shirt · Schwarz",
    name: "Spirit of Soul Shirt",
    subtitle: "2000–2020 · 20 Years Live",
    description: "Gildan Premium V-Neck in Schwarz. Erhältlich in zwei Schnitten — normaler Schnitt (Men) und tailliert (Women).\n\nGrößen: S · M · L · XL · XXL\n— Gildan Premium V-Neck (Men, normaler Schnitt)\n— Gildan Premium V-Neck (Woman, tailliert)",
    price: "15,00 EUR",
    image_url: "/images/shop/prototyp_schwarz_vorne.avif",
    image_url_back: "/images/shop/prototyp_schwarz_hinten.avif",
    email_subject: "Bestellung: T-Shirt Schwarz",
  },
  {
    id: "static-3",
    tag: "T-Shirt · Weiß",
    name: "Spirit of Soul Shirt",
    subtitle: "2000–2020 · 20 Years Live",
    description: "Gildan Premium V-Neck in Weiß. Erhältlich in zwei Schnitten — normaler Schnitt (Men) und tailliert (Women).\n\nGrößen: S · M · L · XL · XXL\n— Gildan Premium V-Neck (Men, normaler Schnitt)\n— Gildan Premium V-Neck (Woman, tailliert)",
    price: "15,00 EUR",
    image_url: "/images/shop/prototyp_weiss_vorne.avif",
    image_url_back: "/images/shop/prototyp_weiss_hinten.avif",
    email_subject: "Bestellung: T-Shirt Weiß",
  },
];

type DbProduct = Product;

interface Props { dbProducts?: DbProduct[]; c: Content }

function ShopProduct({ product, priceNote }: { product: typeof STATIC_PRODUCTS[0] | DbProduct; priceNote: string }) {
  const images = [
    product.image_url,
    product.image_url_back,
  ].filter(Boolean) as string[];

  const lines = (product.description ?? "").split("\n").filter(Boolean);

  return (
    <article className="shop-product">
      <div className="shop-product-images">
        {images.length > 1
          ? <ShopProductImages images={images} name={product.name} />
          : images[0]
            ? (
              <div className="shop-single-img-wrap">
                <img src={images[0]} alt={product.name} className="shop-single-img" />
              </div>
            )
            : null
        }
      </div>
      <div className="shop-product-info">
        {product.tag && <span className="shop-product-tag">{product.tag}</span>}
        <h3 className="shop-product-name">{product.name}</h3>
        {product.subtitle && <p className="shop-product-subtitle">{product.subtitle}</p>}
        <div className="shop-product-desc">
          {lines.map((line, i) => (
            <p key={i} style={{ margin: "0 0 4px" }}>{line}</p>
          ))}
        </div>
        <div className="shop-product-price">
          <span className="shop-price-amount">{product.price}</span>
          <span className="shop-price-note">{priceNote}</span>
        </div>
        <a
          href={`mailto:${band.email}?subject=${encodeURIComponent(product.email_subject ?? `Bestellung: ${product.name}`)}`}
          className="btn btn-primary"
        >
          Per E-Mail bestellen
        </a>
      </div>
    </article>
  );
}

export default function ShopPage({ dbProducts = [], c }: Props) {
  const products = dbProducts.length > 0 ? dbProducts : STATIC_PRODUCTS;

  return (
    <>
      <section className="page-hero">
        <img src={c.image_main} className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Merchandise</span>
          <h1>{c.page_hero_title}</h1>
          <p>{c.text_top}</p>
        </div>
      </section>

      <section className="section shop-info-section">
        <div className="container">
          <div className="shop-info-box" data-animate="fade-up">
            <span className="eyebrow">So bestellt ihr</span>
            {c.text_body.split("\n").filter(Boolean).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <a href={`mailto:${band.email}?subject=Shop-Bestellung`} className="btn btn-primary">
              Jetzt bestellen
            </a>
          </div>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Unsere Produkte</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.shop_products_title}</h2>
          <div className="shop-products" data-animate="stagger">
            {products.map(p => <ShopProduct key={p.id} product={p as any} priceNote={c.shop_price_note} />)}
          </div>
        </div>
      </section>
    </>
  );
}

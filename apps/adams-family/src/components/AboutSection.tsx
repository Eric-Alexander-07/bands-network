import Link from "next/link";
import LightboxImage from "@/components/LightboxImage";
import type { Content } from "@/lib/content";

export default function AboutSection({ c }: { c: Content }) {
  return (
    <section className="section section-has-rings">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="about-grid">
          <div className="about-image-wrap" data-animate="fade-right">
            <LightboxImage
              src={c.about_image}
              alt={`${c.about_title} — Die Band`}
              className="about-img"
              overlayContent="⊕"
              wrapperClassName="about-img-wrap-inner"
            />
          </div>
          <div className="about-text">
            <span className="eyebrow" data-animate="fade-up">Über die Band</span>
            <h2 data-animate="fade-up" data-delay="100">{c.about_title}</h2>
            <p data-animate="fade-up" data-delay="200">{c.about_text}</p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/about" className="btn btn-outline">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

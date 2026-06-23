import Image from "next/image";
import Link from "next/link";
import { band } from "@/config/band";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image
              src="/images/logo_original.png"
              alt={band.name}
              width={180}
              height={60}
              style={{ height: "120px", width: "auto" }}
            />
            <p className="footer-brand-claim">
              {band.claim}
              <br />
              {band.genre} · {band.location}
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              {band.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Folgt uns</h4>
            <div className="footer-socials">
              {Object.entries(band.socials).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {band.name} · Vivid Music Productions</span>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link href="/impressum" style={{ color: "inherit" }}>Impressum</Link>
            <Link href="/datenschutz" style={{ color: "inherit" }}>Datenschutz</Link>
            <span>{band.email}</span>
            <Link
              href="/admin"
              style={{ color: "rgba(246,244,240,0.18)", fontSize: "10px", letterSpacing: "0.1em" }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

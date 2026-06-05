"use client";
import Link from "next/link";
import { MdArticle, MdEvent, MdImage, MdPlayCircle, MdShoppingBag, MdStar, MdGroup, MdShare } from "react-icons/md";

const SECTIONS = [
  { href: "/admin/seiten",     label: "Seiten-Texte",  Icon: MdArticle,     desc: "Inhalte pro Seite pflegen" },
  { href: "/admin/events",     label: "Events",         Icon: MdEvent,       desc: "Spieltermine verwalten" },
  { href: "/admin/galerie",    label: "Galerie",        Icon: MdImage,       desc: "Fotos hochladen & sortieren" },
  { href: "/admin/videos",     label: "Videos",         Icon: MdPlayCircle,  desc: "YouTube-Links verwalten" },
  { href: "/admin/produkte",   label: "Produkte",       Icon: MdShoppingBag, desc: "Shop-Artikel pflegen" },
  { href: "/admin/referenzen", label: "Referenzen",     Icon: MdStar,        desc: "Kundennamen verwalten" },
  { href: "/admin/besetzung",  label: "Besetzung",      Icon: MdGroup,       desc: "Gruppen & Einträge" },
  { href: "/admin/social",     label: "Social Media",   Icon: MdShare,       desc: "Links & Handles" },
];

export default function AdminDashboard() {
  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Dashboard</h1>
        <span style={{ fontSize: 12, color: "var(--a-muted)" }}>Spirit of Soul</span>
      </div>
      <p style={{ color: "var(--a-muted)", marginBottom: 24, fontSize: 14 }}>
        Willkommen im Adminbereich. Wähle eine Sektion zum Bearbeiten.
      </p>
      <div className="a-dash-grid">
        {SECTIONS.map(({ href, label, Icon, desc }) => (
          <Link key={href} href={href} className="a-dash-card">
            <Icon size={22} className="a-dash-card-icon" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
            <span className="a-dash-card-label" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
              {desc}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

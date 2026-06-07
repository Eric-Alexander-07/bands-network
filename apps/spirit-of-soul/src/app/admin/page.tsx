// @ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@bands/supabase/client";
import { MdEvent, MdImage, MdPlayCircle, MdShoppingBag, MdStar, MdPerson, MdGroups, MdPersonAdd } from "react-icons/md";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

const NAV_CARDS = [
  { href: "/admin/media",      label: "Media & News", Icon: MdPlayCircle,  desc: "Videos, Termine & Social" },
  { href: "/admin/galerie",    label: "Galerie",      Icon: MdImage,       desc: "Fotos hochladen & sortieren" },
  { href: "/admin/produkte",   label: "Shop",         Icon: MdShoppingBag, desc: "Produkte & Seitentext" },
  { href: "/admin/about",      label: "Über uns",     Icon: MdPerson,      desc: "Bandinfo & Texte" },
  { href: "/admin/services",   label: "Services",     Icon: MdGroups,      desc: "Leistungen pflegen" },
  { href: "/admin/referenzen", label: "Referenzen",   Icon: MdStar,        desc: "Kundennamen verwalten" },
];

interface Stats {
  events: number;
  images: number;
  videos: number;
  products: number;
  referenzen: number;
  social: number;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats | null>(null);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting]       = useState(false);
  const [inviteMsg, setInviteMsg]     = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      const id = site.id;
      const [ev, img, vid, prod, ref, soc] = await Promise.all([
        supabase.from("events").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("media_images").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("media_videos").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("products").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("referenzen").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("social_links").select("id", { count: "exact", head: true }).eq("site_id", id),
      ]);
      setStats({
        events:    ev.count    ?? 0,
        images:    img.count   ?? 0,
        videos:    vid.count   ?? 0,
        products:  prod.count  ?? 0,
        referenzen: ref.count  ?? 0,
        social:    soc.count   ?? 0,
      });
    })();
  }, []);

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteMsg(null);
    try {
      const res = await fetch("/api/admin/invite-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const json = await res.json();
      if (res.ok) {
        setInviteMsg({ ok: true, text: `Einladung an ${inviteEmail} gesendet.` });
        setInviteEmail("");
      } else {
        setInviteMsg({ ok: false, text: json.error ?? "Fehler beim Senden." });
      }
    } catch {
      setInviteMsg({ ok: false, text: "Netzwerkfehler." });
    } finally {
      setInviting(false);
    }
  };

  return (
    <>
      <div className="a-section-header">
        <div>
          <h1 className="a-section-title">Dashboard</h1>
          <p style={{ color: "var(--a-muted)", margin: "4px 0 0", fontSize: 13 }}>Spirit of Soul — Übersicht</p>
        </div>
      </div>

      {stats && (
        <div className="a-dash-stats">
          <div className="a-stat-card"><div className="a-stat-num">{stats.events}</div><div className="a-stat-label">Events</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.images}</div><div className="a-stat-label">Galerie-Bilder</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.videos}</div><div className="a-stat-label">Videos</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.products}</div><div className="a-stat-label">Produkte</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.referenzen}</div><div className="a-stat-label">Referenzen</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.social}</div><div className="a-stat-label">Social Links</div></div>
        </div>
      )}

      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--a-muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Schnellzugriff</p>
      <div className="a-dash-grid">
        {NAV_CARDS.map(({ href, label, Icon, desc }) => (
          <Link key={href} href={href} className="a-dash-card">
            <Icon size={20} className="a-dash-card-icon" />
            <span style={{ fontWeight: 700, fontSize: 13 }}>{label}</span>
            <span className="a-dash-card-label">{desc}</span>
          </Link>
        ))}
      </div>

      {/* Invite section */}
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--a-muted)", textTransform: "uppercase", letterSpacing: ".08em", margin: "32px 0 12px" }}>Admin einladen</p>
      <div className="a-card" style={{ maxWidth: 480 }}>
        <p style={{ fontSize: 13, color: "var(--a-text2)", marginBottom: 16, lineHeight: 1.6 }}>
          Schicke einer Person eine Einladungs-E-Mail. Sie erhält einen Link, über den sie ein Passwort festlegen und Zugang zum Admin-Bereich erhalten.
        </p>
        <form onSubmit={handleInvite} style={{ display: "flex", gap: 8 }}>
          <input
            className="a-input"
            type="email"
            placeholder="email@beispiel.de"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <button
            className="a-btn a-btn-primary"
            type="submit"
            disabled={inviting}
            style={{ whiteSpace: "nowrap", gap: 6 }}
          >
            <MdPersonAdd size={15} />
            {inviting ? "Sende …" : "Einladen"}
          </button>
        </form>
        {inviteMsg && (
          <p style={{
            marginTop: 10, fontSize: 13,
            color: inviteMsg.ok ? "var(--a-success, #4ade80)" : "var(--a-error)",
          }}>
            {inviteMsg.text}
          </p>
        )}
      </div>
    </>
  );
}

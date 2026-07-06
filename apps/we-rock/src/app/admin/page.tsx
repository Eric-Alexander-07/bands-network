// @ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@bands/supabase/client";
import { MdImage, MdPlayCircle, MdStar, MdPerson, MdGroups } from "react-icons/md";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";

const NAV_CARDS = [
  { href: "/admin/media",      label: "Media & News", Icon: MdPlayCircle, desc: "Videos, Termine & Social" },
  { href: "/admin/galerie",    label: "Galerie",      Icon: MdImage,      desc: "Fotos hochladen & sortieren" },
  { href: "/admin/about",      label: "Über uns",     Icon: MdPerson,     desc: "Bandinfo & Texte" },
  { href: "/admin/services",   label: "Services",     Icon: MdGroups,     desc: "Leistungen pflegen" },
  { href: "/admin/referenzen", label: "Referenzen",   Icon: MdStar,       desc: "Kundennamen verwalten" },
];

interface Stats {
  events: number;
  images: number;
  videos: number;
  referenzen: number;
  social: number;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) { setLoading(false); return; }
      const id = site.id;
      const [ev, img, vid, ref, soc] = await Promise.all([
        supabase.from("events").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("media_images").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("media_videos").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("referenzen").select("id", { count: "exact", head: true }).eq("site_id", id),
        supabase.from("social_links").select("id", { count: "exact", head: true }).eq("site_id", id),
      ]);
      setStats({
        events:    ev.count  ?? 0,
        images:    img.count ?? 0,
        videos:    vid.count ?? 0,
        referenzen: ref.count ?? 0,
        social:    soc.count ?? 0,
      });
    })();
  }, []);

  return (
    <>
      <div className="a-section-header">
        <div>
          <h1 className="a-section-title">Dashboard</h1>
          <p style={{ color: "var(--a-muted)", margin: "4px 0 0", fontSize: 13 }}>WE ROCK — Übersicht</p>
        </div>
      </div>

      {stats && (
        <div className="a-dash-stats">
          <div className="a-stat-card"><div className="a-stat-num">{stats.events}</div><div className="a-stat-label">Events</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.images}</div><div className="a-stat-label">Galerie-Bilder</div></div>
          <div className="a-stat-card"><div className="a-stat-num">{stats.videos}</div><div className="a-stat-label">Videos</div></div>
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

    </>
  );
}

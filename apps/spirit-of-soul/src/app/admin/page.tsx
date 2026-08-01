"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@bands/supabase/client";
import { contentSchema } from "@/config/contentSchema";
import { SITE_SLUG } from "@/lib/site";
import { MdArticle, MdImage } from "react-icons/md";

/** Tabellen, deren Umfang auf dem Dashboard angezeigt wird. */
const COUNTED = [
  { table: "events",       label: "Termine" },
  { table: "media_images", label: "Galeriebilder" },
  { table: "media_videos", label: "Videos" },
  { table: "referenzen",   label: "Referenzen" },
  { table: "band_members", label: "Bandmitglieder" },
] as const;

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [missing, setMissing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: site } = await supabase
        .from("sites").select("id").eq("slug", SITE_SLUG).maybeSingle();
      if (!site) { setMissing(true); setLoading(false); return; }

      const entries = await Promise.all(
        COUNTED.map(async c => {
          const { count } = await supabase
            .from(c.table)
            .select("*", { count: "exact", head: true })
            .eq("site_id", site.id);
          return [c.table, count ?? 0] as const;
        })
      );
      setCounts(Object.fromEntries(entries));
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  if (missing) {
    return (
      <div className="a-card">
        <p className="a-card-title">Website nicht gefunden</p>
        <p className="a-muted-text">
          In der Datenbank existiert kein Eintrag mit dem Kürzel <code>{SITE_SLUG}</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Dashboard</h1>
      </div>

      <div className="a-dash-stats">
        {COUNTED.map(c => (
          <div key={c.table} className="a-stat-card">
            <span className="a-stat-num">{counts[c.table] ?? 0}</span>
            <span className="a-stat-label">{c.label}</span>
          </div>
        ))}
      </div>

      <p className="a-card-title" style={{ marginTop: 28 }}>Inhalte bearbeiten</p>
      <div className="a-dash-grid">
        {contentSchema.pages.map(p => (
          <Link key={p.slug} href={`/admin/inhalte/${p.slug}`} className="a-dash-card">
            <span className="a-dash-card-icon"><MdArticle size={18} /></span>
            <span className="a-dash-card-label">{p.title}</span>
          </Link>
        ))}
        <Link href="/admin/galerie" className="a-dash-card">
          <span className="a-dash-card-icon"><MdImage size={18} /></span>
          <span className="a-dash-card-label">Galerie (Upload)</span>
        </Link>
      </div>
    </>
  );
}

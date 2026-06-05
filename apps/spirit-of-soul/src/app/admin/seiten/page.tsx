// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@bands/supabase/client";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

const TABS = [
  { slug: "about",    label: "Über uns",  fields: [{ key: "text_top", label: "Text oben" }, { key: "text_bottom", label: "Haupttext", rows: 8 }] },
  { slug: "services", label: "Services",  fields: [{ key: "text_top", label: "Text oben" }, { key: "besetzung_text", label: "Besetzung" }, { key: "pakete_text", label: "Pakete" }, { key: "technik_text", label: "Technik" }] },
  { slug: "media",    label: "Media",     fields: [{ key: "text_top", label: "Text oben" }] },
  { slug: "shop",     label: "Shop",      fields: [{ key: "text_top", label: "Text oben" }, { key: "text_body", label: "Haupttext", rows: 8 }] },
] as const;

export default function SeitenAdmin() {
  const { toast }   = useToast();
  const supabase    = createClient();
  const [active, setActive]   = useState("about");
  const [siteId, setSiteId]   = useState("");
  const [pages, setPages]     = useState<Record<string, Record<string, string>>>({});
  const [pageIds, setPageIds] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const initial: Record<string, Record<string, string>> = {};
      const ids: Record<string, string | null> = {};
      await Promise.all(TABS.map(async tab => {
        const { data: page } = await supabase.from("pages").select("id,content").eq("site_id", site.id).eq("slug", tab.slug).single();
        ids[tab.slug] = page?.id ?? null;
        const content = (page?.content as Record<string, string>) ?? {};
        initial[tab.slug] = {};
        tab.fields.forEach(f => { initial[tab.slug][f.key] = content[f.key] ?? ""; });
      }));
      setPages(initial);
      setPageIds(ids);
      setLoading(false);
    })();
  }, []);

  const setField = (tabSlug: string, key: string, val: string) => {
    setPages(p => ({ ...p, [tabSlug]: { ...p[tabSlug], [key]: val } }));
    setIsDirty(true);
  };

  const saveTab = async () => {
    setSaving(true);
    const content = pages[active] ?? {};
    const existingId = pageIds[active];
    if (existingId) {
      await supabase.from("pages").update({ content }).eq("id", existingId);
    } else {
      const { data } = await supabase.from("pages").insert({ site_id: siteId, slug: active, content }).select("id").single();
      setPageIds(p => ({ ...p, [active]: data?.id ?? null }));
    }
    setSaving(false);
    setIsDirty(false);
    toast("Gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  const tab = TABS.find(t => t.slug === active)!;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Seiten-Texte</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveTab} disabled={saving || !isDirty}>
            {saving ? "…" : "Speichern"}
          </button>
        </div>
      </div>
      <div className="a-tabs">
        {TABS.map(t => (
          <button key={t.slug} className={`a-tab${active === t.slug ? " active" : ""}`}
            onClick={() => { setActive(t.slug); setIsDirty(false); }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab.fields.map(f => (
        <div key={f.key} className="a-field">
          <label className="a-label">{f.label}</label>
          <textarea
            className="a-textarea"
            rows={"rows" in f ? f.rows : 4}
            value={pages[active]?.[f.key] ?? ""}
            onChange={e => setField(active, f.key, e.target.value)}
          />
        </div>
      ))}
    </>
  );
}

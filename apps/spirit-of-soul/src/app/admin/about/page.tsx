// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@bands/supabase/client";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminUpdate } from "@/lib/adminDb";
import ImgUploadField from "@/components/admin/ImgUploadField";

const SLUG      = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
const PAGE_SLUG = "about";

const FIELDS = [
  { key: "text_top",    label: "Text oben (Hero)" },
  { key: "text_bottom", label: "Haupttext", rows: 8 },
];

export default function AboutAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [siteId, setSiteId]   = useState("");
  const [content, setContent] = useState<Record<string, string>>({});
  const [pageId, setPageId]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data: page } = await supabase.from("pages").select("id,content").eq("site_id", site.id).eq("slug", PAGE_SLUG).single();
      setPageId(page?.id ?? null);
      const c = (page?.content as Record<string, string>) ?? {};
      const init: Record<string, string> = {};
      [...FIELDS, { key: "image_main" }].forEach(f => { init[f.key] = c[f.key] ?? ""; });
      setContent(init);
      setLoading(false);
    })();
  }, []);

  const setField = (key: string, val: string) => { setContent(c => ({ ...c, [key]: val })); setIsDirty(true); };

  const saveImgField = async (key: string, url: string) => {
    const updated = { ...content, [key]: url };
    if (pageId) {
      const { error } = await adminUpdate("pages", pageId, { content: updated });
      if (error) { toast(`Fehler: ${error}`, "error"); return; }
    } else {
      const { data, error } = await adminInsert("pages", { site_id: siteId, slug: PAGE_SLUG, content: updated });
      if (error) { toast(`Fehler: ${error}`, "error"); return; }
      if (data?.id) setPageId(data.id);
    }
    toast("Bild gespeichert", "success");
  };

  const save = async () => {
    setSaving(true);
    if (pageId) {
      const { error } = await adminUpdate("pages", pageId, { content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    } else {
      const { data, error } = await adminInsert("pages", { site_id: siteId, slug: PAGE_SLUG, content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
      if (data?.id) setPageId(data.id);
    }
    setSaving(false);
    setIsDirty(false);
    toast("Gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Über uns</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-primary a-btn-sm" onClick={save} disabled={saving || !isDirty}>
            {saving ? "…" : "Speichern"}
          </button>
        </div>
      </div>

      <div className="a-card">
        {FIELDS.map(f => (
          <div key={f.key} className="a-field">
            <label className="a-label">{f.label}</label>
            <textarea
              className="a-textarea"
              rows={f.rows ?? 4}
              value={content[f.key] ?? ""}
              onChange={e => setField(f.key, e.target.value)}
            />
          </div>
        ))}
        <div className="a-field">
          <label className="a-label">Seitenbild</label>
          <ImgUploadField
            pageSlug={PAGE_SLUG}
            value={content.image_main ?? ""}
            onChange={url => setField("image_main", url)}
            onAutoSave={url => saveImgField("image_main", url)}
          />
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@bands/supabase/client";
import { defaultsOf, fieldsOf, type ContentPage } from "@bands/content";
import { adminInsert, adminUpdate } from "./adminDb";
import ImageField from "./ImageField";
import { useToast } from "./Toast";

interface Props {
  /** Seitendefinition aus dem Schema der Band. */
  page: ContentPage;
  siteId: string;
}

/**
 * Formular fuer eine Seite aus dem Content-Schema.
 *
 * Es rendert sich vollstaendig aus der Deklaration: neue Felder entstehen
 * allein dadurch, dass sie im Schema der Band ergaenzt werden — hier ist
 * dafuer keine Aenderung noetig.
 *
 * Gespeichert wird in `pages.content` (JSONB) unter `page.slug`.
 */
export default function ContentForm({ page, siteId }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from("pages")
        .select("id, content")
        .eq("site_id", siteId)
        .eq("slug", page.slug)
        .maybeSingle();
      if (cancelled) return;

      // Fehlende Schluessel mit dem Standardtext aus dem Schema vorbelegen,
      // damit im Admin nie ein leeres Feld steht, wo die Seite Text zeigt.
      const stored = (data?.content ?? {}) as Record<string, string>;
      const merged = { ...defaultsOf(page) };
      for (const [k, v] of Object.entries(stored)) {
        if (typeof v === "string") merged[k] = v;
      }
      setValues(merged);
      setRowId(data?.id ?? null);
      setDirty(false);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [page, siteId]);

  function setField(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  /** Persistiert das komplette Content-Objekt (optional mit Sofort-Override). */
  async function persist(override?: Record<string, string>) {
    const content = { ...values, ...(override ?? {}) };
    const res = rowId
      ? await adminUpdate("pages", rowId, { content, updated_at: new Date().toISOString() })
      : await adminInsert("pages", { site_id: siteId, slug: page.slug, content });
    if (res.error) throw new Error(res.error);
    if (!rowId) {
      const created = res.data as { id?: string } | undefined;
      if (created?.id) setRowId(created.id);
    }
  }

  async function save() {
    setSaving(true);
    try {
      await persist();
      setDirty(false);
      toast("Gespeichert");
    } catch (e) {
      toast(`Fehler: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  const fieldCount = fieldsOf(page).length;

  return (
    <>
      <div className="a-section-header">
        <div>
          <h1 className="a-section-title">{page.title}</h1>
          {page.description && <p className="a-muted-text">{page.description}</p>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {dirty && (
            <span className="a-unsaved"><span className="a-unsaved-dot" />Nicht gespeichert</span>
          )}
          <button className="a-btn a-btn-primary" onClick={save} disabled={saving || !dirty}>
            {saving ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>

      {page.groups.map(group => (
        <div className="a-card" key={group.title}>
          <p className="a-card-title">{group.title}</p>
          {group.description && <p className="a-muted-text">{group.description}</p>}

          {group.fields.map(field => (
            <div className="a-field" key={field.key}>
              <label className="a-label" htmlFor={`f-${field.key}`}>{field.label}</label>

              {field.type === "image" ? (
                <ImageField
                  value={values[field.key] ?? ""}
                  path={`pages/${page.slug}`}
                  onChange={url => setField(field.key, url)}
                  // Bild sofort sichern, damit die URL nicht verloren geht,
                  // wenn danach nicht auf Speichern geklickt wird.
                  onAutoSave={async url => {
                    try {
                      await persist({ [field.key]: url });
                      toast("Bild gespeichert");
                    } catch (e) {
                      toast(`Fehler: ${e instanceof Error ? e.message : String(e)}`, "error");
                    }
                  }}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={`f-${field.key}`}
                  className="a-textarea"
                  rows={field.rows ?? 5}
                  value={values[field.key] ?? ""}
                  onChange={e => setField(field.key, e.target.value)}
                />
              ) : (
                <input
                  id={`f-${field.key}`}
                  className="a-input"
                  type={field.type === "url" ? "url" : "text"}
                  value={values[field.key] ?? ""}
                  onChange={e => setField(field.key, e.target.value)}
                />
              )}

              {field.help && <p className="a-help">{field.help}</p>}
            </div>
          ))}
        </div>
      ))}

      <p className="a-muted-text" style={{ marginTop: 8 }}>
        {fieldCount} Felder · Seite <code>{page.path}</code>
      </p>
    </>
  );
}

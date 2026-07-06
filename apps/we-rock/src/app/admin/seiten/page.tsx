// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminUpdate, adminDelete, adminDeleteWhere, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";

const TABS = [
  { slug: "about", label: "Über uns", fields: [
    { key: "text_top",    label: "Text oben (Hero)" },
    { key: "text_bottom", label: "Haupttext", rows: 8 },
    { key: "image_main",  label: "Seitenbild", type: "image" },
  ]},
  { slug: "services", label: "Services", fields: [
    { key: "text_top",       label: "Text oben (Hero)" },
    { key: "besetzung_text", label: "Besetzung Intro" },
    { key: "technik_text",   label: "Technik Intro" },
    { key: "image_main",     label: "Technik-Bild", type: "image" },
  ]},
  { slug: "media", label: "Media", fields: [
    { key: "text_top",   label: "Text oben (Hero)" },
    { key: "image_main", label: "Hero-Bild", type: "image" },
  ]},
  { slug: "shop", label: "Shop", fields: [
    { key: "text_top",  label: "Text oben (Hero)" },
    { key: "text_body", label: "Info-Text", rows: 8 },
    { key: "image_main", label: "Hero-Bild", type: "image" },
  ]},
];

// ─── Image upload field ─────────────────────────────────────────────
// onAutoSave(url) is called after upload to immediately persist the URL to DB
function ImgUploadField({ tabSlug, value, onChange, onAutoSave }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "images");
      fd.append("path", `pages/${tabSlug}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) {
        onChange(json.url);
        await onAutoSave(json.url);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="a-img-field">
      {value ? (
        <div className="a-img-field-preview">
          <img src={value} alt="" />
          <button className="a-img-field-change a-btn a-btn-sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? "Speichert…" : "Bild ändern"}
          </button>
        </div>
      ) : (
        <div className="a-img-field-empty" onClick={() => !uploading && inputRef.current?.click()}>
          {uploading ? "Speichert…" : "+ Bild hochladen"}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
    </div>
  );
}

// ─── Besetzung section (shown below Services text fields) ───────────
interface Group { id: string; site_id: string | null; name: string; beschreibung: string | null; position: number | null; }
interface Entry { id: string; gruppe_id: string | null; name: string; beschreibung: string | null; position: number | null; }

function BesetzungSection({ siteId, supabase, toast }) {
  const [groups, setGroups]   = useState<Group[]>([]);
  const [entries, setEntries] = useState<Record<string, Entry[]>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState<Record<string, boolean>>({});
  const [editG, setEditG]     = useState<Record<string, Partial<Group>>>({});
  const [editE, setEditE]     = useState<Record<string, Partial<Entry>>>({});
  const [dirty, setDirty]     = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (!siteId) return;
    (async () => {
      const { data: gs } = await supabase.from("besetzung_gruppen").select("*").eq("site_id", siteId).order("position");
      setGroups(gs ?? []);
      const entMap = {};
      await Promise.all((gs ?? []).map(async g => {
        const { data: es } = await supabase.from("besetzung_eintraege").select("*").eq("gruppe_id", g.id).order("position");
        entMap[g.id] = es ?? [];
      }));
      setEntries(entMap);
      setLoading(false);
    })();
  }, [siteId]);

  const fieldG = (id, key, val) => { setEditG(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setDirty(true); };
  const fieldE = (id, key, val) => { setEditE(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setDirty(true); };
  const getG   = (g, key) => editG[g.id]?.[key] !== undefined ? editG[g.id][key] : g[key];
  const getE   = (e, key) => editE[e.id]?.[key] !== undefined ? editE[e.id][key] : e[key];

  const saveAll = async () => {
    setSaving(true);
    const gU = Object.entries(editG).map(([id, c]) => ({ id, ...c }));
    const eU = Object.entries(editE).map(([id, c]) => ({ id, ...c }));
    const errs = await Promise.all([
      gU.length ? adminUpdateMany("besetzung_gruppen", gU) : Promise.resolve({}),
      eU.length ? adminUpdateMany("besetzung_eintraege", eU) : Promise.resolve({}),
    ]);
    if (errs.find(r => r.error)) { toast("Fehler beim Speichern", "error"); setSaving(false); return; }
    const { data: gs } = await supabase.from("besetzung_gruppen").select("*").eq("site_id", siteId).order("position");
    const freshGroups = gs ?? [];
    const entMap = {};
    await Promise.all(freshGroups.map(async g => {
      const { data: es } = await supabase.from("besetzung_eintraege").select("*").eq("gruppe_id", g.id).order("position");
      entMap[g.id] = es ?? [];
    }));
    setGroups(freshGroups); setEntries(entMap);
    setEditG({}); setEditE({}); setDirty(false); setSaving(false); toast("Gespeichert", "success");
  };

  const addGroup = async () => {
    const { data, error } = await adminInsert("besetzung_gruppen", { site_id: siteId, name: "Neue Gruppe", beschreibung: "", position: groups.length });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setGroups(p => [...p, data]); setEntries(e => ({ ...e, [data.id]: [] })); }
  };

  const deleteGroup = async (id) => {
    if (!confirm("Gruppe und alle Einträge löschen?")) return;
    await adminDeleteWhere("besetzung_eintraege", "gruppe_id", id);
    const { error } = await adminDelete("besetzung_gruppen", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setGroups(p => p.filter(g => g.id !== id));
    setEntries(e => { const n = { ...e }; delete n[id]; return n; });
  };

  const addEntry = async (gruppeId) => {
    const { data, error } = await adminInsert("besetzung_eintraege", { gruppe_id: gruppeId, name: "Neu", beschreibung: "", position: (entries[gruppeId] ?? []).length });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) setEntries(e => ({ ...e, [gruppeId]: [...(e[gruppeId] ?? []), data] }));
  };

  const deleteEntry = async (gruppeId, id) => {
    if (!confirm("Eintrag löschen?")) return;
    const { error } = await adminDelete("besetzung_eintraege", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setEntries(e => ({ ...e, [gruppeId]: (e[gruppeId] ?? []).filter(x => x.id !== id) }));
  };

  const onDragEndGroups = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...groups]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setGroups(r); await adminUpdateMany("besetzung_gruppen", r.map((g, i) => ({ id: g.id, position: i })));
  };

  const onDragEndEntries = (gruppeId) => async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...(entries[gruppeId] ?? [])]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setEntries(e => ({ ...e, [gruppeId]: r }));
    await adminUpdateMany("besetzung_eintraege", r.map((e, i) => ({ id: e.id, position: i })));
  };

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div className="a-card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span className="a-label" style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Besetzung</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {dirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addGroup}><MdAdd size={14} />Gruppe</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !dirty}>{saving ? "…" : "Speichern"}</button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEndGroups}>
        <Droppable droppableId="groups">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {groups.map((g, i) => (
                <Draggable key={g.id} draggableId={g.id} index={i}>
                  {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} className="a-accordion">
                      <div className="a-accordion-header" onClick={() => setOpen(o => ({ ...o, [g.id]: !o[g.id] }))}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span {...p.dragHandleProps} onClick={e => e.stopPropagation()}><MdDragIndicator style={{ color: "var(--a-border2)" }} /></span>
                          <span>{String(getG(g, "name"))}</span>
                          <span style={{ fontSize: 11, color: "var(--a-muted)" }}>{(entries[g.id] ?? []).length} Einträge</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <button className="a-btn a-btn-danger a-btn-sm" onClick={e => { e.stopPropagation(); deleteGroup(g.id); }}><MdDelete size={13} /></button>
                          {open[g.id] ? <MdExpandLess /> : <MdExpandMore />}
                        </div>
                      </div>
                      {open[g.id] && (
                        <div className="a-accordion-body">
                          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                            <div className="a-field" style={{ flex: 1, marginBottom: 0 }}><label className="a-label">Name</label><input className="a-input" value={String(getG(g, "name"))} onChange={e => fieldG(g.id, "name", e.target.value)} /></div>
                            <div className="a-field" style={{ flex: 2, marginBottom: 0 }}><label className="a-label">Beschreibung</label><input className="a-input" value={String(getG(g, "beschreibung") || "")} onChange={e => fieldG(g.id, "beschreibung", e.target.value)} /></div>
                          </div>
                          <hr className="a-divider" />
                          <DragDropContext onDragEnd={onDragEndEntries(g.id)}>
                            <Droppable droppableId={`entries-${g.id}`}>
                              {(ep) => (
                                <div ref={ep.innerRef} {...ep.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                  {(entries[g.id] ?? []).map((e, ei) => (
                                    <Draggable key={e.id} draggableId={e.id} index={ei}>
                                      {(dp) => (
                                        <div ref={dp.innerRef} {...dp.draggableProps} style={{ display: "flex", gap: 8, alignItems: "center", background: "var(--a-surface)", border: "1px solid var(--a-border)", borderRadius: 6, padding: "8px 10px" }}>
                                          <span className="a-drag-handle" {...dp.dragHandleProps}><MdDragIndicator /></span>
                                          <input className="a-input" value={String(getE(e, "name"))} onChange={ev => fieldE(e.id, "name", ev.target.value)} placeholder="Name" style={{ flex: 1 }} />
                                          <input className="a-input" value={String(getE(e, "beschreibung") || "")} onChange={ev => fieldE(e.id, "beschreibung", ev.target.value)} placeholder="Instrument / Rolle" style={{ flex: 2 }} />
                                          <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteEntry(g.id, e.id)}><MdDelete size={13} /></button>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {ep.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                          <button className="a-btn a-btn-ghost a-btn-sm" style={{ marginTop: 8 }} onClick={() => addEntry(g.id)}><MdAdd size={13} />Eintrag</button>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {prov.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────
export default function SeitenAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [active, setActive]   = useState("about");
  const [siteId, setSiteId]   = useState("");
  const [pages, setPages]     = useState({});
  const [pageIds, setPageIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) { setLoading(false); return; }
      setSiteId(site.id);
      const initial = {};
      const ids = {};
      await Promise.all(TABS.map(async tab => {
        const { data: page } = await supabase.from("pages").select("id,content").eq("site_id", site.id).eq("slug", tab.slug).single();
        ids[tab.slug] = page?.id ?? null;
        const content = (page?.content) ?? {};
        initial[tab.slug] = {};
        tab.fields.forEach(f => { initial[tab.slug][f.key] = content[f.key] ?? ""; });
      }));
      setPages(initial);
      setPageIds(ids);
      setLoading(false);
    })();
  }, []);

  const setField = (tabSlug, key, val) => {
    setPages(p => ({ ...p, [tabSlug]: { ...p[tabSlug], [key]: val } }));
    setIsDirty(true);
  };

  // Called immediately after image upload — saves current content + new URL to DB without waiting for "Speichern"
  const saveImgField = async (fieldKey, url) => {
    const updatedContent = { ...(pages[active] ?? {}), [fieldKey]: url };
    const existingId = pageIds[active];
    if (existingId) {
      const { error } = await adminUpdate("pages", existingId, { content: updatedContent });
      if (error) { toast(`Fehler: ${error}`, "error"); return; }
    } else {
      const { data, error } = await adminInsert("pages", { site_id: siteId, slug: active, content: updatedContent });
      if (error) { toast(`Fehler: ${error}`, "error"); return; }
      if (data?.id) setPageIds(p => ({ ...p, [active]: data.id }));
    }
    toast("Bild gespeichert", "success");
  };

  const saveTab = async () => {
    setSaving(true);
    const content = pages[active] ?? {};
    const existingId = pageIds[active];
    if (existingId) {
      const { error } = await adminUpdate("pages", existingId, { content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    } else {
      const { data, error } = await adminInsert("pages", { site_id: siteId, slug: active, content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
      setPageIds(p => ({ ...p, [active]: data?.id ?? null }));
    }
    setSaving(false);
    setIsDirty(false);
    toast("Gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  const tab = TABS.find(t => t.slug === active);

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
      <div className="a-card">
        {tab.fields.map(f => (
          <div key={f.key} className="a-field">
            <label className="a-label">{f.label}</label>
            {f.type === "image" ? (
              <ImgUploadField
                tabSlug={active}
                value={pages[active]?.[f.key] ?? ""}
                onChange={url => setField(active, f.key, url)}
                onAutoSave={url => saveImgField(f.key, url)}
              />
            ) : (
              <textarea
                className="a-textarea"
                rows={f.rows ?? 4}
                value={pages[active]?.[f.key] ?? ""}
                onChange={e => setField(active, f.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {active === "services" && siteId && (
        <BesetzungSection siteId={siteId} supabase={supabase} toast={toast} />
      )}
    </>
  );
}

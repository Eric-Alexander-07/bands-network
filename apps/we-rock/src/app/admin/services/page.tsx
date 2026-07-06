// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminUpdate, adminDelete, adminDeleteWhere, adminUpdateMany } from "@/lib/adminDb";
import ImgUploadField from "@/components/admin/ImgUploadField";

const SLUG      = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
const PAGE_SLUG = "services";

interface Group { id: string; site_id: string | null; name: string; beschreibung: string | null; position: number | null; }
interface Entry { id: string; gruppe_id: string | null; name: string; beschreibung: string | null; position: number | null; }

const TEXT_FIELDS = [
  { key: "text_top",       label: "Text oben (Hero)" },
  { key: "besetzung_text", label: "Besetzung Intro" },
  { key: "technik_text",   label: "Technik Intro" },
];

export default function ServicesAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();

  // ─── Page texts state ──────────────────────────────────────
  const [siteId, setSiteId]   = useState("");
  const [content, setContent] = useState<Record<string, string>>({});
  const [pageId, setPageId]   = useState<string | null>(null);
  const [textLoading, setTextLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // ─── Besetzung state ───────────────────────────────────────
  const [groups, setGroups]   = useState<Group[]>([]);
  const [entries, setEntries] = useState<Record<string, Entry[]>>({});
  const [bezLoading, setBezLoading] = useState(true);
  const [open, setOpen]       = useState<Record<string, boolean>>({});
  const [editG, setEditG]     = useState<Record<string, Partial<Group>>>({});
  const [editE, setEditE]     = useState<Record<string, Partial<Entry>>>({});
  const [bezDirty, setBezDirty] = useState(false);
  const [bezSaving, setBezSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);

      // Load page texts
      const { data: page } = await supabase.from("pages").select("id,content").eq("site_id", site.id).eq("slug", PAGE_SLUG).single();
      setPageId(page?.id ?? null);
      const c = (page?.content as Record<string, string>) ?? {};
      const init: Record<string, string> = {};
      [...TEXT_FIELDS, { key: "image_main" }].forEach(f => { init[f.key] = c[f.key] ?? ""; });
      setContent(init);
      setTextLoading(false);

      // Load Besetzung
      const { data: gs } = await supabase.from("besetzung_gruppen").select("*").eq("site_id", site.id).order("position");
      setGroups(gs ?? []);
      const entMap = {};
      await Promise.all((gs ?? []).map(async g => {
        const { data: es } = await supabase.from("besetzung_eintraege").select("*").eq("gruppe_id", g.id).order("position");
        entMap[g.id] = es ?? [];
      }));
      setEntries(entMap);
      setBezLoading(false);
    })();
  }, []);

  // ─── Text save helpers ─────────────────────────────────────
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

  const saveTexts = async () => {
    setSaving(true);
    if (pageId) {
      const { error } = await adminUpdate("pages", pageId, { content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    } else {
      const { data, error } = await adminInsert("pages", { site_id: siteId, slug: PAGE_SLUG, content });
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
      if (data?.id) setPageId(data.id);
    }
    setSaving(false); setIsDirty(false); toast("Gespeichert", "success");
  };

  // ─── Besetzung helpers ─────────────────────────────────────
  const fieldG = (id, key, val) => { setEditG(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setBezDirty(true); };
  const fieldE = (id, key, val) => { setEditE(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setBezDirty(true); };
  const getG = (g, key) => editG[g.id]?.[key] !== undefined ? editG[g.id][key] : g[key];
  const getE = (e, key) => editE[e.id]?.[key] !== undefined ? editE[e.id][key] : e[key];

  const saveBesetzung = async () => {
    setBezSaving(true);
    const gU = Object.entries(editG).map(([id, c]) => ({ id, ...c }));
    const eU = Object.entries(editE).map(([id, c]) => ({ id, ...c }));
    const errs = await Promise.all([
      gU.length ? adminUpdateMany("besetzung_gruppen", gU) : Promise.resolve({}),
      eU.length ? adminUpdateMany("besetzung_eintraege", eU) : Promise.resolve({}),
    ]);
    if (errs.find(r => r.error)) { toast("Fehler beim Speichern", "error"); setBezSaving(false); return; }
    const { data: gs } = await supabase.from("besetzung_gruppen").select("*").eq("site_id", siteId).order("position");
    const fresh = gs ?? [];
    const entMap = {};
    await Promise.all(fresh.map(async g => {
      const { data: es } = await supabase.from("besetzung_eintraege").select("*").eq("gruppe_id", g.id).order("position");
      entMap[g.id] = es ?? [];
    }));
    setGroups(fresh); setEntries(entMap); setEditG({}); setEditE({});
    setBezDirty(false); setBezSaving(false); toast("Gespeichert", "success");
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

  if (textLoading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Services</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveTexts} disabled={saving || !isDirty}>
            {saving ? "…" : "Speichern"}
          </button>
        </div>
      </div>

      {/* Seitentexte */}
      <div className="a-card">
        {TEXT_FIELDS.map(f => (
          <div key={f.key} className="a-field">
            <label className="a-label">{f.label}</label>
            <textarea className="a-textarea" rows={4} value={content[f.key] ?? ""} onChange={e => setField(f.key, e.target.value)} />
          </div>
        ))}
        <div className="a-field">
          <label className="a-label">Technik-Bild</label>
          <ImgUploadField
            pageSlug={PAGE_SLUG}
            value={content.image_main ?? ""}
            onChange={url => setField("image_main", url)}
            onAutoSave={url => saveImgField("image_main", url)}
          />
        </div>
      </div>

      {/* Besetzung */}
      {!bezLoading && (
        <div className="a-card" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="a-label" style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Besetzung</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {bezDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
              <button className="a-btn a-btn-ghost a-btn-sm" onClick={addGroup}><MdAdd size={14} />Gruppe</button>
              <button className="a-btn a-btn-primary a-btn-sm" onClick={saveBesetzung} disabled={bezSaving || !bezDirty}>{bezSaving ? "…" : "Speichern"}</button>
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
      )}
    </>
  );
}

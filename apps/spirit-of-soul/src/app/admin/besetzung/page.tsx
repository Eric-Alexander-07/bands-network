// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
interface Group { id: string; site_id: string; name: string; subtitle: string | null; position: number; created_at: string; }
interface Entry { id: string; gruppe_id: string; name: string; lineup: string; position: number; created_at: string; }

export default function BesetzungAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [groups, setGroups]   = useState<Group[]>([]);
  const [entries, setEntries] = useState<Record<string, Entry[]>>({});
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState<Record<string, boolean>>({});
  const [editG, setEditG]     = useState<Record<string, Partial<Group>>>({});
  const [editE, setEditE]     = useState<Record<string, Partial<Entry>>>({});
  const [dirty, setDirty]     = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data: gs } = await supabase.from("besetzung_gruppen").select("*").eq("site_id", site.id).order("position");
      setGroups(gs ?? []);
      const entMap: Record<string, Entry[]> = {};
      await Promise.all((gs ?? []).map(async g => {
        const { data: es } = await supabase.from("besetzung_eintraege").select("*").eq("gruppe_id", g.id).order("position");
        entMap[g.id] = es ?? [];
      }));
      setEntries(entMap);
      setLoading(false);
    })();
  }, []);

  const fieldG = (id: string, key: keyof Group, val: string) => { setEditG(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setDirty(true); };
  const fieldE = (id: string, key: keyof Entry, val: string) => { setEditE(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setDirty(true); };
  const getG = (g: Group, key: keyof Group) => editG[g.id]?.[key] !== undefined ? editG[g.id][key] : g[key];
  const getE = (e: Entry, key: keyof Entry) => editE[e.id]?.[key] !== undefined ? editE[e.id][key] : e[key];

  const saveAll = async () => {
    setSaving(true);
    await Promise.all([
      ...Object.entries(editG).map(([id, c]) => supabase.from("besetzung_gruppen").update(c).eq("id", id)),
      ...Object.entries(editE).map(([id, c]) => supabase.from("besetzung_eintraege").update(c).eq("id", id)),
    ]);
    setEditG({}); setEditE({}); setDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addGroup = async () => {
    const { data } = await supabase.from("besetzung_gruppen").insert({ site_id: siteId, name: "Neue Gruppe", subtitle: "", position: groups.length }).select().single();
    if (data) { setGroups(p => [...p, data as Group]); setEntries(e => ({ ...e, [(data as Group).id]: [] })); toast("Gruppe erstellt", "success"); }
  };

  const deleteGroup = async (id: string) => {
    if (!confirm("Gruppe und alle Einträge löschen?")) return;
    await supabase.from("besetzung_eintraege").delete().eq("gruppe_id", id);
    await supabase.from("besetzung_gruppen").delete().eq("id", id);
    setGroups(p => p.filter(g => g.id !== id));
    setEntries(e => { const n = { ...e }; delete n[id]; return n; });
    toast("Gelöscht", "info");
  };

  const addEntry = async (gruppeId: string) => {
    const pos = (entries[gruppeId] ?? []).length;
    const { data } = await supabase.from("besetzung_eintraege").insert({ gruppe_id: gruppeId, name: "Neu", lineup: "", position: pos }).select().single();
    if (data) setEntries(e => ({ ...e, [gruppeId]: [...(e[gruppeId] ?? []), data as Entry] }));
  };

  const deleteEntry = async (gruppeId: string, id: string) => {
    if (!confirm("Eintrag löschen?")) return;
    await supabase.from("besetzung_eintraege").delete().eq("id", id);
    setEntries(e => ({ ...e, [gruppeId]: (e[gruppeId] ?? []).filter(x => x.id !== id) }));
  };

  const onDragEndGroups = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...groups]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setGroups(r);
    await Promise.all(r.map((g, i) => supabase.from("besetzung_gruppen").update({ position: i }).eq("id", g.id)));
    toast("Reihenfolge gespeichert", "success");
  };

  const onDragEndEntries = (gruppeId: string) => async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...(entries[gruppeId] ?? [])]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setEntries(e => ({ ...e, [gruppeId]: r }));
    await Promise.all(r.map((e, i) => supabase.from("besetzung_eintraege").update({ position: i }).eq("id", e.id)));
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Besetzung</h1>
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
                          <span {...p.dragHandleProps} onClick={e => e.stopPropagation()}>
                            <MdDragIndicator style={{ color: "var(--a-muted)" }} />
                          </span>
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
                            <div className="a-field" style={{ flex: 1, marginBottom: 0 }}>
                              <label className="a-label">Gruppenname</label>
                              <input className="a-input" value={String(getG(g, "name"))} onChange={e => fieldG(g.id, "name", e.target.value)} />
                            </div>
                            <div className="a-field" style={{ flex: 1, marginBottom: 0 }}>
                              <label className="a-label">Untertitel</label>
                              <input className="a-input" value={String(getG(g, "subtitle") || "")} onChange={e => fieldG(g.id, "subtitle", e.target.value)} />
                            </div>
                          </div>
                          <hr className="a-divider" />
                          <DragDropContext onDragEnd={onDragEndEntries(g.id)}>
                            <Droppable droppableId={`entries-${g.id}`}>
                              {(ep) => (
                                <div ref={ep.innerRef} {...ep.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                  {(entries[g.id] ?? []).map((e, j) => (
                                    <Draggable key={e.id} draggableId={e.id} index={j}>
                                      {(ep2) => (
                                        <div ref={ep2.innerRef} {...ep2.draggableProps} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                          <span className="a-drag-handle" {...ep2.dragHandleProps}><MdDragIndicator /></span>
                                          <input className="a-input" value={String(getE(e, "name"))} onChange={ev => fieldE(e.id, "name", ev.target.value)} placeholder="Name" style={{ width: 130 }} />
                                          <input className="a-input" value={String(getE(e, "lineup"))} onChange={ev => fieldE(e.id, "lineup", ev.target.value)} placeholder="Besetzung" style={{ flex: 1 }} />
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
                          <button className="a-btn a-btn-ghost a-btn-sm" style={{ marginTop: 10 }} onClick={() => addEntry(g.id)}>
                            <MdAdd size={13} />Eintrag
                          </button>
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
    </>
  );
}

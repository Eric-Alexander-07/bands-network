// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
interface Ref { id: string; site_id: string; client_name: string; event_type: string | null; position: number; created_at: string; }

export default function ReferenzenAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [refs, setRefs]       = useState<Ref[]>([]);
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [editMap, setEditMap] = useState<Record<string, Partial<Ref>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data } = await supabase.from("referenzen").select("*").eq("site_id", site.id).order("position");
      setRefs(data ?? []); setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Ref, val: string) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const getVal = (r: Ref, key: keyof Ref) => editMap[r.id]?.[key] !== undefined ? editMap[r.id][key] : r[key];

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(Object.entries(editMap).map(([id, c]) => supabase.from("referenzen").update(c).eq("id", id)));
    const { data } = await supabase.from("referenzen").select("*").eq("site_id", siteId).order("position");
    setRefs(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addRef = async () => {
    const { data } = await supabase.from("referenzen").insert({ site_id: siteId, client_name: "Neuer Eintrag", event_type: "", position: refs.length }).select().single();
    if (data) { setRefs(p => [...p, data as Ref]); toast("Hinzugefügt", "success"); }
  };

  const deleteRef = async (id: string) => {
    if (!confirm("Löschen?")) return;
    await supabase.from("referenzen").delete().eq("id", id);
    setRefs(p => p.filter(r => r.id !== id));
    toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...refs]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setRefs(r);
    await Promise.all(r.map((ref, i) => supabase.from("referenzen").update({ position: i }).eq("id", ref.id)));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Referenzen</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addRef}><MdAdd size={14} />Neu</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="refs">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {refs.map((r, i) => (
                <Draggable key={r.id} draggableId={r.id} index={i}>
                  {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} style={{ display: "flex", gap: 8, alignItems: "center", background: "var(--a-surface2)", border: "1px solid var(--a-border)", borderRadius: 6, padding: "8px 10px" }}>
                      <span className="a-drag-handle" {...p.dragHandleProps}><MdDragIndicator /></span>
                      <input className="a-input" value={String(getVal(r, "client_name"))} onChange={e => field(r.id, "client_name", e.target.value)} placeholder="Kundenname" style={{ flex: 2 }} />
                      <input className="a-input" value={String(getVal(r, "event_type") || "")} onChange={e => field(r.id, "event_type", e.target.value)} placeholder="Typ" style={{ flex: 1 }} />
                      <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteRef(r.id)}><MdDelete size={14} /></button>
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

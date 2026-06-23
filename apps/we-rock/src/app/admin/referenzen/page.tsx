// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminDelete, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";
interface Ref { id: string; site_id: string | null; name: string; type: string | null; position: number | null; created_at: string | null; }

export default function ReferenzenAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [siteId, setSiteId]   = useState("");
  const [refs, setRefs]       = useState<Ref[]>([]);
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
      setRefs(data ?? []);
      setLoading(false);
    })();
  }, []);

  const field = (id, key, val) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const get   = (r, key) => editMap[r.id]?.[key] !== undefined ? editMap[r.id][key] : r[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length) {
      const { error } = await adminUpdateMany("referenzen", updates);
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    }
    const { data } = await supabase.from("referenzen").select("*").eq("site_id", siteId).order("position");
    setRefs(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false); toast("Gespeichert", "success");
  };

  const addRef = async () => {
    const { data, error } = await adminInsert("referenzen", { site_id: siteId, name: "Neuer Eintrag", type: "", position: refs.length });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setRefs(p => [...p, data]); toast("Hinzugefügt", "success"); }
  };

  const deleteRef = async (id) => {
    if (!confirm("Löschen?")) return;
    const { error } = await adminDelete("referenzen", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setRefs(p => p.filter(r => r.id !== id)); toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...refs]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setRefs(r); await adminUpdateMany("referenzen", r.map((ref, i) => ({ id: ref.id, position: i })));
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
                    <div ref={p.innerRef} {...p.draggableProps} className="a-card" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 0, padding: "10px 14px" }}>
                      <span className="a-drag-handle" {...p.dragHandleProps}><MdDragIndicator /></span>
                      <input className="a-input" value={String(get(r, "name"))} onChange={e => field(r.id, "name", e.target.value)} placeholder="Kundenname / Veranstaltung" style={{ flex: 2 }} />
                      <input className="a-input" value={String(get(r, "type") ?? "")} onChange={e => field(r.id, "type", e.target.value)} placeholder="Kategorie (z.B. Firmenevent)" style={{ flex: 1 }} />
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

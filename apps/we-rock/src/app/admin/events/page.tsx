// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminUpdate, adminDelete, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";
interface Evt { id: string; site_id: string | null; name: string; date: string; location: string | null; link: string | null; visible: boolean | null; position: number | null; created_at: string | null; }

export default function EventsAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [events, setEvents]   = useState<Evt[]>([]);
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [editMap, setEditMap] = useState<Record<string, Partial<Evt>>>({});

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) { setLoading(false); return; }
      setSiteId(site.id);
      const { data } = await supabase.from("events").select("*").eq("site_id", site.id).order("date", { ascending: true });
      setEvents(data ?? []);
      setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Evt, val: string | boolean) => {
    setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } }));
    setIsDirty(true);
  };
  const getVal = (e: Evt, key: keyof Evt) => editMap[e.id]?.[key] !== undefined ? editMap[e.id][key] : e[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length > 0) {
      const { error } = await adminUpdateMany("events", updates);
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    }
    const { data } = await supabase.from("events").select("*").eq("site_id", siteId).order("date", { ascending: true });
    setEvents(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addEvent = async () => {
    if (!siteId) { toast("Seite nicht gefunden", "error"); return; }
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await adminInsert("events", {
      site_id: siteId, name: "Neues Event", date: today,
      location: "", link: "", visible: true, position: events.length,
    });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setEvents(p => [...p, data as Evt]); toast("Event erstellt", "success"); }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Event löschen?")) return;
    const { error } = await adminDelete("events", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setEvents(p => p.filter(e => e.id !== id));
    toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...events];
    const [m] = r.splice(result.source.index, 1);
    r.splice(result.destination.index, 0, m);
    setEvents(r);
    await adminUpdateMany("events", r.map((e, i) => ({ id: e.id, position: i })));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade Events …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Events</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addEvent}><MdAdd size={14} />Neu</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>
            {saving ? "…" : "Speichern"}
          </button>
        </div>
      </div>

      {!siteId && (
        <div style={{ background: "rgba(185,28,28,.07)", border: "1px solid var(--a-error)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "var(--a-error)" }}>
          Keine Site gefunden. Bitte einen Eintrag in der <strong>sites</strong>-Tabelle mit <code>slug = &apos;spirit-of-soul&apos;</code> anlegen.
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="events">
          {(prov) => (
            <table className="a-table" ref={prov.innerRef} {...prov.droppableProps}>
              <thead><tr><th style={{ width: 28 }} /><th>Datum</th><th>Name</th><th>Ort</th><th>Link</th><th>Sichtbar</th><th /></tr></thead>
              <tbody>
                {events.map((e, i) => (
                  <Draggable key={e.id} draggableId={e.id} index={i}>
                    {(p) => (
                      <tr ref={p.innerRef} {...p.draggableProps}>
                        <td><span className="a-drag-handle" {...p.dragHandleProps}><MdDragIndicator /></span></td>
                        <td><input className="a-input" type="date" value={String(getVal(e, "date"))} onChange={ev => field(e.id, "date", ev.target.value)} style={{ width: 140 }} /></td>
                        <td><input className="a-input" value={String(getVal(e, "name"))} onChange={ev => field(e.id, "name", ev.target.value)} /></td>
                        <td><input className="a-input" value={String(getVal(e, "location") || "")} onChange={ev => field(e.id, "location", ev.target.value)} placeholder="Ort" style={{ width: 130 }} /></td>
                        <td><input className="a-input" value={String(getVal(e, "link") || "")} onChange={ev => field(e.id, "link", ev.target.value)} placeholder="https://…" style={{ width: 160 }} /></td>
                        <td>
                          <label className="a-toggle">
                            <input type="checkbox" checked={Boolean(getVal(e, "visible"))} onChange={ev => field(e.id, "visible", ev.target.checked)} />
                            <span className="a-toggle-track"><span className="a-toggle-thumb" /></span>
                          </label>
                        </td>
                        <td><button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteEvent(e.id)}><MdDelete size={14} /></button></td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {prov.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminDelete, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";
const PLATFORMS = ["instagram", "facebook", "youtube", "spotify", "tiktok"] as const;
interface Social { id: string; site_id: string | null; platform: string; url: string; position: number | null; }

export default function SocialAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [links, setLinks]     = useState<Social[]>([]);
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [editMap, setEditMap] = useState<Record<string, Partial<Social>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data } = await supabase.from("social_links").select("*").eq("site_id", site.id).order("position");
      setLinks(data ?? []); setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Social, val: string) => {
    setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } }));
    setIsDirty(true);
  };
  const getVal = (l: Social, key: keyof Social) => editMap[l.id]?.[key] !== undefined ? editMap[l.id][key] : l[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length > 0) {
      const { error } = await adminUpdateMany("social_links", updates);
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    }
    const { data } = await supabase.from("social_links").select("*").eq("site_id", siteId).order("position");
    setLinks(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addLink = async () => {
    const { data, error } = await adminInsert("social_links", {
      site_id: siteId, platform: "instagram", url: "", position: links.length,
    });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setLinks(p => [...p, data as Social]); toast("Hinzugefügt", "success"); }
  };

  const deleteLink = async (id: string) => {
    if (!confirm("Löschen?")) return;
    const { error } = await adminDelete("social_links", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setLinks(p => p.filter(l => l.id !== id));
    toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...links]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setLinks(r);
    await adminUpdateMany("social_links", r.map((l, i) => ({ id: l.id, position: i })));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Social Media</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addLink}><MdAdd size={14} />Neu</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="social">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {links.map((l, i) => (
                <Draggable key={l.id} draggableId={l.id} index={i}>
                  {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} className="a-card" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 0, padding: "10px 14px" }}>
                      <span className="a-drag-handle" {...p.dragHandleProps}><MdDragIndicator /></span>
                      <select className="a-select" value={String(getVal(l, "platform"))} onChange={e => field(l.id, "platform", e.target.value)} style={{ width: 130 }}>
                        {PLATFORMS.map(pl => <option key={pl} value={pl}>{pl}</option>)}
                      </select>
                      <input className="a-input" value={String(getVal(l, "url"))} onChange={e => field(l.id, "url", e.target.value)} placeholder="https://…" style={{ flex: 1 }} />
                      <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteLink(l.id)}><MdDelete size={14} /></button>
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

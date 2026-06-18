// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminDelete, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";
interface Video { id: string; site_id: string | null; youtube_url: string; title: string | null; position: number | null; created_at: string | null; }

function getYtId(input: string): string {
  if (!input) return "";
  const m = input.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? input;
}

export default function VideosAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [videos, setVideos]   = useState<Video[]>([]);
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [editMap, setEditMap] = useState<Record<string, Partial<Video>>>({});

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data } = await supabase.from("media_videos").select("*").eq("site_id", site.id).order("position");
      setVideos(data ?? []); setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Video, val: string) => {
    setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } }));
    setIsDirty(true);
  };
  const getVal = (v: Video, key: keyof Video) => editMap[v.id]?.[key] !== undefined ? editMap[v.id][key] : v[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length > 0) {
      const { error } = await adminUpdateMany("media_videos", updates);
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    }
    const { data } = await supabase.from("media_videos").select("*").eq("site_id", siteId).order("position");
    setVideos(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addVideo = async () => {
    const { data, error } = await adminInsert("media_videos", {
      site_id: siteId, youtube_url: "", title: "Neues Video", position: videos.length,
    });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setVideos(p => [...p, data as Video]); toast("Hinzugefügt", "success"); }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Video löschen?")) return;
    const { error } = await adminDelete("media_videos", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setVideos(p => p.filter(v => v.id !== id));
    toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...videos]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setVideos(r);
    await adminUpdateMany("media_videos", r.map((v, i) => ({ id: v.id, position: i })));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade Videos …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Videos</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addVideo}><MdAdd size={14} />Neu</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="videos">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {videos.map((v, i) => {
                const ytId = getYtId(String(getVal(v, "youtube_url")));
                return (
                  <Draggable key={v.id} draggableId={v.id} index={i}>
                    {(p) => (
                      <div ref={p.innerRef} {...p.draggableProps} className="a-card" style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 0 }}>
                        <span className="a-drag-handle" style={{ marginTop: 8 }} {...p.dragHandleProps}><MdDragIndicator /></span>
                        {ytId && <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" className="a-video-thumb" />}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                          <input className="a-input" value={String(getVal(v, "title") || "")} onChange={e => field(v.id, "title", e.target.value)} placeholder="Titel" />
                          <input className="a-input" value={String(getVal(v, "youtube_url"))} onChange={e => field(v.id, "youtube_url", e.target.value)} placeholder="YouTube URL (https://youtu.be/…)" />
                        </div>
                        <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteVideo(v.id)}><MdDelete size={14} /></button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {prov.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

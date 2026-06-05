// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
interface Video { id: string; site_id: string; youtube_id: string; title: string; description: string | null; position: number; created_at: string; }

function getYtId(input: string): string {
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

  const field = (id: string, key: keyof Video, val: string) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const getVal = (v: Video, key: keyof Video) => editMap[v.id]?.[key] !== undefined ? editMap[v.id][key] : v[key];

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(Object.entries(editMap).map(([id, c]) => supabase.from("media_videos").update(c).eq("id", id)));
    const { data } = await supabase.from("media_videos").select("*").eq("site_id", siteId).order("position");
    setVideos(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addVideo = async () => {
    const { data } = await supabase.from("media_videos").insert({ site_id: siteId, youtube_id: "", title: "Neues Video", description: "", position: videos.length }).select().single();
    if (data) { setVideos(p => [...p, data as Video]); toast("Hinzugefügt", "success"); }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Video löschen?")) return;
    await supabase.from("media_videos").delete().eq("id", id);
    setVideos(p => p.filter(v => v.id !== id));
    toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...videos]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setVideos(r);
    await Promise.all(r.map((v, i) => supabase.from("media_videos").update({ position: i }).eq("id", v.id)));
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
                const ytId = getYtId(String(getVal(v, "youtube_id")));
                return (
                  <Draggable key={v.id} draggableId={v.id} index={i}>
                    {(p) => (
                      <div ref={p.innerRef} {...p.draggableProps} className="a-card" style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 0 }}>
                        <span className="a-drag-handle" style={{ marginTop: 8 }} {...p.dragHandleProps}><MdDragIndicator /></span>
                        {ytId && <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" className="a-video-thumb" />}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                          <input className="a-input" value={String(getVal(v, "title"))} onChange={e => field(v.id, "title", e.target.value)} placeholder="Titel" />
                          <input className="a-input" value={String(getVal(v, "youtube_id"))} onChange={e => field(v.id, "youtube_id", e.target.value)} placeholder="YouTube URL oder Video-ID" />
                          <input className="a-input" value={String(getVal(v, "description") || "")} onChange={e => field(v.id, "description", e.target.value)} placeholder="Beschreibung (optional)" />
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

// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminUpdate, adminDelete, adminUpdateMany } from "@/lib/adminDb";
import ImgUploadField from "@/components/admin/ImgUploadField";

const SLUG      = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";
const PAGE_SLUG = "media";

interface Evt   { id: string; site_id: string | null; name: string; date: string; location: string | null; link: string | null; visible: boolean | null; position: number | null; created_at: string | null; }
interface Video { id: string; site_id: string | null; youtube_url: string; title: string | null; position: number | null; created_at: string | null; }

function getYtId(input: string) {
  const m = input?.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? input;
}

// ─── Seitentext ───────────────────────────────────────────────────
function SeitentextSection({ siteId, supabase, toast }) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [pageId, setPageId]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!siteId) return;
    (async () => {
      const { data: page } = await supabase.from("pages").select("id,content").eq("site_id", siteId).eq("slug", PAGE_SLUG).single();
      setPageId(page?.id ?? null);
      const c = (page?.content as Record<string, string>) ?? {};
      setContent({ text_top: c.text_top ?? "", video_text: c.video_text ?? "", image_main: c.image_main ?? "" });
      setLoading(false);
    })();
  }, [siteId]);

  const setField = (key, val) => { setContent(c => ({ ...c, [key]: val })); setIsDirty(true); };

  const saveImgField = async (key, url) => {
    const updated = { ...content, [key]: url };
    if (pageId) {
      await adminUpdate("pages", pageId, { content: updated });
    } else {
      const { data } = await adminInsert("pages", { site_id: siteId, slug: PAGE_SLUG, content: updated });
      if (data?.id) setPageId(data.id);
    }
    toast("Bild gespeichert", "success");
  };

  const save = async () => {
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

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        {isDirty && <span className="a-unsaved" style={{ marginRight: 8 }}><span className="a-unsaved-dot" />Ungespeichert</span>}
        <button className="a-btn a-btn-primary a-btn-sm" onClick={save} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
      </div>
      <div className="a-card">
        <div className="a-field">
          <label className="a-label">Text oben (Hero)</label>
          <textarea className="a-textarea" rows={4} value={content.text_top ?? ""} onChange={e => setField("text_top", e.target.value)} />
        </div>
        <div className="a-field">
          <label className="a-label">Text unter erstem Video</label>
          <textarea className="a-textarea" rows={3} value={content.video_text ?? ""} onChange={e => setField("video_text", e.target.value)} placeholder="Kurzer Text, der unter dem ersten Video erscheint…" />
        </div>
        <div className="a-field">
          <label className="a-label">Bild unten (Social-Bereich)</label>
          <ImgUploadField
            pageSlug={PAGE_SLUG}
            value={content.image_main ?? ""}
            onChange={url => setField("image_main", url)}
            onAutoSave={url => saveImgField("image_main", url)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Social ───────────────────────────────────────────────────────
const SOCIAL_PLATFORMS = [
  { key: "facebook",  label: "Facebook URL",  placeholder: "https://www.facebook.com/…" },
  { key: "instagram", label: "Instagram URL", placeholder: "https://www.instagram.com/…" },
  { key: "youtube",   label: "YouTube URL",   placeholder: "https://www.youtube.com/@…" },
];

function SocialSection({ siteId, supabase, toast }) {
  const [urls, setUrls]   = useState<Record<string, string>>({ facebook: "", instagram: "", youtube: "" });
  const [ids, setIds]     = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!siteId) return;
    supabase.from("social_links").select("*").eq("site_id", siteId).then(({ data }) => {
      const urlMap = { facebook: "", instagram: "", youtube: "" };
      const idMap  = {};
      (data ?? []).forEach(l => {
        if (urlMap.hasOwnProperty(l.platform)) { urlMap[l.platform] = l.url; idMap[l.platform] = l.id; }
      });
      setUrls(urlMap); setIds(idMap); setLoading(false);
    });
  }, [siteId]);

  const setUrl = (platform, val) => { setUrls(u => ({ ...u, [platform]: val })); setIsDirty(true); };

  const save = async () => {
    setSaving(true);
    await Promise.all(SOCIAL_PLATFORMS.map(async ({ key }, i) => {
      const url = urls[key];
      const id  = ids[key];
      if (id) {
        await adminUpdate("social_links", id, { url });
      } else {
        const { data } = await adminInsert("social_links", { site_id: siteId, platform: key, url, position: i });
        if (data?.id) setIds(p => ({ ...p, [key]: data.id }));
      }
    }));
    setSaving(false); setIsDirty(false); toast("Gespeichert", "success");
  };

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        {isDirty && <span className="a-unsaved" style={{ marginRight: 8 }}><span className="a-unsaved-dot" />Ungespeichert</span>}
        <button className="a-btn a-btn-primary a-btn-sm" onClick={save} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
      </div>
      <div className="a-card">
        {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
          <div key={key} className="a-field">
            <label className="a-label">{label}</label>
            <input className="a-input" value={urls[key]} onChange={e => setUrl(key, e.target.value)} placeholder={placeholder} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Events ───────────────────────────────────────────────────────
function EventsSection({ siteId, supabase, toast }) {
  const [events, setEvents] = useState<Evt[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMap, setEditMap] = useState<Record<string, Partial<Evt>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (!siteId) return;
    supabase.from("events").select("*").eq("site_id", siteId).order("date").then(({ data }) => {
      setEvents(data ?? []); setLoading(false);
    });
  }, [siteId]);

  const field = (id, key, val) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const get = (e, key) => editMap[e.id]?.[key] !== undefined ? editMap[e.id][key] : e[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length) { const { error } = await adminUpdateMany("events", updates); if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; } }
    const { data } = await supabase.from("events").select("*").eq("site_id", siteId).order("date");
    setEvents(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false); toast("Gespeichert", "success");
  };

  const addEvent = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await adminInsert("events", { site_id: siteId, name: "Neues Event", date: today, location: "", link: "", visible: true, position: events.length });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setEvents(p => [...p, data]); toast("Event erstellt", "success"); }
  };

  const deleteEvent = async (id) => {
    if (!confirm("Event löschen?")) return;
    const { error } = await adminDelete("events", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setEvents(p => p.filter(e => e.id !== id)); toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...events]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setEvents(r); await adminUpdateMany("events", r.map((e, i) => ({ id: e.id, position: i })));
  };

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
        {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
        <button className="a-btn a-btn-ghost a-btn-sm" onClick={addEvent}><MdAdd size={14} />Neu</button>
        <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
      </div>
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
                        <td><input className="a-input" type="date" value={String(get(e, "date"))} onChange={ev => field(e.id, "date", ev.target.value)} style={{ width: 140 }} /></td>
                        <td><input className="a-input" value={String(get(e, "name"))} onChange={ev => field(e.id, "name", ev.target.value)} /></td>
                        <td><input className="a-input" value={String(get(e, "location") || "")} onChange={ev => field(e.id, "location", ev.target.value)} placeholder="Ort" style={{ width: 130 }} /></td>
                        <td><input className="a-input" value={String(get(e, "link") || "")} onChange={ev => field(e.id, "link", ev.target.value)} placeholder="https://…" style={{ width: 160 }} /></td>
                        <td><label className="a-toggle"><input type="checkbox" checked={Boolean(get(e, "visible"))} onChange={ev => field(e.id, "visible", ev.target.checked)} /><span className="a-toggle-track"><span className="a-toggle-thumb" /></span></label></td>
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
    </div>
  );
}

// ─── Videos ───────────────────────────────────────────────────────
function VideosSection({ siteId, supabase, toast }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMap, setEditMap] = useState<Record<string, Partial<Video>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (!siteId) return;
    supabase.from("media_videos").select("*").eq("site_id", siteId).order("position").then(({ data }) => {
      setVideos(data ?? []); setLoading(false);
    });
  }, [siteId]);

  const field = (id, key, val) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const get = (v, key) => editMap[v.id]?.[key] !== undefined ? editMap[v.id][key] : v[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length) { const { error } = await adminUpdateMany("media_videos", updates); if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; } }
    const { data } = await supabase.from("media_videos").select("*").eq("site_id", siteId).order("position");
    setVideos(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false); toast("Gespeichert", "success");
  };

  const addVideo = async () => {
    const { data, error } = await adminInsert("media_videos", { site_id: siteId, youtube_url: "", title: "Neues Video", position: videos.length });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setVideos(p => [...p, data]); toast("Hinzugefügt", "success"); }
  };

  const deleteVideo = async (id) => {
    if (!confirm("Video löschen?")) return;
    const { error } = await adminDelete("media_videos", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setVideos(p => p.filter(v => v.id !== id)); toast("Gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...videos]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setVideos(r); await adminUpdateMany("media_videos", r.map((v, i) => ({ id: v.id, position: i })));
  };

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
        {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
        <button className="a-btn a-btn-ghost a-btn-sm" onClick={addVideo}><MdAdd size={14} />Neu</button>
        <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="videos">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {videos.map((v, i) => {
                const ytId = getYtId(String(get(v, "youtube_url")));
                return (
                  <Draggable key={v.id} draggableId={v.id} index={i}>
                    {(p) => (
                      <div ref={p.innerRef} {...p.draggableProps} className="a-card" style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 0 }}>
                        <span className="a-drag-handle" style={{ marginTop: 8 }} {...p.dragHandleProps}><MdDragIndicator /></span>
                        {ytId && <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" className="a-video-thumb" />}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                          <input className="a-input" value={String(get(v, "title") || "")} onChange={e => field(v.id, "title", e.target.value)} placeholder="Titel (leer = automatisch von YouTube)" />
                          <input className="a-input" value={String(get(v, "youtube_url"))} onChange={e => field(v.id, "youtube_url", e.target.value)} placeholder="YouTube URL (https://youtu.be/…)" />
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
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
export default function MediaAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [siteId, setSiteId] = useState("");
  const [tab, setTab] = useState<"seitentext" | "termine" | "videos" | "social">("termine");

  useEffect(() => {
    supabase.from("sites").select("id").eq("slug", SLUG).single().then(({ data }) => {
      if (data) setSiteId(data.id);
    });
  }, []);

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Media &amp; News</h1>
      </div>
      <div className="a-tabs" style={{ marginBottom: 20 }}>
        <button className={`a-tab${tab === "termine"    ? " active" : ""}`} onClick={() => setTab("termine")}>Termine</button>
        <button className={`a-tab${tab === "videos"     ? " active" : ""}`} onClick={() => setTab("videos")}>Videos</button>
        <button className={`a-tab${tab === "seitentext" ? " active" : ""}`} onClick={() => setTab("seitentext")}>Seitentext</button>
        <button className={`a-tab${tab === "social"     ? " active" : ""}`} onClick={() => setTab("social")}>Social</button>
      </div>
      {tab === "termine"    && <EventsSection     siteId={siteId} supabase={supabase} toast={toast} />}
      {tab === "videos"     && <VideosSection     siteId={siteId} supabase={supabase} toast={toast} />}
      {tab === "seitentext" && <SeitentextSection siteId={siteId} supabase={supabase} toast={toast} />}
      {tab === "social"     && <SocialSection     siteId={siteId} supabase={supabase} toast={toast} />}
    </>
  );
}

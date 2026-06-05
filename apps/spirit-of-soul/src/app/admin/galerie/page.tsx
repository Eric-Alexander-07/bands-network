// @ts-nocheck
"use client";
import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdDelete, MdUpload, MdClose } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
interface Img { id: string; site_id: string; src: string; alt: string | null; credit: string | null; position: number; category: string | null; created_at: string; }
interface Preview { file: File; url: string; alt: string; credit: string; }

export default function GalerieAdmin() {
  const { toast }   = useToast();
  const supabase    = createClient();
  const fileRef     = useRef<HTMLInputElement>(null);
  const [images, setImages]   = useState<Img[]>([]);
  const [siteId, setSiteId]   = useState("");
  const [loading, setLoading] = useState(true);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editMap, setEditMap] = useState<Record<string, Partial<Img>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data } = await supabase.from("media_images").select("*").eq("site_id", site.id).order("position");
      setImages(data ?? []);
      setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Img, val: string) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const getVal = (img: Img, key: keyof Img) => editMap[img.id]?.[key] !== undefined ? editMap[img.id][key] : img[key];

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newPreviews = files.map(f => ({ file: f, url: URL.createObjectURL(f), alt: f.name.replace(/\.[^.]+$/, ""), credit: "" }));
    setPreviews(p => [...p, ...newPreviews]);
    if (e.target) e.target.value = "";
  };

  const uploadAll = async () => {
    if (!previews.length) return;
    setUploading(true);
    try {
      const newImgs: Img[] = [];
      for (const prev of previews) {
        const formData = new FormData();
        formData.append("file", prev.file);
        formData.append("path", `${SLUG}/galerie`);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const { url, error } = await res.json() as { url?: string; error?: string };
        if (error || !url) { toast(`Upload fehlgeschlagen: ${error}`, "error"); continue; }
        const { data } = await supabase.from("media_images")
          .insert({ site_id: siteId, src: url, alt: prev.alt, credit: prev.credit || null, position: images.length + newImgs.length, category: "gallery" })
          .select().single();
        if (data) newImgs.push(data as Img);
      }
      setImages(p => [...p, ...newImgs]);
      setPreviews([]);
      toast(`${newImgs.length} Bild(er) hochgeladen`, "success");
    } finally { setUploading(false); }
  };

  const saveEdits = async () => {
    setSaving(true);
    await Promise.all(Object.entries(editMap).map(([id, c]) => supabase.from("media_images").update(c).eq("id", id)));
    setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const deleteImage = async (img: Img) => {
    if (!confirm("Bild löschen?")) return;
    try {
      const url = new URL(img.src);
      const path = url.pathname.replace(/.*\/storage\/v1\/object\/public\/images\//, "");
      await supabase.storage.from("images").remove([path]);
    } catch { /* ignore storage errors */ }
    await supabase.from("media_images").delete().eq("id", img.id);
    setImages(p => p.filter(i => i.id !== img.id));
    toast("Bild gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...images]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setImages(r);
    await Promise.all(r.map((img, i) => supabase.from("media_images").update({ position: i }).eq("id", img.id)));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Galerie</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          {isDirty && <button className="a-btn a-btn-primary a-btn-sm" onClick={saveEdits} disabled={saving}>{saving ? "…" : "Speichern"}</button>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => fileRef.current?.click()}><MdUpload size={14} />Hochladen</button>
          <input ref={fileRef} type="file" multiple accept="image/jpg,image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={onFileSelect} />
        </div>
      </div>

      {previews.length > 0 && (
        <div className="a-card" style={{ marginBottom: 20 }}>
          <p className="a-card-title">Vorschau — {previews.length} Bild(er)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {previews.map((prev, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img src={prev.url} alt="" style={{ width: 80, height: 52, objectFit: "cover", borderRadius: 4, border: "1px solid var(--a-border)", flexShrink: 0 }} />
                <input className="a-input" value={prev.alt} onChange={e => setPreviews(p => p.map((x, j) => j === i ? { ...x, alt: e.target.value } : x))} placeholder="Alt-Text" style={{ flex: 2 }} />
                <input className="a-input" value={prev.credit} onChange={e => setPreviews(p => p.map((x, j) => j === i ? { ...x, credit: e.target.value } : x))} placeholder="Foto-Credit" style={{ flex: 1 }} />
                <button className="a-btn a-btn-danger a-btn-sm" onClick={() => setPreviews(p => p.filter((_, j) => j !== i))}><MdClose size={14} /></button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="a-btn a-btn-primary" onClick={uploadAll} disabled={uploading}>{uploading ? "Hochladen …" : "Alle hochladen"}</button>
            <button className="a-btn a-btn-ghost" onClick={() => setPreviews([])}>Abbrechen</button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="galerie">
          {(prov) => (
            <table className="a-table" ref={prov.innerRef} {...prov.droppableProps}>
              <thead><tr><th style={{ width: 28 }} /><th>Bild</th><th>Alt-Text</th><th>Credit</th><th>Kategorie</th><th /></tr></thead>
              <tbody>
                {images.map((img, i) => (
                  <Draggable key={img.id} draggableId={img.id} index={i}>
                    {(p) => (
                      <tr ref={p.innerRef} {...p.draggableProps}>
                        <td><span className="a-drag-handle" {...p.dragHandleProps}><MdDragIndicator /></span></td>
                        <td><img src={img.src} alt={img.alt ?? ""} className="a-img-preview" /></td>
                        <td><input className="a-input" value={String(getVal(img, "alt") || "")} onChange={e => field(img.id, "alt", e.target.value)} placeholder="Alt-Text" /></td>
                        <td><input className="a-input" value={String(getVal(img, "credit") || "")} onChange={e => field(img.id, "credit", e.target.value)} placeholder="Fotograf" /></td>
                        <td><input className="a-input" value={String(getVal(img, "category") || "")} onChange={e => field(img.id, "category", e.target.value)} placeholder="gallery" style={{ width: 100 }} /></td>
                        <td><button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteImage(img)}><MdDelete size={14} /></button></td>
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

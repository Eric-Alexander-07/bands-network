// @ts-nocheck
"use client";
import { useEffect, useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { useSiteId } from "../AdminSite";
import { MdDelete, MdClose } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminDelete, adminUpdateMany } from "@/lib/adminDb";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "adams-family";
interface Img { id: string; site_id: string | null; url: string; caption: string | null; credit: string | null; position: number | null; created_at: string | null; }
interface UploadItem { id: string; file: File; objectUrl: string; progress: "pending" | "uploading" | "done" | "error"; error?: string; }

// Resize images > 2 MB to max 2000px long side (JPEG 88 %) before upload.
// Keeps files well below Vercel's serverless body limit (4.5 MB).
async function resizeForUpload(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024) return file;
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 2000;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        if (w >= h) { h = Math.round(h * MAX / w); w = MAX; }
        else         { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }));
          else resolve(file);
        },
        "image/jpeg", 0.88
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
    img.src = objectUrl;
  });
}

export default function GalerieAdmin() {
  const { toast }   = useToast();
  const supabase    = createClient();
  const fileRef     = useRef<HTMLInputElement>(null);
  const [images, setImages]         = useState<Img[]>([]);
  // Site-ID kommt aus dem Admin-Layout — eine Abfrage weniger pro Aufruf.
  const siteId                      = useSiteId() ?? "";
  const [loading, setLoading]       = useState(true);
  const [queue, setQueue]           = useState<UploadItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const uploadingRef = useRef(false);
  const imagesRef    = useRef(images);
  useEffect(() => { imagesRef.current = images; }, [images]);

  useEffect(() => {
    if (!siteId) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("media_images").select("*").eq("site_id", siteId).order("position");
      if (cancelled) return;
      setImages(data ?? []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
    // `supabase` ist ein Singleton aus createClient() und aendert sich nicht.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  // Auto-upload pending items one by one
  useEffect(() => {
    if (uploadingRef.current || !siteId) return;
    const pending = queue.filter(i => i.progress === "pending");
    if (!pending.length) return;
    uploadingRef.current = true;
    (async () => {
      for (const item of pending) {
        setQueue(q => q.map(x => x.id === item.id ? { ...x, progress: "uploading" } : x));
        const resized = await resizeForUpload(item.file);
        const formData = new FormData();
        formData.append("file", resized);
        formData.append("path", `${SLUG}/galerie`);
        try {
          const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
          let json: { url?: string; error?: string };
          try { json = await res.json(); }
          catch { json = { error: `Serverfehler ${res.status}` }; }
          const { url, error } = json;
          if (error || !url) throw new Error(error ?? "Upload fehlgeschlagen");
          const { data, error: dbErr } = await adminInsert("media_images", {
            site_id: siteId, url,
            caption: item.file.name.replace(/\.[^.]+$/, ""),
            credit: null,
            position: imagesRef.current.length,
          });
          if (dbErr) throw new Error(dbErr);
          setImages(p => [...p, data]);
          setQueue(q => q.map(x => x.id === item.id ? { ...x, progress: "done" } : x));
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Fehler";
          setQueue(q => q.map(x => x.id === item.id ? { ...x, progress: "error", error: msg } : x));
          toast(`Upload fehlgeschlagen: ${msg}`, "error");
        }
      }
      uploadingRef.current = false;
      setTimeout(() => setQueue(q => q.filter(x => x.progress !== "done")), 1500);
    })();
  }, [queue, siteId]);

  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter(f => {
      const type = f.type.toLowerCase();
      const ext  = f.name.split(".").pop()?.toLowerCase() ?? "";
      const okType = ["image/jpeg","image/jpg","image/png","image/webp","image/avif"].includes(type);
      const okExt  = ["jpg","jpeg","png","webp","avif"].includes(ext);
      return okType || okExt;
    });
    if (!valid.length) { toast("Keine gültigen Bilder (JPG/PNG/WebP/AVIF)", "error"); return; }
    const items: UploadItem[] = valid.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f, objectUrl: URL.createObjectURL(f), progress: "pending",
    }));
    setQueue(q => [...q, ...items]);
  }, [toast]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [addFiles]);

  const deleteImage = async (img: Img) => {
    if (!confirm("Bild löschen?")) return;
    try {
      const urlObj = new URL(img.url);
      const path = decodeURIComponent(urlObj.pathname.replace(/.*\/storage\/v1\/object\/public\/images\//, ""));
      await supabase.storage.from("images").remove([path]);
    } catch { /* ignore storage errors */ }
    const { error } = await adminDelete("media_images", img.id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setImages(p => p.filter(i => i.id !== img.id));
    toast("Bild gelöscht", "info");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...images];
    const [m] = r.splice(result.source.index, 1);
    r.splice(result.destination.index, 0, m);
    setImages(r);
    await adminUpdateMany("media_images", r.map((img, i) => ({ id: img.id, position: i })));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Galerie</h1>
      </div>

      {/* Drop Zone */}
      <div
        className={`a-dropzone${isDragOver ? " a-dropzone--over" : ""}`}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          style={{ display: "none" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            addFiles(Array.from(e.target.files ?? []));
            if (e.target) e.target.value = "";
          }}
        />
        <svg className="a-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15V3M12 3L8 7M12 3l4 4"/>
          <path d="M3 20h18"/>
        </svg>
        <p className="a-dropzone-title">Bilder ablegen oder klicken zum Auswählen</p>
        <p className="a-dropzone-sub">JPG · PNG · WebP · AVIF — max. 10 MB pro Bild</p>
      </div>

      {/* Upload queue */}
      {queue.length > 0 && (
        <div className="a-upload-queue">
          {queue.map(item => (
            <div key={item.id} className={`a-upload-item a-upload-item--${item.progress}`}>
              <img src={item.objectUrl} alt="" className="a-upload-thumb" />
              <span className="a-upload-name">{item.file.name}</span>
              <span className="a-upload-status">
                {item.progress === "pending"   && "Wartet…"}
                {item.progress === "uploading" && <span className="admin-spinner" style={{ marginRight: 0 }} />}
                {item.progress === "done"      && "✓"}
                {item.progress === "error"     && `✗ ${item.error ?? "Fehler"}`}
              </span>
              {item.progress === "error" && (
                <button className="a-upload-remove" onClick={() => setQueue(q => q.filter(x => x.id !== item.id))}>
                  <MdClose size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="a-gallery-meta">
        <span>{images.length} Bild{images.length !== 1 ? "er" : ""}</span>
        {images.length > 1 && <span>· Zum Umsortieren ziehen</span>}
      </div>

      {/* Image grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="galerie" direction="horizontal">
          {(prov) => (
            <div className="a-gallery-grid" ref={prov.innerRef} {...prov.droppableProps}>
              {images.map((img, i) => (
                <Draggable key={img.id} draggableId={img.id} index={i}>
                  {(p, snap) => (
                    <div
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className={`a-gallery-item${snap.isDragging ? " a-gallery-item--dragging" : ""}`}
                    >
                      <img src={img.url} alt={img.caption ?? ""} className="a-gallery-img" loading="lazy" />
                      <span className="a-gallery-num">{i + 1}</span>
                      <button
                        className="a-gallery-del"
                        onClick={e => { e.stopPropagation(); deleteImage(img); }}
                        title="Löschen"
                      >
                        <MdDelete size={13} />
                      </button>
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

// @ts-nocheck
"use client";
import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete, MdUpload } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
interface Product { id: string; site_id: string; title: string; description: string | null; price: string | null; features: string[] | null; visible: boolean; position: number; image_url: string | null; category: string | null; created_at: string; }

export default function ProdukteAdmin() {
  const { toast }   = useToast();
  const supabase    = createClient();
  const fileRefs    = useRef<Record<string, HTMLInputElement | null>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [siteId, setSiteId]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [editMap, setEditMap]   = useState<Record<string, Partial<Product>>>({});
  const [isDirty, setIsDirty]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: site } = await supabase.from("sites").select("id").eq("slug", SLUG).single();
      if (!site) return;
      setSiteId(site.id);
      const { data } = await supabase.from("products").select("*").eq("site_id", site.id).order("position");
      setProducts(data ?? []); setLoading(false);
    })();
  }, []);

  const field = (id: string, key: keyof Product, val: string | boolean) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const getVal = (p: Product, key: keyof Product) => editMap[p.id]?.[key] !== undefined ? editMap[p.id][key] : p[key];

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(Object.entries(editMap).map(([id, c]) => supabase.from("products").update(c).eq("id", id)));
    const { data } = await supabase.from("products").select("*").eq("site_id", siteId).order("position");
    setProducts(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addProduct = async () => {
    const { data } = await supabase.from("products").insert({ site_id: siteId, title: "Neues Produkt", description: "", price: "", features: [], visible: true, position: products.length, image_url: null, category: "" }).select().single();
    if (data) { setProducts(p => [...p, data as Product]); toast("Erstellt", "success"); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Produkt löschen?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts(p => p.filter(x => x.id !== id));
    toast("Gelöscht", "info");
  };

  const uploadImage = async (productId: string, file: File) => {
    setUploading(productId);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", `${SLUG}/produkte`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const { url, error } = await res.json() as { url?: string; error?: string };
    setUploading(null);
    if (error || !url) { toast("Upload fehlgeschlagen", "error"); return; }
    field(productId, "image_url", url);
    toast("Bild hochgeladen", "success");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...products]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setProducts(r);
    await Promise.all(r.map((p, i) => supabase.from("products").update({ position: i }).eq("id", p.id)));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" />Lade …</div>;

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Produkte</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
          <button className="a-btn a-btn-ghost a-btn-sm" onClick={addProduct}><MdAdd size={14} />Neu</button>
          <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="products">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {products.map((p, i) => (
                <Draggable key={p.id} draggableId={p.id} index={i}>
                  {(dp) => (
                    <div ref={dp.innerRef} {...dp.draggableProps} className="a-card" style={{ marginBottom: 0 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span className="a-drag-handle" style={{ marginTop: 8 }} {...dp.dragHandleProps}><MdDragIndicator /></span>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          {getVal(p, "image_url") ? (
                            <img src={String(getVal(p, "image_url"))} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, border: "1px solid var(--a-border)" }} />
                          ) : (
                            <div
                              style={{ width: 80, height: 80, background: "var(--a-surface3)", borderRadius: 6, border: "2px dashed var(--a-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                              onClick={() => fileRefs.current[p.id]?.click()}
                            >
                              <MdUpload style={{ color: "var(--a-muted)" }} size={20} />
                            </div>
                          )}
                          <input
                            type="file"
                            ref={el => { fileRefs.current[p.id] = el; }}
                            style={{ display: "none" }} accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) uploadImage(p.id, f); }}
                          />
                          {uploading === p.id && (
                            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div className="admin-spinner" style={{ marginRight: 0 }} />
                            </div>
                          )}
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <input className="a-input" value={String(getVal(p, "title"))} onChange={e => field(p.id, "title", e.target.value)} placeholder="Titel" style={{ flex: 2 }} />
                            <input className="a-input" value={String(getVal(p, "price") || "")} onChange={e => field(p.id, "price", e.target.value)} placeholder="Preis" style={{ width: 90 }} />
                            <label className="a-toggle">
                              <input type="checkbox" checked={Boolean(getVal(p, "visible"))} onChange={e => field(p.id, "visible", e.target.checked)} />
                              <span className="a-toggle-track"><span className="a-toggle-thumb" /></span>
                            </label>
                          </div>
                          <textarea className="a-textarea" rows={2} value={String(getVal(p, "description") || "")} onChange={e => field(p.id, "description", e.target.value)} placeholder="Beschreibung" />
                        </div>
                        <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteProduct(p.id)}><MdDelete size={14} /></button>
                      </div>
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

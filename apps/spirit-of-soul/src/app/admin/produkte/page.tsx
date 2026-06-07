// @ts-nocheck
"use client";
import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { createClient } from "@bands/supabase/client";
import { MdDragIndicator, MdAdd, MdDelete, MdUpload } from "react-icons/md";
import { useToast } from "@/components/admin/Toast";
import { adminInsert, adminDelete, adminUpdate, adminUpdateMany } from "@/lib/adminDb";
import ImgUploadField from "@/components/admin/ImgUploadField";

const SLUG      = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";
const PAGE_SLUG = "shop";

interface Product {
  id: string; site_id: string | null;
  name: string; description: string | null;
  price: string | null; image_url: string | null; image_url_back: string | null;
  tag: string | null; subtitle: string | null; email_subject: string | null;
  position: number | null; visible: boolean | null; created_at: string | null;
}

async function uploadImg(file: File, productId: string, slot: "front" | "back"): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", "products");
  formData.append("path", `${SLUG}/${slot}`);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const { url, error } = await res.json();
  if (error || !url) return null;
  return url;
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
      setContent({ text_top: c.text_top ?? "", text_body: c.text_body ?? "", image_main: c.image_main ?? "" });
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
          <label className="a-label">Infotext (mehrzeilig)</label>
          <textarea className="a-textarea" rows={8} value={content.text_body ?? ""} onChange={e => setField("text_body", e.target.value)} />
        </div>
        <div className="a-field">
          <label className="a-label">Hero-Bild</label>
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

// ─── Produkte ─────────────────────────────────────────────────────
function ProdukteSection({ siteId, supabase, toast }) {
  const frontRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const backRefs  = useRef<Record<string, HTMLInputElement | null>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editMap, setEditMap]   = useState<Record<string, Partial<Product>>>({});
  const [isDirty, setIsDirty]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!siteId) return;
    supabase.from("products").select("*").eq("site_id", siteId).order("position").then(({ data }) => {
      setProducts(data ?? []); setLoading(false);
    });
  }, [siteId]);

  const field = (id, key, val) => { setEditMap(m => ({ ...m, [id]: { ...m[id], [key]: val } })); setIsDirty(true); };
  const get = (p, key) => editMap[p.id]?.[key] !== undefined ? editMap[p.id][key] : p[key];

  const saveAll = async () => {
    setSaving(true);
    const updates = Object.entries(editMap).map(([id, c]) => ({ id, ...c }));
    if (updates.length > 0) {
      const { error } = await adminUpdateMany("products", updates);
      if (error) { toast(`Fehler: ${error}`, "error"); setSaving(false); return; }
    }
    const { data } = await supabase.from("products").select("*").eq("site_id", siteId).order("position");
    setProducts(data ?? []); setEditMap({}); setIsDirty(false); setSaving(false);
    toast("Gespeichert", "success");
  };

  const addProduct = async () => {
    const { data, error } = await adminInsert("products", {
      site_id: siteId, name: "Neues Produkt", description: "",
      tag: "", subtitle: "", price: "15,00 EUR", email_subject: "Bestellung:",
      visible: true, position: products.length, image_url: null, image_url_back: null,
    });
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    if (data) { setProducts(p => [...p, data as Product]); toast("Erstellt", "success"); }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Produkt löschen?")) return;
    const { error } = await adminDelete("products", id);
    if (error) { toast(`Fehler: ${error}`, "error"); return; }
    setProducts(p => p.filter(x => x.id !== id));
    toast("Gelöscht", "info");
  };

  const handleImageUpload = async (p, slot, file) => {
    const key = `${p.id}-${slot}`;
    setUploading(u => ({ ...u, [key]: true }));
    const url = await uploadImg(file, p.id, slot);
    setUploading(u => ({ ...u, [key]: false }));
    if (!url) { toast("Upload fehlgeschlagen", "error"); return; }
    const dbKey = slot === "front" ? "image_url" : "image_url_back";
    await adminUpdate("products", p.id, { [dbKey]: url });
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, [dbKey]: url } : x));
    toast("Bild hochgeladen", "success");
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const r = [...products]; const [m] = r.splice(result.source.index, 1); r.splice(result.destination.index, 0, m);
    setProducts(r);
    await adminUpdateMany("products", r.map((x, i) => ({ id: x.id, position: i })));
    toast("Reihenfolge gespeichert", "success");
  };

  if (loading) return <div className="admin-loading" style={{ minHeight: "unset" }}><div className="admin-spinner" />Lade …</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
        {isDirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Ungespeichert</span>}
        <button className="a-btn a-btn-ghost a-btn-sm" onClick={addProduct}><MdAdd size={14} />Neu</button>
        <button className="a-btn a-btn-primary a-btn-sm" onClick={saveAll} disabled={saving || !isDirty}>{saving ? "…" : "Speichern"}</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="products">
          {(prov) => (
            <div ref={prov.innerRef} {...prov.droppableProps} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {products.map((p, i) => (
                <Draggable key={p.id} draggableId={p.id} index={i}>
                  {(dp) => (
                    <div ref={dp.innerRef} {...dp.draggableProps} className="a-card" style={{ marginBottom: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span className="a-drag-handle" {...dp.dragHandleProps}><MdDragIndicator /></span>
                        <span style={{ fontSize: 13, fontWeight: 600, flex: 1, color: "var(--a-text2)" }}>{String(get(p, "name"))}</span>
                        <label className="a-toggle" title="Sichtbar">
                          <input type="checkbox" checked={Boolean(get(p, "visible"))} onChange={e => field(p.id, "visible", e.target.checked)} />
                          <span className="a-toggle-track"><span className="a-toggle-thumb" /></span>
                        </label>
                        <button className="a-btn a-btn-danger a-btn-sm" onClick={() => deleteProduct(p.id)}><MdDelete size={14} /></button>
                      </div>

                      <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                          {(["front", "back"] as const).map(slot => {
                            const imgKey = slot === "front" ? "image_url" : "image_url_back";
                            const label  = slot === "front" ? "VORDERSEITE" : "RÜCKSEITE";
                            const imgUrl = String(get(p, imgKey) ?? "");
                            const busy   = !!uploading[`${p.id}-${slot}`];
                            const ref    = slot === "front" ? frontRefs : backRefs;
                            return (
                              <div key={slot} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                                <div
                                  style={{ width: 100, height: 100, borderRadius: 7, border: `2px dashed var(--a-border)`, background: "var(--a-surface3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", position: "relative", flexShrink: 0 }}
                                  onClick={() => ref.current[p.id]?.click()}
                                >
                                  {imgUrl
                                    ? <img src={imgUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <MdUpload size={22} style={{ color: "var(--a-muted)" }} />
                                  }
                                  {busy && (
                                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                      <div className="admin-spinner" style={{ marginRight: 0 }} />
                                    </div>
                                  )}
                                </div>
                                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a-muted)" }}>{label}</span>
                                <input
                                  type="file" accept="image/*"
                                  style={{ display: "none" }}
                                  ref={el => { ref.current[p.id] = el; }}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleImageUpload(p, slot, f);
                                    if (e.target) e.target.value = "";
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <div className="a-field" style={{ flex: 1, marginBottom: 0 }}>
                              <label className="a-label">Tag / Kategorie</label>
                              <input className="a-input" value={String(get(p, "tag") ?? "")} onChange={e => field(p.id, "tag", e.target.value)} placeholder="z.B. T-Shirt · Schwarz" />
                            </div>
                            <div className="a-field" style={{ width: 100, marginBottom: 0 }}>
                              <label className="a-label">Preis</label>
                              <input className="a-input" value={String(get(p, "price") ?? "")} onChange={e => field(p.id, "price", e.target.value)} placeholder="15,00 EUR" />
                            </div>
                          </div>
                          <div className="a-field" style={{ marginBottom: 0 }}>
                            <label className="a-label">Name</label>
                            <input className="a-input" value={String(get(p, "name"))} onChange={e => field(p.id, "name", e.target.value)} placeholder="Produktname" />
                          </div>
                          <div className="a-field" style={{ marginBottom: 0 }}>
                            <label className="a-label">Untertitel</label>
                            <input className="a-input" value={String(get(p, "subtitle") ?? "")} onChange={e => field(p.id, "subtitle", e.target.value)} placeholder="z.B. 2000–2020 · 20 Years Live" />
                          </div>
                          <div className="a-field" style={{ marginBottom: 0 }}>
                            <label className="a-label">Beschreibung</label>
                            <textarea className="a-textarea" rows={4} value={String(get(p, "description") ?? "")} onChange={e => field(p.id, "description", e.target.value)} placeholder="Produktbeschreibung…" />
                          </div>
                          <div className="a-field" style={{ marginBottom: 0 }}>
                            <label className="a-label">E-Mail Betreff (Bestellbutton)</label>
                            <input className="a-input" value={String(get(p, "email_subject") ?? "")} onChange={e => field(p.id, "email_subject", e.target.value)} placeholder="Bestellung: Produkt XY" />
                          </div>
                        </div>
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
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
export default function ProdukteAdmin() {
  const { toast } = useToast();
  const supabase  = createClient();
  const [siteId, setSiteId] = useState("");
  const [tab, setTab] = useState<"produkte" | "seitentext">("produkte");

  useEffect(() => {
    supabase.from("sites").select("id").eq("slug", SLUG).single().then(({ data }) => {
      if (data) setSiteId(data.id);
    });
  }, []);

  return (
    <>
      <div className="a-section-header">
        <h1 className="a-section-title">Shop</h1>
      </div>
      <div className="a-tabs" style={{ marginBottom: 20 }}>
        <button className={`a-tab${tab === "produkte"   ? " active" : ""}`} onClick={() => setTab("produkte")}>Produkte</button>
        <button className={`a-tab${tab === "seitentext" ? " active" : ""}`} onClick={() => setTab("seitentext")}>Seitentext</button>
      </div>
      {tab === "produkte"   && <ProdukteSection   siteId={siteId} supabase={supabase} toast={toast} />}
      {tab === "seitentext" && <SeitentextSection siteId={siteId} supabase={supabase} toast={toast} />}
    </>
  );
}

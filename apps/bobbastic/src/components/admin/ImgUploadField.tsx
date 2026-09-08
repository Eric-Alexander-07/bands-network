// @ts-nocheck
"use client";
import { useRef, useState } from "react";
import { useToast } from "@/components/admin/Toast";

interface Props {
  pageSlug: string;
  value: string;
  onChange: (url: string) => void;
  onAutoSave: (url: string) => Promise<void>;
}

// Compress images > 2 MB to stay safely under Vercel's 4.5 MB API body limit.
async function compressForUpload(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024) return file;
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1600;
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
        "image/jpeg", 0.85
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
    img.src = objectUrl;
  });
}

export default function ImgUploadField({ pageSlug, value, onChange, onAutoSave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const compressed = await compressForUpload(file);
      const fd = new FormData();
      fd.append("file", compressed);
      fd.append("bucket", "images");
      fd.append("path", `pages/${pageSlug}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      let json: { url?: string; error?: string };
      try { json = await res.json(); }
      catch { json = { error: `Serverfehler ${res.status}` }; }
      if (!res.ok || json.error || !json.url) {
        toast(`Upload fehlgeschlagen: ${json.error ?? res.statusText}`, "error");
        return;
      }
      onChange(json.url);
      await onAutoSave(json.url);
    } catch (e) {
      toast(`Upload fehlgeschlagen: ${e instanceof Error ? e.message : "Netzwerkfehler"}`, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="a-img-field">
      {value ? (
        <div className="a-img-field-preview">
          <img src={value} alt="" />
          <button
            className="a-img-field-change a-btn a-btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Speichert…" : "Bild ändern"}
          </button>
        </div>
      ) : (
        <div
          className="a-img-field-empty"
          onClick={() => !uploading && inputRef.current?.click()}
        >
          {uploading ? "Speichert…" : "+ Bild hochladen"}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}

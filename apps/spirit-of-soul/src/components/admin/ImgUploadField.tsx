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

export default function ImgUploadField({ pageSlug, value, onChange, onAutoSave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast("Datei zu groß (max. 10 MB)", "error");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
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

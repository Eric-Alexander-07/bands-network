// @ts-nocheck
"use client";
import { useRef, useState } from "react";

interface Props {
  pageSlug: string;
  value: string;
  onChange: (url: string) => void;
  onAutoSave: (url: string) => Promise<void>;
}

export default function ImgUploadField({ pageSlug, value, onChange, onAutoSave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "images");
      fd.append("path", `pages/${pageSlug}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) {
        onChange(json.url);
        await onAutoSave(json.url);
      }
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

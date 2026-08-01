"use client";

import { useRef, useState } from "react";
import { compressForUpload, uploadImage } from "./adminDb";
import { useToast } from "./Toast";

interface Props {
  value: string;
  onChange: (url: string) => void;
  /** Wird direkt nach dem Upload aufgerufen, damit die URL nicht verloren geht. */
  onAutoSave?: (url: string) => Promise<void> | void;
  /** Ablageordner im Storage-Bucket, z. B. "pages/home". */
  path?: string;
  bucket?: string;
}

/**
 * Bildfeld mit Upload. Der Wert ist eine URL — entweder ein Pfad aus
 * `/public/images` (Auslieferungszustand) oder eine Storage-URL nach dem
 * ersten Upload. Beides funktioniert direkt als `src`.
 */
export default function ImageField({
  value, onChange, onAutoSave, path = "uploads", bucket = "images",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const compressed = await compressForUpload(file);
      const { url, error } = await uploadImage(compressed, { bucket, path });
      if (error || !url) {
        toast(`Upload fehlgeschlagen: ${error ?? "unbekannter Fehler"}`, "error");
        return;
      }
      onChange(url);
      await onAutoSave?.(url);
    } catch (e) {
      toast(`Upload fehlgeschlagen: ${e instanceof Error ? e.message : "Netzwerkfehler"}`, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="a-img-field">
      {value ? (
        <div className="a-img-field-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" />
          <button
            type="button"
            className="a-img-field-change a-btn a-btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Lädt…" : "Bild ändern"}
          </button>
        </div>
      ) : (
        <div
          className="a-img-field-empty"
          onClick={() => !uploading && inputRef.current?.click()}
        >
          {uploading ? "Lädt…" : "+ Bild hochladen"}
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

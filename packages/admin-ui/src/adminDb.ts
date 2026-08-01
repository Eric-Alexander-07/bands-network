/**
 * Schreibzugriffe des Admin-Bereichs.
 *
 * Alle Mutationen laufen ueber `/api/admin/db`. Diese Route nutzt den
 * Service-Role-Key (umgeht RLS), prueft die Tabelle gegen eine Allowlist und
 * invalidiert anschliessend den Cache-Tag `site-bundle` sowie alle
 * oeffentlichen Routen.
 */

async function call(body: object) {
  const res = await fetch("/api/admin/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<{ data?: unknown; error?: string; success?: boolean }>;
}

export const adminInsert = (table: string, data: object) =>
  call({ table, operation: "insert", data });

export const adminUpdate = (table: string, id: string, data: object) =>
  call({ table, operation: "update", id, data });

export const adminUpdateMany = (table: string, updates: Array<{ id: string } & object>) =>
  call({ table, operation: "update_many", updates });

export const adminDelete = (table: string, id: string) =>
  call({ table, operation: "delete", id });

export const adminDeleteWhere = (table: string, column: string, value: string) =>
  call({ table, operation: "delete_where", column, value });

export const adminUpsert = (table: string, data: object) =>
  call({ table, operation: "upsert", data });

/** Bild hochladen und die oeffentliche URL zurueckgeben. */
export async function uploadImage(
  file: File,
  opts: { bucket?: string; path?: string } = {}
): Promise<{ url?: string; error?: string }> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("bucket", opts.bucket ?? "images");
  fd.append("path", opts.path ?? "uploads");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  try {
    const json = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || json.error || !json.url) {
      return { error: json.error ?? `Serverfehler ${res.status}` };
    }
    return { url: json.url };
  } catch {
    return { error: `Serverfehler ${res.status}` };
  }
}

/**
 * Grosse Bilder vor dem Upload verkleinern — Vercel begrenzt den Request-Body
 * auf 4,5 MB. Kleine Dateien werden unveraendert durchgereicht.
 */
export async function compressForUpload(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024) return file;
  return new Promise(resolve => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1600;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        if (w >= h) { h = Math.round((h * MAX) / w); w = MAX; }
        else        { w = Math.round((w * MAX) / h); h = MAX; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }));
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
    img.src = objectUrl;
  });
}

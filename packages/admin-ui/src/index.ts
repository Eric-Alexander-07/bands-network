/**
 * Gemeinsame Admin-Bausteine aller Bandseiten.
 *
 * Die Oberflaeche entsteht aus dem Content-Schema der jeweiligen Band
 * (`src/config/contentSchema.ts`). Neue Felder oder Listen erfordern deshalb
 * nur eine Aenderung an dieser Schema-Datei, nicht an den Admin-Seiten.
 */

export { default as ContentForm } from "./ContentForm";
export { default as ListEditor } from "./ListEditor";
export { default as ImageField } from "./ImageField";
export { ToastProvider, useToast } from "./Toast";
export {
  adminInsert,
  adminUpdate,
  adminUpdateMany,
  adminDelete,
  adminDeleteWhere,
  adminUpsert,
  uploadImage,
  compressForUpload,
} from "./adminDb";

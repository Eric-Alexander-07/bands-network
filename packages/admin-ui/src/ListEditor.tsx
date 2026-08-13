"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@bands/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ListField, ListSpec } from "@bands/content";

/**
 * Der Listen-Editor spricht Tabellen an, deren Namen erst zur Laufzeit aus dem
 * Schema kommen. Ein an `Database` gebundener Client kann das nicht abbilden
 * (`from(string)` ist dort nicht zulaessig), deshalb hier bewusst ein
 * ungetypter Client. Die Schreibpfade sind serverseitig durch die Allowlist in
 * `/api/admin/db` abgesichert.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dynamicClient = () => createClient() as unknown as SupabaseClient<any, "public", any>;
import { adminDelete, adminInsert, adminUpdate, adminUpdateMany } from "./adminDb";
import ImageField from "./ImageField";
import { useToast } from "./Toast";

type Row = Record<string, unknown> & { id: string; position?: number | null; visible?: boolean | null };

interface Props {
  spec: ListSpec;
  siteId: string;
}

/** Ein Eingabefeld einer Listenzeile. */
function RowField({
  field, value, onChange, uploadPath,
}: {
  field: ListField;
  value: unknown;
  onChange: (v: unknown) => void;
  uploadPath: string;
}) {
  const str = typeof value === "string" ? value : value == null ? "" : String(value);

  if (field.type === "image") {
    return <ImageField value={str} path={uploadPath} onChange={onChange} />;
  }
  if (field.type === "boolean") {
    const on = value !== false;
    return (
      <button
        type="button"
        className={`a-toggle${on ? " a-toggle--on" : ""}`}
        onClick={() => onChange(!on)}
        aria-pressed={on}
        title={field.label}
      >
        <span className="a-toggle-track"><span className="a-toggle-thumb" /></span>
      </button>
    );
  }
  if (field.type === "select") {
    return (
      <select className="a-select" value={str} onChange={e => onChange(e.target.value)}>
        {(field.options ?? []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        className="a-textarea"
        rows={field.rows ?? 3}
        placeholder={field.placeholder}
        value={str}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      className="a-input"
      type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
      placeholder={field.placeholder}
      value={str}
      onChange={e => onChange(e.target.value)}
    />
  );
}

/**
 * Generischer Listen-Editor fuer Tabellen mit `position` (und optional
 * `visible`). Deckt sowohl flache Listen (Termine, Referenzen, Saenger …)
 * als auch zweistufige Listen (Gruppe -> Eintraege) ab.
 *
 * Reihenfolge wird per Drag & Drop geaendert und sofort gespeichert,
 * Textaenderungen werden gesammelt und mit "Speichern" geschrieben.
 */
export default function ListEditor({ spec, siteId }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [children, setChildren] = useState<Record<string, Row[]>>({});
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = dynamicClient();
    let q = supabase.from(spec.table).select("*").eq("site_id", siteId);
    if (spec.filter) q = q.eq(spec.filter.column, spec.filter.value);
    const { data } = await q.order("position", { ascending: true });
    const parents = (data ?? []) as Row[];
    setRows(parents);

    if (spec.child && parents.length) {
      const { data: kids } = await supabase
        .from(spec.child.table)
        .select("*")
        .in(spec.child.foreignKey, parents.map(p => p.id))
        .order("position", { ascending: true });
      const grouped: Record<string, Row[]> = {};
      for (const k of (kids ?? []) as Row[]) {
        const key = String(k[spec.child.foreignKey]);
        (grouped[key] ??= []).push(k);
      }
      setChildren(grouped);
    }
    setDirty(false);
    setLoading(false);
  }, [spec, siteId]);

  useEffect(() => { void load(); }, [load]);

  // ── Zeilen bearbeiten ──────────────────────────────────────────
  function editRow(id: string, key: string, value: unknown) {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, [key]: value } : r)));
    setDirty(true);
  }
  function editChild(parentId: string, id: string, key: string, value: unknown) {
    setChildren(prev => ({
      ...prev,
      [parentId]: (prev[parentId] ?? []).map(r => (r.id === id ? { ...r, [key]: value } : r)),
    }));
    setDirty(true);
  }

  async function addRow() {
    if (spec.maxItems !== undefined && rows.length >= spec.maxItems) return;
    const payload: Record<string, unknown> = {
      site_id: siteId,
      position: rows.length,
      ...(spec.filter ? { [spec.filter.column]: spec.filter.value } : {}),
      ...(spec.newRow ?? {}),
    };
    const res = await adminInsert(spec.table, payload);
    if (res.error) return toast(`Fehler: ${res.error}`, "error");
    setRows(prev => [...prev, res.data as Row]);
  }

  async function addChild(parentId: string) {
    if (!spec.child) return;
    const list = children[parentId] ?? [];
    const res = await adminInsert(spec.child.table, {
      [spec.child.foreignKey]: parentId,
      position: list.length,
      ...(spec.child.newRow ?? {}),
    });
    if (res.error) return toast(`Fehler: ${res.error}`, "error");
    setChildren(prev => ({ ...prev, [parentId]: [...list, res.data as Row] }));
  }

  async function removeRow(id: string) {
    if (!confirm("Diesen Eintrag wirklich löschen?")) return;
    // Kindeintraege zuerst entfernen — die Tabellen haben zwar ON DELETE
    // CASCADE, aeltere Zeilen koennten aber ohne angelegt worden sein.
    if (spec.child) {
      for (const k of children[id] ?? []) await adminDelete(spec.child.table, k.id);
    }
    const res = await adminDelete(spec.table, id);
    if (res.error) return toast(`Fehler: ${res.error}`, "error");
    setRows(prev => prev.filter(r => r.id !== id));
    toast("Gelöscht");
  }

  async function removeChild(parentId: string, id: string) {
    if (!spec.child) return;
    const res = await adminDelete(spec.child.table, id);
    if (res.error) return toast(`Fehler: ${res.error}`, "error");
    setChildren(prev => ({ ...prev, [parentId]: (prev[parentId] ?? []).filter(r => r.id !== id) }));
  }

  // ── Reihenfolge (Drag & Drop, sofort gespeichert) ──────────────
  // Natives HTML5-Drag&Drop feuert auf Touch-Geraeten (Smartphone/Tablet)
  // keine Events — dafuer zusaetzlich Auf/Ab-Buttons als Fallback, die
  // ueberall funktionieren (siehe moveRow/moveChild unten).
  async function dropOn(target: number) {
    if (dragIdx === null || dragIdx === target) return;
    const next = [...rows];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(target, 0, moved!);
    setRows(next);
    setDragIdx(null);
    await adminUpdateMany(spec.table, next.map((r, i) => ({ id: r.id, position: i })));
  }

  async function moveRow(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    const moved = next[idx]!;
    next[idx] = next[target]!;
    next[target] = moved;
    setRows(next);
    await adminUpdateMany(spec.table, next.map((r, i) => ({ id: r.id, position: i })));
  }

  async function moveChild(parentId: string, idx: number, dir: -1 | 1) {
    const list = children[parentId] ?? [];
    const target = idx + dir;
    if (target < 0 || target >= list.length || !spec.child) return;
    const next = [...list];
    const moved = next[idx]!;
    next[idx] = next[target]!;
    next[target] = moved;
    setChildren(prev => ({ ...prev, [parentId]: next }));
    await adminUpdateMany(spec.child.table, next.map((r, i) => ({ id: r.id, position: i })));
  }

  async function save() {
    setSaving(true);
    try {
      const editable = spec.fields.map(f => f.key);
      await adminUpdateMany(
        spec.table,
        rows.map(r => {
          const patch: Record<string, unknown> = { id: r.id };
          for (const k of editable) patch[k] = r[k] ?? null;
          if (spec.hasVisible) patch.visible = r.visible !== false;
          return patch as { id: string };
        })
      );
      if (spec.child) {
        const kids = Object.values(children).flat();
        if (kids.length) {
          const ckeys = spec.child.fields.map(f => f.key);
          await adminUpdateMany(
            spec.child.table,
            kids.map(r => {
              const patch: Record<string, unknown> = { id: r.id };
              for (const k of ckeys) patch[k] = r[k] ?? null;
              return patch as { id: string };
            })
          );
        }
      }
      setDirty(false);
      toast("Gespeichert");
    } catch (e) {
      toast(`Fehler: ${e instanceof Error ? e.message : String(e)}`, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const max = spec.maxItems;
  const atLimit = max !== undefined && rows.length >= max;

  return (
    <div className="a-card">
      <div className="a-section-header" style={{ marginBottom: 12 }}>
        <div>
          <p className="a-card-title" style={{ marginBottom: 2 }}>{spec.title}</p>
          {spec.description && <p className="a-muted-text">{spec.description}</p>}
          {max !== undefined && (
            <p className="a-muted-text">
              {rows.length} / {max} {max === 1 ? "Bild" : "Einträge"}
              {atLimit && " — Maximum erreicht"}
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {dirty && <span className="a-unsaved"><span className="a-unsaved-dot" />Nicht gespeichert</span>}
          {!atLimit && (
            <button className="a-btn a-btn-ghost a-btn-sm" onClick={addRow}>+ Neu</button>
          )}
          <button className="a-btn a-btn-primary a-btn-sm" onClick={save} disabled={saving || !dirty}>
            {saving ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>

      {rows.length === 0 && <p className="a-muted-text">Noch keine Einträge.</p>}

      {rows.map((row, idx) => (
        <div
          key={row.id}
          className="a-list-row"
          draggable
          onDragStart={() => setDragIdx(idx)}
          onDragOver={e => e.preventDefault()}
          onDrop={() => dropOn(idx)}
        >
          <div className="a-list-order">
            <span className="a-drag-handle" title="Zum Sortieren ziehen">⠿</span>
            <button
              type="button" className="a-order-btn" disabled={idx === 0}
              onClick={() => moveRow(idx, -1)} aria-label="Nach oben verschieben"
            >▲</button>
            <button
              type="button" className="a-order-btn" disabled={idx === rows.length - 1}
              onClick={() => moveRow(idx, 1)} aria-label="Nach unten verschieben"
            >▼</button>
          </div>

          <div className="a-list-fields">
            {spec.fields.map(f => (
              <div key={f.key} className="a-list-field" style={{ flex: f.flex ?? 1 }}>
                <span className="a-list-field-label">{f.label}</span>
                <RowField
                  field={f}
                  value={row[f.key]}
                  onChange={v => editRow(row.id, f.key, v)}
                  uploadPath={`lists/${spec.table}`}
                />
              </div>
            ))}
          </div>

          <div className="a-list-actions">
            {spec.hasVisible && (
              <button
                type="button"
                className={`a-toggle${row.visible !== false ? " a-toggle--on" : ""}`}
                title={row.visible !== false ? "Sichtbar" : "Ausgeblendet"}
                onClick={() => editRow(row.id, "visible", row.visible === false)}
              >
                <span className="a-toggle-track"><span className="a-toggle-thumb" /></span>
              </button>
            )}
            <button className="a-btn a-btn-danger a-btn-sm" onClick={() => removeRow(row.id)}>
              Löschen
            </button>
          </div>

          {spec.child && (
            <div className="a-list-children">
              <div className="a-list-children-head">
                <span className="a-list-field-label">{spec.child.title}</span>
                <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => addChild(row.id)}>
                  + Eintrag
                </button>
              </div>
              {(children[row.id] ?? []).map((kid, kidIdx) => {
                const kids = children[row.id] ?? [];
                return (
                  <div key={kid.id} className="a-list-child">
                    <div className="a-list-order">
                      <button
                        type="button" className="a-order-btn" disabled={kidIdx === 0}
                        onClick={() => moveChild(row.id, kidIdx, -1)} aria-label="Nach oben verschieben"
                      >▲</button>
                      <button
                        type="button" className="a-order-btn" disabled={kidIdx === kids.length - 1}
                        onClick={() => moveChild(row.id, kidIdx, 1)} aria-label="Nach unten verschieben"
                      >▼</button>
                    </div>
                    {spec.child!.fields.map(f => (
                      <div key={f.key} className="a-list-field" style={{ flex: f.flex ?? 1 }}>
                        <RowField
                          field={f}
                          value={kid[f.key]}
                          onChange={v => editChild(row.id, kid.id, f.key, v)}
                          uploadPath={`lists/${spec.child!.table}`}
                        />
                      </div>
                    ))}
                    <button
                      className="a-btn a-btn-danger a-btn-sm"
                      onClick={() => removeChild(row.id, kid.id)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Einzelne Zeile nachtraeglich patchen (z. B. aus anderen Editoren heraus). */
export async function patchRow(table: string, id: string, data: object) {
  return adminUpdate(table, id, data);
}

/**
 * Admin DB helpers — all mutations go through /api/admin/db
 * which uses the service role key to bypass RLS and triggers
 * revalidateTag so the Next.js cache is invalidated automatically.
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

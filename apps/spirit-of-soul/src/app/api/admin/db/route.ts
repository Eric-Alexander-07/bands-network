import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type Operation = "insert" | "update" | "delete" | "upsert" | "update_many";

interface MutateBody {
  table: string;
  operation: Operation;
  data?: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
  // For update_many: array of { id, ...changes }
  updates?: Array<{ id: string } & Record<string, unknown>>;
}

export async function POST(request: NextRequest) {
  // Verify authenticated user
  const cookieStore = await cookies();
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Service role bypasses RLS for admin operations
  const service = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body: MutateBody = await request.json();
  const { table, operation, data, id, updates } = body;

  if (!table || !operation) {
    return NextResponse.json({ error: "Missing table or operation" }, { status: 400 });
  }

  try {
    if (operation === "insert") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: result, error } = await service.from(table).insert(data as any).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ data: result });
    }

    if (operation === "update") {
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: result, error } = await service.from(table).update(data as any).eq("id", id).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ data: result });
    }

    if (operation === "update_many") {
      // Update multiple rows by id
      if (!updates?.length) return NextResponse.json({ data: [] });
      const results = await Promise.all(
        updates.map(({ id: rowId, ...changes }) =>
          service.from(table).update(changes).eq("id", rowId)
        )
      );
      const err = results.find(r => r.error);
      if (err?.error) return NextResponse.json({ error: err.error.message }, { status: 400 });
      return NextResponse.json({ data: "ok" });
    }

    if (operation === "delete") {
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      const { error } = await service.from(table).delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true });
    }

    if (operation === "upsert") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: result, error } = await service.from(table).upsert(data as any).select();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ data: result });
    }

    return NextResponse.json({ error: "Unknown operation" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

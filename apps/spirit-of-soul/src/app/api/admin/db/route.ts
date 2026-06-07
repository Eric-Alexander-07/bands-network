import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidateTag, revalidatePath } from "next/cache";

type Operation = "insert" | "update" | "delete" | "delete_where" | "upsert" | "update_many";

interface MutateBody {
  table: string;
  operation: Operation;
  data?: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
  column?: string;
  value?: string;
  updates?: Array<{ id: string } & Record<string, unknown>>;
}

// Map DB table names to Next.js cache tags
const TAG_MAP: Record<string, string> = {
  sites:               "site",
  pages:               "pages",
  events:              "events",
  media_images:        "media-images",
  media_videos:        "media-videos",
  products:            "products",
  referenzen:          "referenzen",
  besetzung_gruppen:   "besetzung",
  besetzung_eintraege: "besetzung",
  social_links:        "social-links",
};

// Map DB table names to public page paths to revalidate (Full Route Cache)
const PATH_MAP: Record<string, string[]> = {
  pages:               ["/about", "/services", "/media", "/shop"],
  events:              ["/media"],
  media_videos:        ["/media"],
  media_images:        ["/galerie"],
  products:            ["/shop"],
  referenzen:          ["/referenzen"],
  besetzung_gruppen:   ["/services"],
  besetzung_eintraege: ["/services"],
  social_links:        ["/"],
};

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
  const { table, operation, data, id, column, value, updates } = body;

  if (!table || !operation) {
    return NextResponse.json({ error: "Missing table or operation" }, { status: 400 });
  }

  try {
    let result: NextResponse;

    if (operation === "insert") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row, error } = await service.from(table).insert(data as any).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      result = NextResponse.json({ data: row });
    }

    else if (operation === "update") {
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row, error } = await service.from(table).update(data as any).eq("id", id).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      result = NextResponse.json({ data: row });
    }

    else if (operation === "update_many") {
      if (!updates?.length) return NextResponse.json({ data: [] });
      const results = await Promise.all(
        updates.map(({ id: rowId, ...changes }) =>
          service.from(table).update(changes).eq("id", rowId)
        )
      );
      const err = results.find(r => r.error);
      if (err?.error) return NextResponse.json({ error: err.error.message }, { status: 400 });
      result = NextResponse.json({ data: "ok" });
    }

    else if (operation === "delete") {
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      const { error } = await service.from(table).delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      result = NextResponse.json({ success: true });
    }

    else if (operation === "delete_where") {
      if (!column || value === undefined) return NextResponse.json({ error: "Missing column or value" }, { status: 400 });
      const { error } = await service.from(table).delete().eq(column, value);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      result = NextResponse.json({ success: true });
    }

    else if (operation === "upsert") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row, error } = await service.from(table).upsert(data as any).select();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      result = NextResponse.json({ data: row });
    }

    else {
      return NextResponse.json({ error: "Unknown operation" }, { status: 400 });
    }

    // Invalidate Next.js Data Cache + Full Route Cache after successful mutation
    const tag = TAG_MAP[table];
    if (tag) revalidateTag(tag);

    const paths = PATH_MAP[table];
    if (paths) paths.forEach(p => revalidatePath(p));

    return result;
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

export async function POST() {
  const cookieStore = await cookies();

  // Verify user is authenticated
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()     { return cookieStore.getAll(); },
        setAll(list) { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options as never)); },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use service role to bypass RLS and insert into site_admins
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: site } = await admin.from("sites").select("id").eq("slug", SITE_SLUG).single();
  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  const { error } = await admin
    .from("site_admins")
    .upsert({ user_id: user.id, site_id: site.id, role: "admin" }, { onConflict: "user_id,site_id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

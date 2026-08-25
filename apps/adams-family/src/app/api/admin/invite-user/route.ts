import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  // Verify caller is an authenticated admin of this site
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(list: { name: string; value: string; options?: Record<string, unknown> }[]) {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options as never));
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: site } = await adminClient.from("sites").select("id").eq("slug", SITE_SLUG).single();
  if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

  const { data: callerAdmin } = await adminClient
    .from("site_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("site_id", site.id)
    .single();

  if (!callerAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get email from request body
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  // Build the redirectTo URL — use the request origin so it works on any deploy
  const origin = new URL(request.url).origin;
  const redirectTo = `${origin}/auth/callback`;

  // Send invite via Admin API → PKCE flow → ?code= in the email link
  const { error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo,
  });

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

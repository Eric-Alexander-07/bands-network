import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code       = searchParams.get("code");       // PKCE flow (modern Supabase default)
  const token_hash = searchParams.get("token_hash"); // OTP/magic-link flow (legacy)
  const type       = searchParams.get("type");

  const cookieStore = await cookies();
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

  let userId: string | null = null;

  if (code) {
    // PKCE flow — exchange auth code for session
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && session) userId = session.user.id;
  } else if (token_hash && type) {
    // OTP / magic-link flow
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as any });
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    }
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_token", origin));
  }

  // Check if this user already completed invite setup (exists in site_admins)
  // → if yes: go straight to admin dashboard
  // → if no:  show the set-password / invite-completion page
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: site } = await adminClient
    .from("sites").select("id").eq("slug", SITE_SLUG).single();

  const { data: existingAdmin } = site
    ? await adminClient
        .from("site_admins")
        .select("user_id")
        .eq("user_id", userId)
        .eq("site_id", site.id)
        .single()
    : { data: null };

  const dest = existingAdmin ? "/admin" : "/admin/invite";
  return NextResponse.redirect(new URL(dest, origin));
}

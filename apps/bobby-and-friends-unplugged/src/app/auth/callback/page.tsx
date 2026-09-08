"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@bands/supabase/client";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

function CallbackHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handle() {
      // Create the client inside useEffect so the hash is read synchronously
      // before Supabase's detectSessionInUrl can clear it asynchronously.
      const supabase = createClient();

      const code = searchParams.get("code");

      if (code) {
        // ── PKCE flow: ?code= in query string (sent when redirectTo is explicit) ──
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          window.location.href = "/admin/login?error=expired";
          return;
        }
      } else {
        // ── Implicit flow: #access_token= in URL hash (Supabase dashboard invites) ──
        const hash         = window.location.hash.substring(1);
        const params       = new URLSearchParams(hash);
        const accessToken  = params.get("access_token");
        const refreshToken = params.get("refresh_token") ?? "";

        if (!accessToken) {
          window.location.href = "/admin/login?error=no_token";
          return;
        }

        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        if (error) {
          window.location.href = "/admin/login?error=expired";
          return;
        }
      }

      // ── Check if this user is already set up as a site admin ──
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/admin/login?error=no_user";
        return;
      }

      const { data: site } = await supabase
        .from("sites").select("id").eq("slug", SITE_SLUG).single<{ id: string }>();

      const { data: admin } = site
        ? await supabase
            .from("site_admins")
            .select("user_id")
            .eq("user_id", user.id)
            .eq("site_id", site.id)
            .single<{ user_id: string }>()
        : { data: null };

      // Use full reload so Safari properly reads the newly set session cookies
      window.location.href = admin ? "/admin" : "/admin/invite";
    }

    handle();
  }, [searchParams]);

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "#f5f1ea", flexDirection: "column", gap: 12,
    }}>
      <div style={{
        width: 28, height: 28, border: "2px solid #c9a96e",
        borderTopColor: "transparent", borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Wird geladen …</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#f5f1ea",
      }} />
    }>
      <CallbackHandler />
    </Suspense>
  );
}

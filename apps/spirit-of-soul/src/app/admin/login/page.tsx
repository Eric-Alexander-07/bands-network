"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createClient } from "@bands/supabase/client";
import "../admin.css";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

export default function AdminLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Supabase auto-detects #access_token in the URL hash and clears it before
    // we can read it. Listening to onAuthStateChange catches the resulting
    // SIGNED_IN event so we can redirect invite users to /admin/invite instead
    // of leaving them stuck on the login form.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== "SIGNED_IN" || !session) return;

      // Check if this user is already an admin for this site
      const { data: site } = await supabase
        .from("sites").select("id").eq("slug", SITE_SLUG).single<{ id: string }>();

      const { data: admin } = site
        ? await supabase
            .from("site_admins")
            .select("user_id")
            .eq("user_id", session.user.id)
            .eq("site_id", site.id)
            .single<{ user_id: string }>()
        : { data: null };

      window.location.href = admin ? "/admin" : "/admin/invite";
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
    if (authError) {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
    }
    // Redirect is handled by onAuthStateChange above
  };

  return (
    <div className="admin-root" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "var(--a-bg)",
    }}>
      <div style={{ width: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="a-dot" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--a-text)" }}>Spirit of Soul</span>
          </div>
          <p style={{ color: "var(--a-muted)", fontSize: 13, margin: 0 }}>Admin-Bereich</p>
        </div>

        <div className="a-card">
          <form onSubmit={handleSubmit}>
            <div className="a-field">
              <label className="a-label">E-Mail</label>
              <input
                className="a-input" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                required autoComplete="email" placeholder="ihre@email.de"
              />
            </div>
            <div className="a-field">
              <label className="a-label">Passwort</label>
              <input
                className="a-input" type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                required autoComplete="current-password" placeholder="••••••••"
              />
            </div>
            {error && <p style={{ color: "var(--a-error)", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              className="a-btn a-btn-primary"
              type="submit" disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Anmelden …" : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

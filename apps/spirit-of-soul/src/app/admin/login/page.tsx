"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createClient } from "@bands/supabase/client";
import "../admin.css";

export default function AdminLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // If an invite link lands here instead of the homepage, redirect to /admin/invite
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const params = new URLSearchParams(hash.slice(1));
    if (params.get("type") === "invite" && params.get("access_token")) {
      window.location.replace("/admin/invite" + hash);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
    if (authError) {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
    } else {
      // Hard navigation ensures Supabase session cookies are sent with the new request
      window.location.href = "/admin";
    }
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

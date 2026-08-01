"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@bands/supabase/client";
import "../admin.css";

export default function AdminLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
    if (authError) {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
    } else {
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
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--a-text)" }}>WE ROCK</span>
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

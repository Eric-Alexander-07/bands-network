"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createClient } from "@bands/supabase/client";
import "../admin.css";

export default function AdminInvite() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) window.location.href = "/admin/login?error=invalid_token";
      else setChecking(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwörter stimmen nicht überein."); return; }
    if (password.length < 8)  { setError("Passwort muss mindestens 8 Zeichen haben."); return; }

    setLoading(true);
    setError("");

    const { error: updErr } = await createClient().auth.updateUser({ password });
    if (updErr) { setError(updErr.message); setLoading(false); return; }

    const res = await fetch("/api/admin/accept-invite", { method: "POST" });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? "Fehler beim Einrichten des Accounts.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  if (checking) return (
    <div className="admin-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--a-bg)" }}>
      <div className="admin-spinner" />
    </div>
  );

  return (
    <div className="admin-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--a-bg)" }}>
      <div style={{ width: 380 }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="a-dot" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--a-text)" }}>Spirit of Soul</span>
          </div>
          <p style={{ color: "var(--a-muted)", fontSize: 13, margin: 0 }}>Admin-Zugang aktivieren</p>
        </div>

        <div className="a-card">
          <p style={{ color: "var(--a-text2)", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
            Willkommen! Lege jetzt ein Passwort fest, um deinen Admin-Zugang zu aktivieren.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="a-field">
              <label className="a-label">Passwort</label>
              <input
                className="a-input" type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                required minLength={8} autoComplete="new-password"
                placeholder="Mindestens 8 Zeichen"
              />
            </div>
            <div className="a-field">
              <label className="a-label">Passwort bestätigen</label>
              <input
                className="a-input" type="password" value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required autoComplete="new-password"
                placeholder="Passwort wiederholen"
              />
            </div>
            {error && (
              <p style={{ color: "var(--a-error)", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}
            <button
              className="a-btn a-btn-primary"
              type="submit" disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Wird aktiviert …" : "Zugang aktivieren"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

// Supabase sends invite emails using the implicit flow, which puts the access
// token in the URL hash (e.g. /#access_token=...&type=invite). Hash fragments
// are never sent to the server, so the callback route never sees them. This
// component runs on every public page and immediately redirects invite links
// to /admin/invite where the token is consumed client-side.
export default function InviteHashHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const params = new URLSearchParams(hash.slice(1));
    if (params.get("type") === "invite" && params.get("access_token")) {
      if (!window.location.pathname.startsWith("/admin/invite")) {
        window.location.replace("/admin/invite" + hash);
      }
    }
  }, []);
  return null;
}

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@bands/supabase/client";
import type { User } from "@supabase/supabase-js";
import "./admin.css";
import { ToastProvider } from "@bands/admin-ui";
import { contentSchema } from "@/config/contentSchema";
import { MdDashboard, MdImage, MdArticle, MdLogout } from "react-icons/md";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";

type NavSection = { section: string };
type NavItem    = { href: string; label: string; Icon: React.ComponentType<{ size?: number }> };
type NavEntry   = NavSection | NavItem;

/**
 * Die Navigation entsteht aus dem Content-Schema: jede dort deklarierte Seite
 * bekommt automatisch ihren Eintrag. Eine neue Seite erfordert daher keine
 * Aenderung an diesem Layout.
 */
const NAV: NavEntry[] = [
  { href: "/admin", label: "Dashboard", Icon: MdDashboard },
  { section: "Inhalte" },
  ...contentSchema.pages.map(p => ({
    href: `/admin/inhalte/${p.slug}`,
    label: p.title,
    Icon: MdArticle,
  })),
  { section: "Medien" },
  { href: "/admin/galerie", label: "Galerie (Upload)", Icon: MdImage },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login" || pathname === "/admin/invite";
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Login page handles itself — no auth check needed
    if (isLogin) { setLoading(false); return; }

    const supabase = createClient();
    (async () => {
     try {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) { router.replace("/admin/login"); return; }

      // site_admins check — only blocks if site row AND admin table exist and user is missing.
      // During initial setup (empty DB), we let any authenticated user through.
      try {
        const { data: site } = await supabase
          .from("sites").select("id").eq("slug", SLUG).single<{ id: string }>();
        if (site) {
          const { data: admin } = await supabase
            .from("site_admins")
            .select("user_id")
            .eq("user_id", u.id)
            .eq("site_id", site.id)
            .single<{ user_id: string }>();
          if (!admin) {
            await supabase.auth.signOut();
            router.replace("/admin/login");
            return;
          }
        }
      } catch {
        // Tables not yet populated — allow authenticated user through
      }
      setUser(u);
      setLoading(false);
     } catch (e) {
      // Ohne diesen Zweig bliebe die Seite dauerhaft im Ladezustand haengen,
      // ohne dass irgendwo ein Hinweis auf die Ursache auftaucht.
      setAuthError(e instanceof Error ? e.message : String(e));
      setLoading(false);
     }
    })();
  }, [router, isLogin]);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.replace("/admin/login");
  };

  // Login page: render children directly, no sidebar/auth chrome
  if (isLogin) return <>{children}</>;

  if (loading) {
    return (
      <div className="admin-root">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Wird geladen …
        </div>
      </div>
    );
  }

  // Sichtbare Fehlermeldung statt endlosem Spinner, wenn die Anmeldepruefung
  // fehlschlaegt (z. B. Supabase nicht erreichbar).
  if (authError) {
    return (
      <div className="admin-root">
        <div className="admin-content">
          <div className="a-card">
            <p className="a-card-title">Anmeldung konnte nicht geprüft werden</p>
            <p className="a-muted-text">{authError}</p>
            <button className="a-btn a-btn-primary" style={{ marginTop: 14 }}
                    onClick={() => window.location.reload()}>
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <ToastProvider>
      <div className="admin-root">
        <div className="admin-shell">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-logo">
              <strong>
                <span className="a-dot" />
                WE ROCK
              </strong>
              <p>Admin</p>
            </div>
            <nav className="admin-nav">
              {NAV.map((entry, i) => {
                if ("section" in entry) {
                  return <span key={`s-${i}`} className="admin-nav-section">{entry.section}</span>;
                }
                const { href, label, Icon } = entry;
                const active = href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`admin-nav-item${active ? " active" : ""}`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="admin-sidebar-footer">
              <div className="admin-user">
                <div className="admin-user-avatar">{initials}</div>
                <span className="admin-user-email">{user?.email}</span>
              </div>
              <button className="admin-logout-btn" onClick={handleLogout}>
                <MdLogout size={13} /> Abmelden
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="admin-main">
            <div className="admin-content">{children}</div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@bands/supabase/client";
import type { User } from "@supabase/supabase-js";
import "./admin.css";
import { ToastProvider } from "@/components/admin/Toast";
import {
  MdDashboard, MdArticle, MdEvent, MdImage, MdPlayCircle,
  MdShoppingBag, MdStar, MdGroup, MdShare, MdLogout,
} from "react-icons/md";

const SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "spirit-of-soul";

const NAV = [
  { href: "/admin",            label: "Dashboard",  Icon: MdDashboard  },
  { href: "/admin/seiten",     label: "Seiten",      Icon: MdArticle    },
  { href: "/admin/events",     label: "Events",      Icon: MdEvent      },
  { href: "/admin/galerie",    label: "Galerie",     Icon: MdImage      },
  { href: "/admin/videos",     label: "Videos",      Icon: MdPlayCircle },
  { href: "/admin/produkte",   label: "Produkte",    Icon: MdShoppingBag},
  { href: "/admin/referenzen", label: "Referenzen",  Icon: MdStar       },
  { href: "/admin/besetzung",  label: "Besetzung",   Icon: MdGroup      },
  { href: "/admin/social",     label: "Social",      Icon: MdShare      },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Login page handles itself — no auth check needed
    if (isLogin) { setLoading(false); return; }

    const supabase = createClient();
    (async () => {
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
                Spirit of Soul
              </strong>
              <p>Admin</p>
            </div>
            <nav className="admin-nav">
              {NAV.map(({ href, label, Icon }) => {
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

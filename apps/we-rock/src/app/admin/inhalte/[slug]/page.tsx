"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@bands/supabase/client";
import { ContentForm, ListEditor } from "@bands/admin-ui";
import { contentSchema } from "@/config/contentSchema";
import { SITE_SLUG } from "@/lib/site";

/**
 * Eine Route fuer alle Inhaltsseiten.
 *
 * Welche Felder und Listen erscheinen, steht ausschliesslich im
 * Content-Schema der Band (`src/config/contentSchema.ts`). Diese Datei muss
 * fuer neue Felder nicht angefasst werden.
 */
export default function AdminContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const page = contentSchema.pages.find(p => p.slug === slug);

  const [siteId, setSiteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("sites").select("id").eq("slug", SITE_SLUG).maybeSingle();
      if (cancelled) return;
      setSiteId(data?.id ?? null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  if (!page) notFound();

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /></div>;
  }

  if (!siteId) {
    return (
      <div className="a-card">
        <p className="a-card-title">Website nicht gefunden</p>
        <p className="a-muted-text">
          In der Datenbank existiert kein Eintrag mit dem Kürzel <code>{SITE_SLUG}</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      <ContentForm page={page} siteId={siteId} />
      {page.lists?.map(spec => (
        <ListEditor key={spec.key} spec={spec} siteId={siteId} />
      ))}
    </>
  );
}

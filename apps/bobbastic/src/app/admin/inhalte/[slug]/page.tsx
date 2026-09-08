"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ContentForm, ListEditor } from "@bands/admin-ui";
import { contentSchema } from "@/config/contentSchema";
import { SITE_SLUG } from "@/lib/site";
import { useSiteId } from "../../AdminSite";

/**
 * Eine Route fuer alle Inhaltsseiten.
 *
 * Welche Felder und Listen erscheinen, steht ausschliesslich im
 * Content-Schema der Band (`src/config/contentSchema.ts`). Diese Datei muss
 * fuer neue Felder nicht angefasst werden.
 *
 * Die Site-ID kommt aus dem Admin-Layout (`AdminSite`) — vorher fragte diese
 * Seite die Zeile aus `sites` bei jedem Aufruf selbst erneut ab, obwohl das
 * Layout sie unmittelbar davor bereits geholt hatte.
 */
export default function AdminContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const page = contentSchema.pages.find(p => p.slug === slug);
  const siteId = useSiteId();

  if (!page) notFound();

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

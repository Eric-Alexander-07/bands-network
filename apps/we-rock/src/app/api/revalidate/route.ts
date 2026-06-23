import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? "we-rock";

// Supabase Webhook → Cache-Tag Mapping
const TABLE_TAG_MAP: Record<string, string[]> = {
  sites:               ["site",         SITE_SLUG],
  pages:               ["pages",        SITE_SLUG],
  events:              ["events",       SITE_SLUG],
  media_videos:        ["media-videos", SITE_SLUG],
  media_images:        ["media-images", SITE_SLUG],
  products:            ["products",     SITE_SLUG],
  referenzen:          ["referenzen",   SITE_SLUG],
  besetzung_gruppen:   ["besetzung",    SITE_SLUG],
  besetzung_eintraege: ["besetzung",    SITE_SLUG],
  social_links:        ["social-links", SITE_SLUG],
};

export async function POST(request: NextRequest) {
  // Verify secret
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { table?: string; type?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { table } = body;
  if (!table) {
    return NextResponse.json({ error: "Missing table" }, { status: 400 });
  }

  const tags = TABLE_TAG_MAP[table];
  if (!tags) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
  }

  // Revalidate all relevant cache tags
  const revalidated: string[] = [];
  for (const tag of tags) {
    revalidateTag(tag);
    revalidated.push(tag);
  }

  return NextResponse.json({
    revalidated,
    table,
    siteSlug: SITE_SLUG,
    timestamp: new Date().toISOString(),
  });
}

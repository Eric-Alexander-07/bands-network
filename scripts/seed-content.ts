/**
 * Befuellt `pages.content` mit den Standardtexten aus dem Content-Schema
 * einer Band.
 *
 * Die Regel lautet: bereits vorhandene Werte bleiben unangetastet, es werden
 * nur fehlende Schluessel ergaenzt. Das Skript ist damit gefahrlos wiederhol-
 * bar und ueberschreibt keine Kundenaenderungen.
 *
 * Aufruf (Node 22+, aus dem Repo-Wurzelverzeichnis):
 *   node --experimental-strip-types scripts/seed-content.ts we-rock
 *   node --experimental-strip-types scripts/seed-content.ts spirit-of-soul
 *   node --experimental-strip-types scripts/seed-content.ts we-rock --dry
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const app = process.argv[2];
const dry = process.argv.includes("--dry");
if (!app) {
  console.error("Bitte App angeben, z. B.: node --experimental-strip-types scripts/seed-content.ts we-rock");
  process.exit(1);
}

// ── Zugangsdaten aus apps/<app>/.env.local ───────────────────────
function readEnv(file: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]!] = m[2]!.replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = readEnv(`apps/${app}/.env.local`);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
const slug = env.NEXT_PUBLIC_SITE_SLUG ?? app;
if (!url || !key) {
  console.error(`NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY fehlen in apps/${app}/.env.local`);
  process.exit(1);
}

const { contentSchema } = await import(`../apps/${app}/src/config/contentSchema.ts`);
const supabase = createClient(url, key);

const { data: site, error: siteErr } = await supabase
  .from("sites").select("id, slug").eq("slug", slug).maybeSingle();
if (siteErr || !site) {
  console.error(`Site "${slug}" nicht gefunden: ${siteErr?.message ?? "keine Zeile"}`);
  process.exit(1);
}

console.log(`Site ${site.slug} (${site.id})${dry ? "  [Testlauf]" : ""}\n`);

let created = 0, filled = 0, untouched = 0;

for (const page of contentSchema.pages) {
  const defaults: Record<string, string> = {};
  for (const g of page.groups) for (const f of g.fields) defaults[f.key] = f.default;

  const { data: row } = await supabase
    .from("pages").select("id, content").eq("site_id", site.id).eq("slug", page.slug).maybeSingle();

  const existing = (row?.content ?? {}) as Record<string, unknown>;
  const merged: Record<string, string> = { ...defaults };
  const kept: string[] = [];
  for (const [k, v] of Object.entries(existing)) {
    if (typeof v === "string") { merged[k] = v; kept.push(k); }
  }
  const added = Object.keys(defaults).filter(k => !kept.includes(k));

  if (dry) {
    console.log(`  ${page.slug.padEnd(11)} ${row ? "vorhanden" : "NEU      "}  +${String(added.length).padStart(3)} neu, ${String(kept.length).padStart(3)} behalten`);
    continue;
  }

  if (!row) {
    const { error } = await supabase.from("pages").insert({ site_id: site.id, slug: page.slug, content: merged });
    if (error) { console.error(`  ${page.slug}: ${error.message}`); continue; }
    created++;
    console.log(`  ${page.slug.padEnd(11)} angelegt   ${Object.keys(merged).length} Felder`);
  } else if (added.length > 0) {
    const { error } = await supabase.from("pages")
      .update({ content: merged, updated_at: new Date().toISOString() }).eq("id", row.id);
    if (error) { console.error(`  ${page.slug}: ${error.message}`); continue; }
    filled++;
    console.log(`  ${page.slug.padEnd(11)} ergaenzt   +${added.length} neu, ${kept.length} unveraendert`);
  } else {
    untouched++;
    console.log(`  ${page.slug.padEnd(11)} aktuell    ${kept.length} Felder`);
  }
}

console.log(`\nFertig: ${created} angelegt, ${filled} ergaenzt, ${untouched} unveraendert.`);

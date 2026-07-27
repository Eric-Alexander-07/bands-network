#!/usr/bin/env node
/**
 * seo-check.mjs — statische SEO-Prüfung aller Bandseiten im Monorepo.
 *
 * Aufruf:  npm run seo:check
 *          npm run seo:check -- --app spirit-of-soul     (nur eine App)
 *          npm run seo:check -- --json                   (maschinenlesbar)
 *
 * Prüft ausschliesslich den Quellcode, kein Netzwerk, keine Datenbank.
 * Exit-Code 1 bei ERROR, 0 bei nur WARN/OK — damit als pre-commit-Hook
 * oder CI-Schritt verwendbar.
 *
 * Warum dieses Skript existiert: siehe docs/SEO-GUIDE.md, Abschnitt
 * "Was schon schiefgegangen ist". Jede Regel hier entspricht einem
 * Fehler, der real in Produktion stand.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const APPS_DIR = join(ROOT, "apps");

// Google rendert Beschreibungen bis ca. 155 Zeichen. Titel bis ca. 60,
// darüber wird in der Mitte gekürzt.
const DESC_MAX = 155;
const DESC_MIN = 70;
const TITLE_MAX = 60;

// Apps, die keine öffentlichen Bandseiten sind und übersprungen werden.
const SKIP_APPS = new Set(["docs", "web"]);

const args = process.argv.slice(2);
const onlyApp = args.includes("--app") ? args[args.indexOf("--app") + 1] : null;
const asJson = args.includes("--json");

const findings = [];
const add = (level, app, route, rule, message) =>
  findings.push({ level, app, route, rule, message });

/** Alle Bandseiten-Apps ermitteln: apps/*, die ein src/app besitzen. */
function discoverApps() {
  if (!existsSync(APPS_DIR)) return [];
  return readdirSync(APPS_DIR)
    .filter((name) => !SKIP_APPS.has(name))
    .filter((name) => !onlyApp || name === onlyApp)
    .filter((name) => existsSync(join(APPS_DIR, name, "src", "app")))
    .sort();
}

/** Alle öffentlichen page.tsx einer App finden (ohne admin/api/auth). */
function findPages(appDir) {
  const appRoot = join(appDir, "src", "app");
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (["admin", "api", "auth", "node_modules"].includes(entry)) continue;
        walk(full);
      } else if (entry === "page.tsx") {
        const rel = relative(appRoot, dir).split(sep).join("/");
        out.push({ file: full, route: "/" + rel });
      }
    }
  };
  walk(appRoot);
  return out.sort((a, b) => a.route.localeCompare(b.route));
}

/** Den Inhalt des `export const metadata = { ... }`-Blocks ausschneiden. */
function extractMetadataBlock(source) {
  const m = /export\s+const\s+metadata[^=]*=\s*\{/.exec(source);
  if (!m) return null;
  let depth = 0;
  const start = m.index + m[0].length - 1;
  for (let i = start; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Wert eines Feldes lesen. Unterstützt String-Literale und Verweise auf
 * eine Konstante im selben Modul (z. B. `description: HOME_DESCRIPTION`).
 */
function readField(block, source, field) {
  const direct = new RegExp(`\\b${field}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
  if (direct) return direct[1];

  const multiline = new RegExp(`\\b${field}\\s*:\\s*\\n\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
  if (multiline) return multiline[1];

  const ref = new RegExp(`\\b${field}\\s*:\\s*([A-Za-z_][A-Za-z0-9_]*)\\s*,`).exec(block);
  if (ref) {
    const constRe = new RegExp(`(?:const|let)\\s+${ref[1]}\\s*(?::[^=]+)?=\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`);
    const found = constRe.exec(source);
    if (found) return found[1];
    return null; // Verweis vorhanden, Wert nicht statisch auflösbar
  }
  return undefined; // Feld fehlt
}

/** Erwarteter Bandname je App, aus config/band.ts gelesen. */
function readBandName(appDir) {
  const cfg = join(appDir, "src", "config", "band.ts");
  if (!existsSync(cfg)) return null;
  const m = /name\s*:\s*"([^"]+)"/.exec(readFileSync(cfg, "utf8"));
  return m ? m[1] : null;
}

/** Kanonische Domain je App, aus layout.tsx (BASE_URL) gelesen. */
function readBaseUrl(appDir) {
  const layout = join(appDir, "src", "app", "layout.tsx");
  if (!existsSync(layout)) return null;
  const src = readFileSync(layout, "utf8");
  const m =
    /BASE_URL\s*=\s*process\.env\.[A-Z_]+\s*\?\?\s*"([^"]+)"/.exec(src) ||
    /BASE_URL\s*=\s*"([^"]+)"/.exec(src);
  return m ? m[1] : null;
}

/** Routen aus sitemap.ts, um sie gegen noindex zu prüfen. */
function readSitemapRoutes(appDir) {
  const file = join(appDir, "src", "app", "sitemap.ts");
  if (!existsSync(file)) return null;
  const src = readFileSync(file, "utf8");
  const routes = new Set();
  if (/url:\s*BASE_URL\s*,/.test(src)) routes.add("/");
  for (const m of src.matchAll(/\$\{BASE_URL\}(\/[a-z0-9-]*)/g)) routes.add(m[1]);
  return routes;
}

function checkApp(app) {
  const appDir = join(APPS_DIR, app);
  const bandName = readBandName(appDir);
  const baseUrl = readBaseUrl(appDir);
  const sitemapRoutes = readSitemapRoutes(appDir);
  const pages = findPages(appDir);

  // Namen der jeweils anderen Bands — um Copy-Paste-Reste zu erkennen.
  const otherBandNames = discoverApps()
    .filter((a) => a !== app)
    .map((a) => readBandName(join(APPS_DIR, a)))
    .filter(Boolean);

  const seenDescriptions = new Map();

  if (!baseUrl) add("ERROR", app, "-", "base-url", "BASE_URL in src/app/layout.tsx nicht gefunden.");

  for (const { file, route } of pages) {
    const source = readFileSync(file, "utf8");
    const block = extractMetadataBlock(source);

    if (!block) {
      add("ERROR", app, route, "metadata-fehlt",
        "Kein `export const metadata`. Die Seite erbt Titel und Beschreibung des Layouts und erzeugt damit ein Duplikat in Google.");
      continue;
    }

    const title = readField(block, source, "title");
    const desc = readField(block, source, "description");
    const noindex = /index\s*:\s*false/.test(block);
    const canonical = /canonical\s*:\s*"([^"]+)"/.exec(block)?.[1] ?? null;

    // --- Titel ---
    if (title === undefined) {
      add("ERROR", app, route, "titel-fehlt", "Kein `title` gesetzt.");
    } else if (title && title.length > TITLE_MAX) {
      add("WARN", app, route, "titel-lang",
        `Titel ${title.length} Zeichen (Richtwert ${TITLE_MAX}). Google kürzt in der Mitte.`);
    }

    // --- Beschreibung ---
    if (desc === undefined) {
      add("ERROR", app, route, "beschreibung-fehlt", "Kein `description` gesetzt.");
    } else if (desc === null) {
      add("WARN", app, route, "beschreibung-dynamisch",
        "`description` verweist auf einen nicht statisch auflösbaren Wert — Länge nicht prüfbar.");
    } else {
      if (desc.length > DESC_MAX) {
        add("ERROR", app, route, "beschreibung-lang",
          `${desc.length} Zeichen (max ${DESC_MAX}). Wird abgeschnitten und häufiger komplett von Google verworfen.`);
      } else if (!noindex && desc.length < DESC_MIN) {
        add("WARN", app, route, "beschreibung-kurz",
          `nur ${desc.length} Zeichen (Richtwert ab ${DESC_MIN}). Zu dünn — Google ersetzt sie gern durch Seitentext.`);
      }
      // Keyword-Halde statt Satz: viele Kommas, kein Satzende.
      const commas = (desc.match(/,/g) || []).length;
      if (commas >= 4 && !/[.!?]\s*$/.test(desc)) {
        add("WARN", app, route, "beschreibung-stichwortliste",
          "Liest sich als Stichwortliste (viele Kommas, kein Satzende). Solche Texte werden von Google bevorzugt überschrieben.");
      }
      if (!noindex && !/[.!?]$/.test(desc.trim())) {
        add("WARN", app, route, "beschreibung-kein-satzende", "Endet ohne Punkt.");
      }
      // Beschreibung doppelt auf mehreren Seiten?
      if (seenDescriptions.has(desc)) {
        add("ERROR", app, route, "beschreibung-doppelt",
          `Identisch mit ${seenDescriptions.get(desc)}. Jede Seite braucht einen eigenen Text.`);
      } else {
        seenDescriptions.set(desc, route);
      }
    }

    // --- Fremder Bandname (der /shop-Vorfall) ---
    for (const other of otherBandNames) {
      const hay = `${title ?? ""} ${desc ?? ""}`;
      if (hay.toLowerCase().includes(other.toLowerCase())) {
        add("ERROR", app, route, "fremde-band",
          `Nennt "${other}" — Metadaten einer anderen Bandseite. Vermutlich ein Copy-Paste-Rest.`);
      }
    }
    for (const other of otherBandNames) {
      const slug = other.toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (slug && block.toLowerCase().replace(/[^a-z0-9]+/g, "").includes(slug + "cd")) {
        add("WARN", app, route, "fremde-band-keywords",
          `Keywords erwähnen offenbar "${other}".`);
      }
    }

    // --- Domain-Konsistenz ---
    if (baseUrl) {
      for (const m of block.matchAll(/"(https:\/\/[a-z0-9.-]+)[^"]*"/g)) {
        if (!m[1].startsWith(baseUrl)) {
          add("ERROR", app, route, "fremde-domain",
            `URL ${m[1]} weicht von BASE_URL ${baseUrl} ab.`);
        }
      }
    }

    // --- Canonical ---
    if (!noindex && !canonical) {
      add("WARN", app, route, "canonical-fehlt", "Keine canonical-URL gesetzt.");
    }

    // --- noindex vs. Sitemap ---
    if (sitemapRoutes) {
      if (noindex && sitemapRoutes.has(route)) {
        add("ERROR", app, route, "noindex-in-sitemap",
          "Steht auf noindex, ist aber in der Sitemap. Widersprüchliches Signal an Google.");
      }
      if (!noindex && !sitemapRoutes.has(route)) {
        add("WARN", app, route, "fehlt-in-sitemap",
          "Indexierbar, aber nicht in der Sitemap. Entweder aufnehmen oder auf noindex setzen.");
      }
    }
  }

  // --- Layout-Beschreibung darf nicht mit der Startseite kollidieren ---
  const layoutFile = join(appDir, "src", "app", "layout.tsx");
  if (existsSync(layoutFile)) {
    const lsrc = readFileSync(layoutFile, "utf8");
    const lblock = extractMetadataBlock(lsrc);
    const ldesc = lblock ? readField(lblock, lsrc, "description") : undefined;
    if (ldesc && ldesc.length > DESC_MAX) {
      add("ERROR", app, "layout.tsx", "beschreibung-lang",
        `Layout-Beschreibung ${ldesc.length} Zeichen (max ${DESC_MAX}).`);
    }
  }
}

// ─── Ausführung ──────────────────────────────────────────────────
const apps = discoverApps();
if (apps.length === 0) {
  console.error("Keine Bandseiten-Apps unter apps/ gefunden.");
  process.exit(1);
}
apps.forEach(checkApp);

const errors = findings.filter((f) => f.level === "ERROR");
const warns = findings.filter((f) => f.level === "WARN");

if (asJson) {
  console.log(JSON.stringify({ apps, errors, warns }, null, 2));
  process.exit(errors.length > 0 ? 1 : 0);
}

const ICON = { ERROR: "✗", WARN: "!" };
console.log(`\nSEO-Check — ${apps.length} Bandseite(n): ${apps.join(", ")}\n`);

if (findings.length === 0) {
  console.log("  Alles in Ordnung.\n");
} else {
  let currentApp = null;
  for (const f of [...errors, ...warns].sort(
    (a, b) => a.app.localeCompare(b.app) || a.route.localeCompare(b.route)
  )) {
    if (f.app !== currentApp) {
      console.log(`  ${f.app}`);
      currentApp = f.app;
    }
    console.log(`    ${ICON[f.level]} ${f.route.padEnd(14)} [${f.rule}] ${f.message}`);
  }
  console.log("");
}

console.log(`  ${errors.length} Fehler, ${warns.length} Hinweise`);
console.log(`  Regeln erklärt in docs/SEO-GUIDE.md\n`);

process.exit(errors.length > 0 ? 1 : 0);

// Extrahiert den sichtbaren Text einer gerenderten HTML-Seite.
const fs = require("fs");
const h = fs.readFileSync(process.argv[2], "utf8")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#x27;/g, "'")
  .replace(/&nbsp;/g, " ")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");
// Mehrfache Leerzeichen zusammenfassen: React setzt bei Interpolationen
// unsichtbare Trennmarker, die sonst als Unterschied erscheinen wuerden,
// obwohl der Browser beides identisch darstellt.
console.log(
  h.split("\n").map(s => s.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n")
);

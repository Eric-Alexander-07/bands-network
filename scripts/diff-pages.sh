#!/usr/bin/env bash
# Vergleicht den sichtbaren Text der gerenderten Seiten mit einem gesicherten
# Stand. Die Standardtexte im Schema entsprechen den bisherigen Texten, also
# MUSS die Ausgabe nach dem Umbau identisch bleiben.
#   scripts/diff-pages.sh snapshot | check
set -u
MODE="${1:-check}"
DIR="${SNAPDIR:-/tmp/pagesnap}"
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$DIR"
fail=0

run() {
  local tag="$1" base="$2"; shift 2
  for p in "$@"; do
    local name="$tag-${p:-home}"
    local txt="$DIR/$name.txt" cur="$DIR/$name.now.txt"
    local html="$DIR/$name.html"
    [ "$MODE" = "check" ] && html="$DIR/$name.now.html"
    local code
    code=$(curl -s --max-time 180 -o "$html" -w "%{http_code}" "$base/$p")
    if [ "$code" != "200" ]; then echo "  HTTP $code   $name"; fail=1; continue; fi
    node "$HERE/page-text.js" "$html" > "$cur"
    if [ "$MODE" = "snapshot" ]; then
      mv "$cur" "$txt"; echo "  gesichert  $name"
    elif [ ! -f "$txt" ]; then
      echo "  KEINE BASIS $name"; fail=1
    elif diff -q <(sort "$txt") <(sort "$cur") >/dev/null; then
      echo "  OK         $name"
    else
      echo "  ABWEICHUNG $name"; diff <(sort "$txt") <(sort "$cur") | head -14; fail=1
    fi
  done
}

run wr  http://localhost:3003 "" about services media galerie referenzen booking
run sos http://localhost:3002 "" about services media galerie referenzen booking shop
exit $fail

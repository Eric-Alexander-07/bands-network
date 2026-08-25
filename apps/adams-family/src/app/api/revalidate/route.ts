import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cache-Invalidierung von aussen (z. B. Supabase-Webhook oder manuell nach
 * direkten Datenbankaenderungen).
 *
 * Der gesamte Seiteninhalt haengt an EINEM Tag (`site-bundle`), weil er auch
 * mit einer einzigen Abfrage geladen wird. Eine Tabelle-zu-Tag-Zuordnung ist
 * deshalb nicht mehr noetig — jede Aenderung invalidiert denselben Tag.
 */
const BUNDLE_TAG = "site-bundle";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(BUNDLE_TAG);
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: BUNDLE_TAG,
    timestamp: new Date().toISOString(),
  });
}

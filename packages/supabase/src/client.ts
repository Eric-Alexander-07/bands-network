import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@bands/db-types";

/**
 * Browser-Client fuer den Admin-Bereich (mit Session/Cookie-Handling).
 *
 * Der Rueckgabetyp wird bewusst explizit angegeben: `@supabase/ssr` 0.5.x
 * reicht den `Database`-Generic nicht mehr korrekt an supabase-js 2.107
 * weiter, wodurch jede Abfrage als `never` typisiert wuerde. Zur Laufzeit
 * aendert die Annotation nichts — sie stellt nur die Typinferenz wieder her.
 */
export function createClient(): SupabaseClient<Database> {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ) as unknown as SupabaseClient<Database>;
}

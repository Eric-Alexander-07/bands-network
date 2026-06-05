import { createClient } from "@supabase/supabase-js";
import type { Database } from "@bands/db-types";

/**
 * Simple Supabase client without cookie/session handling.
 * Safe to use inside unstable_cache() — no dynamic data sources.
 * Use for public read-only data fetching.
 */
export function createPublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

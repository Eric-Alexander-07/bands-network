import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@bands/db-types";

/**
 * Server-Client mit Session/Cookie-Handling.
 *
 * Zum expliziten Rueckgabetyp siehe `client.ts`: `@supabase/ssr` 0.5.x
 * verliert den `Database`-Generic gegenueber supabase-js 2.107.
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              cookieStore.set(name, value, options as any)
            );
          } catch {
            // Server Component context — cookies can't be set, safe to ignore
          }
        },
      },
    }
  ) as unknown as SupabaseClient<Database>;
}

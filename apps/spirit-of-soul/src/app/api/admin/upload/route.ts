import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
const ALLOWED_EXTS  = ["jpg", "jpeg", "png", "webp", "avif"];
const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
  webp: "image/webp", avif: "image/avif",
};
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  // Verify authenticated user
  const cookieStore = await cookies();
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const bucket = (formData.get("bucket") as string) || "images";
  const uploadPath = (formData.get("path") as string) || "uploads";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large (10MB)" }, { status: 400 });

  // Safari sometimes sends empty MIME type in FormData — fall back to extension
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const validByType = ALLOWED_TYPES.includes(file.type);
  const validByExt  = ALLOWED_EXTS.includes(ext);
  if (!validByType && !validByExt) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }
  const contentType = validByType ? file.type : (EXT_TO_MIME[ext] ?? "image/jpeg");

  // Service role for storage — never exposed to client
  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const safeName    = file.name.replace(/[^a-z0-9.-]/gi, "-").toLowerCase();
  const uid         = crypto.randomUUID().slice(0, 8);
  const fileName    = `${uid}-${safeName}`;
  const storagePath = `${uploadPath}/${fileName}`;

  const bytes = await file.arrayBuffer();
  const { error } = await serviceClient.storage
    .from(bucket)
    .upload(storagePath, bytes, { contentType, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = serviceClient.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return NextResponse.json({ url: publicUrl });
}

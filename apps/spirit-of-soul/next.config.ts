import type { NextConfig } from "next";

// NOTE: All environment variables (incl. shared Supabase credentials)
// must be in apps/spirit-of-soul/.env.local — Next.js Middleware runs
// in Edge Runtime and can only read the app's own .env files.
// Vercel: set shared vars at Team level; they apply to all projects.

const nextConfig: NextConfig = {
  experimental: {
    serverBodySizeLimit: "15mb",
  },
};

export default nextConfig;

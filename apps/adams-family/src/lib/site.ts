// Single source of truth for the site slug.
// Override with NEXT_PUBLIC_SITE_SLUG env var when deploying additional bands.
export const SITE_SLUG =
  process.env.NEXT_PUBLIC_SITE_SLUG ?? "adams-family";

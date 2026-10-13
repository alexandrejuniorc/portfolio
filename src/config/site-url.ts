/**
 * The public origin of the site, without a trailing slash. Imported by vite.config.ts and by
 * scripts/sitemap.mjs, so it must stay free of imports and of non-erasable TypeScript syntax.
 */
export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const explicit = env.VITE_SITE_URL?.trim()
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const url = explicit || (vercel ? `https://${vercel}` : 'http://localhost:3000')
  return url.replace(/\/+$/, '')
}

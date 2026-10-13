// Writes sitemap.xml and the Sitemap line of robots.txt into the build output.
// Runs after `vite build`, with the same site URL the pages were built with.
import { appendFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { resolveSiteUrl } from '../src/config/site-url.ts'

const out = join(process.cwd(), 'dist', 'client')
const siteUrl = resolveSiteUrl(process.env)
const pages = [
  { path: '/', tag: 'en' },
  { path: '/pt', tag: 'pt-BR' },
  { path: '/es', tag: 'es' },
]
const absolute = (path) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`)

const alternates = [
  ...pages.map(
    (page) =>
      `    <xhtml:link rel="alternate" hreflang="${page.tag}" href="${absolute(page.path)}"/>`,
  ),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('/')}"/>`,
].join('\n')

const urls = pages
  .map((page) => `  <url>\n    <loc>${absolute(page.path)}</loc>\n${alternates}\n  </url>`)
  .join('\n')

writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)
appendFileSync(join(out, 'robots.txt'), `Sitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`sitemap: wrote ${pages.length} URLs for ${siteUrl}`)

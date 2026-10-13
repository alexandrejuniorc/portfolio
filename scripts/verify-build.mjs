// Asserts the static build is what a host will serve: three prerendered locales,
// the right lang attribute on each, and every local file an HTML page points to.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'dist', 'client')
const pages = [
  { file: 'index.html', lang: 'en', path: '/' },
  { file: 'pt/index.html', lang: 'pt-BR', path: '/pt' },
  { file: 'es/index.html', lang: 'es', path: '/es' },
]
const failures = []

/** Every root-relative file a page links to or loads. */
function localRefs(html) {
  const refs = new Set()
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*\.[a-z0-9]+)"/gi)) refs.add(match[1])
  return [...refs]
}

for (const page of pages) {
  const path = join(root, page.file)
  if (!existsSync(path)) {
    failures.push(`${page.file}: was not prerendered`)
    continue
  }
  const html = readFileSync(path, 'utf8')
  if (!html.includes(`<html lang="${page.lang}"`)) {
    failures.push(`${page.file}: <html lang> is not "${page.lang}"`)
  }
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${page.file}: empty <title>`)
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1)
    failures.push(`${page.file}: expected exactly one <h1>`)
  const head = html.slice(0, html.indexOf('</head>'))
  if (!head.includes("localStorage.getItem('portfolio-theme')")) {
    failures.push(`${page.file}: the theme script is not in <head>`)
  }
  if (!/<meta name="description" content="[^"]{50,}"/.test(head)) {
    failures.push(`${page.file}: missing or short meta description`)
  }
  if (
    !new RegExp(`<link rel="canonical" href="[^"]*${page.path === '/' ? '/' : page.path}"`).test(
      head,
    )
  ) {
    failures.push(`${page.file}: canonical does not end with ${page.path}`)
  }
  for (const tag of ['en', 'pt-BR', 'es', 'x-default']) {
    if (!head.includes(`hrefLang="${tag}"`))
      failures.push(`${page.file}: no hreflang alternate for ${tag}`)
  }
  if (!head.includes('application/ld+json')) failures.push(`${page.file}: no JSON-LD`)
  if (/lab2dev|cidic|garbes/i.test(html)) failures.push(`${page.file}: names a consultancy`)
  if (!html.includes('class="skip-link" href="#main"')) failures.push(`${page.file}: no skip link`)
  if (!html.includes('<main id="main"')) failures.push(`${page.file}: no <main id="main">`)
  if (!html.includes('<header')) failures.push(`${page.file}: no site header`)
  if ((html.match(/<article/g) ?? []).length !== 4)
    failures.push(`${page.file}: expected 4 case articles`)
  if (!html.includes('id="work"')) failures.push(`${page.file}: no #work section`)
  const cv = page.lang === 'pt-BR' ? 'CV_Alexandre_Junior_BR.pdf' : 'CV_Alexandre_Junior_EN.pdf'
  if (!html.includes(`href="/cv/${cv}"`)) failures.push(`${page.file}: does not offer ${cv}`)
  const builtCv = join(root, 'cv', cv)
  const sourceCv = join(process.cwd(), 'public', 'cv', cv)
  if (
    existsSync(builtCv) &&
    existsSync(sourceCv) &&
    !readFileSync(builtCv).equals(readFileSync(sourceCv))
  ) {
    failures.push(`${page.file}: ${cv} in the build is not byte-identical to public/cv/${cv}`)
  }
  for (const ref of localRefs(html)) {
    if (!existsSync(join(root, ref))) failures.push(`${page.file}: points to missing file ${ref}`)
  }
}

for (const file of ['404.html', 'robots.txt', 'sitemap.xml']) {
  if (!existsSync(join(root, file))) failures.push(`${file}: missing from the build`)
}
if (existsSync(join(root, 'sitemap.xml'))) {
  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8')
  if ((sitemap.match(/<loc>/g) ?? []).length !== pages.length) {
    failures.push(`sitemap.xml: expected ${pages.length} <loc> entries`)
  }
}
if (existsSync(join(root, '404.html'))) {
  const notFound = readFileSync(join(root, '404.html'), 'utf8')
  for (const page of pages) {
    if (!notFound.includes(`href="${page.path}"`))
      failures.push(`404.html: no link to ${page.path}`)
  }
}

if (failures.length > 0) {
  console.error(`verify-build: ${failures.length} problem(s)\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log(`verify-build: ok (${pages.length} pages)`)

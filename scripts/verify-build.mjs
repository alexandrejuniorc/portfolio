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
  for (const ref of localRefs(html)) {
    if (!existsSync(join(root, ref))) failures.push(`${page.file}: points to missing file ${ref}`)
  }
}

if (failures.length > 0) {
  console.error(`verify-build: ${failures.length} problem(s)\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log(`verify-build: ok (${pages.length} pages)`)

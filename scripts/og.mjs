// Renders public/og/{en,pt,es}.png at 1200x630 with headless Chrome.
// Run by hand when the headline or the palette changes: `pnpm og`.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const font = pathToFileURL(
  join(
    root,
    'node_modules/@fontsource-variable/red-hat-display/files/red-hat-display-latin-wght-normal.woff2',
  ),
).href
const outDir = join(root, 'public', 'og')
mkdirSync(outDir, { recursive: true })

const card = (locale, line1, line2) => `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<style>
@font-face { font-family: "Red Hat Display"; src: url("${font}") format("woff2"); font-weight: 300 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; background: #07090d; color: #eef1f4;
  font-family: "Red Hat Display", system-ui, sans-serif; }
.name { position: absolute; left: 64px; top: 56px; font-size: 28px; font-weight: 700; }
h1 { position: absolute; left: 64px; top: 136px; font-size: 84px; font-weight: 700; line-height: 1;
  letter-spacing: -0.04em; white-space: nowrap; }
.flow { position: absolute; left: 0; top: 410px; display: flex; width: 1290px; height: 260px; }
.flow i { flex: 1; margin-left: -62px;
  clip-path: polygon(0 0, calc(100% - 70px) 0, 100% 50%, calc(100% - 70px) 100%, 0 100%, 70px 50%); }
.flow i:nth-child(1) { margin-left: 0; background: #00205e;
  clip-path: polygon(0 0, calc(100% - 70px) 0, 100% 50%, calc(100% - 70px) 100%, 0 100%); }
.flow i:nth-child(2) { background: #0057d2; }
.flow i:nth-child(3) { background: #1b90ff; }
</style>
</head>
<body>
<p class="name">Alexandre Junior</p>
<h1>${line1}<br>${line2}</h1>
<div class="flow"><i></i><i></i><i></i></div>
</body>
</html>`

for (const locale of ['en', 'pt', 'es']) {
  const messages = JSON.parse(readFileSync(join(root, 'messages', `${locale}.json`), 'utf8'))
  const page = join(outDir, `.card-${locale}.html`)
  const image = join(outDir, `${locale}.png`)
  writeFileSync(page, card(locale, messages.hero_title_line1, messages.hero_title_line2))
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1200,630',
      '--virtual-time-budget=3000',
      `--screenshot=${image}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'ignore' },
  )
  rmSync(page)
  console.log(`og: wrote public/og/${locale}.png`)
}

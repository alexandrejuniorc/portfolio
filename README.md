# Alexandre Junior, portfolio

A one-page personal site in English, Portuguese and Spanish, built as static HTML.

## Stack

- [TanStack Start](https://tanstack.com/start) on Vite, with static prerendering
- [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for messages and localised URLs
- React 19, TypeScript, Tailwind CSS 4
- Zustand for the theme
- Vitest and Biome

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm build` | Prerenders `/`, `/pt` and `/es` into `dist/client` and writes the sitemap |
| `pnpm serve` | Serves the built site on http://127.0.0.1:4173 |
| `pnpm test` | Unit tests |
| `pnpm verify:build` | Checks the built pages: languages, head tags, links to files |
| `pnpm check` | Build, verify, type-check, lint and test, in that order |
| `pnpm format` | Formats and sorts imports with Biome |
| `pnpm og` | Regenerates the link preview images in `public/og` |

Node 24 or newer and pnpm 11.

## Where things live

```
messages/        the text of the site, one JSON file per language
src/content/     what exists: cases, clients, stack, credentials (no text of its own)
src/sections/    one folder per section of the page
src/components/  pieces shared by more than one section
src/lib/         pure functions: locale paths, SEO head, theme, shared working hours
src/stores/      the theme store
src/styles/      design tokens and component styles
DESIGN.md        the design system
```

## Editing content

- **Change a sentence:** edit the same key in `messages/en.json`, `messages/pt.json` and
  `messages/es.json`. A test fails if a key is missing in one language or if a translation is
  a copy of the English text.
- **Add a client or a case:** add the entry in `src/content/` and its messages in the three
  files. The hero figure for the number of clients must match the list; a test checks it.
- **Change a colour:** only in the two token blocks at the top of `src/styles/app.css`. A test
  checks every text and ground pair against WCAG AA.

## Branches

`main`, `staging` and `development` are permanent. A new feature branch is always cut from
`staging`, for example `git switch -c feature/case-pages staging`.

## Rules of this site

- It names clients, never consultancies.
- It never shows or recreates the interface of a client system.
- Every claim comes from the CV or the LinkedIn profile.

## Deploying

The build output in `dist/client` is plain files. On Vercel, `vercel.json` already sets the
build command and the output directory. Set `VITE_SITE_URL` to the public address of the site
(for example `https://example.com`) so canonical links, the sitemap and link previews use it.
Without it the build falls back to Vercel's production domain.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { contrastRatio } from '@/lib/contrast'

const css = readFileSync(join(process.cwd(), 'src/styles/app.css'), 'utf8')

/** The hex custom properties declared in the first block that opens with `selector {`. */
function tokens(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`No "${selector}" block in app.css`)
  const block = css.slice(start, css.indexOf('}', start))
  return Object.fromEntries(
    [...block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  )
}

const TOKEN_NAMES = [
  'bg',
  'surface',
  'ink',
  'muted',
  'accent',
  'accent-ink',
  'accent-text',
  'arrow-1',
  'arrow-1-ink',
  'arrow-2',
  'arrow-2-ink',
  'arrow-3',
  'arrow-3-ink',
]

/** Every text colour with every ground it is set on. */
const TEXT_PAIRS: Array<[string, string]> = [
  ['ink', 'bg'],
  ['ink', 'surface'],
  ['muted', 'bg'],
  ['muted', 'surface'],
  ['accent-text', 'bg'],
  ['accent-text', 'surface'],
  ['accent-ink', 'accent'],
  ['arrow-1-ink', 'arrow-1'],
  ['arrow-2-ink', 'arrow-2'],
  ['arrow-3-ink', 'arrow-3'],
]

const themes = { dark: tokens(':root'), light: tokens('[data-theme="light"]') }

describe.each(Object.entries(themes))('%s theme', (_name, theme) => {
  test('defines every colour token and nothing else', () => {
    expect(Object.keys(theme).sort()).toEqual([...TOKEN_NAMES].sort())
  })

  test.each(TEXT_PAIRS)('%s on %s meets WCAG AA for text', (text, ground) => {
    expect(contrastRatio(theme[text], theme[ground])).toBeGreaterThanOrEqual(4.5)
  })
})

describe('build and motion safety', () => {
  test('tailwind scans only src, so the client and server builds hash the same CSS', () => {
    expect(css.startsWith('@import "tailwindcss" source("..");')).toBe(true)
  })

  test('scroll reveal hides content only after the script has taken over', () => {
    expect(css).toContain('.reveal-on [data-reveal]')
    expect(css).not.toMatch(/(^|[},])\s*\[data-reveal\][^{]*\{[^}]*opacity:\s*0/)
  })

  test('every animation and transition sits behind prefers-reduced-motion', () => {
    const motionBlock = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'))
    const before = css.slice(0, css.indexOf('@media (prefers-reduced-motion: no-preference)'))
    expect(motionBlock.length).toBeGreaterThan(0)
    expect(before).not.toMatch(/\b(animation|transition)\s*:/)
  })
})

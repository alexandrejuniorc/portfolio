// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import {
  nextTheme,
  parseStoredTheme,
  readDocumentTheme,
  THEME_INIT_SCRIPT,
  THEME_STORAGE_KEY,
} from './theme'

const stored = (theme: string) => JSON.stringify({ state: { theme }, version: 0 })
const setUrl = (url: string) =>
  (window as unknown as { happyDOM: { setURL(next: string): void } }).happyDOM.setURL(url)
const runInitScript = () => new Function(THEME_INIT_SCRIPT)()

describe('parseStoredTheme', () => {
  test.each([
    [null, 'dark'],
    [undefined, 'dark'],
    ['', 'dark'],
    ['not json', 'dark'],
    ['null', 'dark'],
    ['{}', 'dark'],
    ['{"state":null}', 'dark'],
    ['"light"', 'dark'],
    [stored('system'), 'dark'],
    [stored('dark'), 'dark'],
    [stored('light'), 'light'],
  ])('%j reads as %s', (raw, expected) => {
    expect(parseStoredTheme(raw)).toBe(expected)
  })
})

test('nextTheme flips between the two themes', () => {
  expect(nextTheme('dark')).toBe('light')
  expect(nextTheme('light')).toBe('dark')
})

describe('readDocumentTheme', () => {
  test('reads the attribute and treats anything else as dark', () => {
    document.documentElement.dataset.theme = 'light'
    expect(readDocumentTheme()).toBe('light')
    document.documentElement.dataset.theme = 'sepia'
    expect(readDocumentTheme()).toBe('dark')
    document.documentElement.removeAttribute('data-theme')
    expect(readDocumentTheme()).toBe('dark')
  })
})

describe('THEME_INIT_SCRIPT', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    setUrl('https://example.test/')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('a first visit opens dark', () => {
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('applies the theme the visitor chose before', () => {
    localStorage.setItem(THEME_STORAGE_KEY, stored('light'))
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  test('falls back to dark when storage holds garbage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, '{{{')
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('a ?theme= query wins over the stored choice', () => {
    localStorage.setItem(THEME_STORAGE_KEY, stored('dark'))
    setUrl('https://example.test/pt?theme=light')
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  test('ignores a ?theme= value that is not a theme', () => {
    setUrl('https://example.test/?theme=sepia')
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('paints the browser chrome in the colour of the theme', () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#07090d')
    document.head.append(meta)

    localStorage.setItem(THEME_STORAGE_KEY, stored('light'))
    runInitScript()
    expect(meta.getAttribute('content')).toBe('#f6f7f9')

    localStorage.clear()
    runInitScript()
    expect(meta.getAttribute('content')).toBe('#07090d')
    meta.remove()
  })

  test('still opens dark when localStorage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new Error('denied')
      },
    })
    runInitScript()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

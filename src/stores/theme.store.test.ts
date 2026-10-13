// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { parseStoredTheme, THEME_STORAGE_KEY } from '@/lib/theme'
import { useThemeStore } from './theme.store'

describe('theme store', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
    useThemeStore.setState({ theme: 'dark' })
    localStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('toggle changes the state, the attribute and the stored choice together', () => {
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(parseStoredTheme(localStorage.getItem(THEME_STORAGE_KEY))).toBe('light')
  })

  test('toggle repaints the browser chrome to match the page', () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#07090d')
    document.head.append(meta)
    useThemeStore.getState().toggle()
    expect(meta.getAttribute('content')).toBe('#f6f7f9')
    useThemeStore.getState().toggle()
    expect(meta.getAttribute('content')).toBe('#07090d')
    meta.remove()
  })

  test('toggling twice comes back to dark', () => {
    useThemeStore.getState().toggle()
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(parseStoredTheme(localStorage.getItem(THEME_STORAGE_KEY))).toBe('dark')
  })

  test('stores only the theme, in the shape the head script reads', () => {
    useThemeStore.getState().setTheme('light')
    expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? 'null')).toEqual({
      state: { theme: 'light' },
      version: 0,
    })
  })

  test('syncWithDocument adopts the theme the head script already painted', () => {
    document.documentElement.dataset.theme = 'light'
    useThemeStore.getState().syncWithDocument()
    expect(useThemeStore.getState().theme).toBe('light')
    useThemeStore.getState().toggle()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('keeps working for the visit when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new Error('denied')
      },
      setItem() {
        throw new Error('denied')
      },
      removeItem() {
        throw new Error('denied')
      },
    })
    expect(() => useThemeStore.getState().toggle()).not.toThrow()
    expect(useThemeStore.getState().theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})

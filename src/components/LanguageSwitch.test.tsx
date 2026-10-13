import { expect, test } from 'vitest'
import { renderIn } from '@/test/render'
import { LanguageSwitch } from './LanguageSwitch'

test('offers the three languages as real links', () => {
  const html = renderIn('en', <LanguageSwitch />)
  expect(html).toContain('<nav aria-label="Language">')
  expect(html).toContain('href="/" hrefLang="en"')
  expect(html).toContain('href="/pt" hrefLang="pt-BR"')
  expect(html).toContain('href="/es" hrefLang="es"')
  expect(html.match(/<a /g)).toHaveLength(3)
})

test('marks the language of the current page, and only that one', () => {
  const html = renderIn('pt', <LanguageSwitch />)
  expect(html).toContain('<nav aria-label="Idioma">')
  expect(html.match(/aria-current="true"/g)).toHaveLength(1)
  expect(html).toMatch(/href="\/pt"[^>]*aria-current="true"/)
})

test('names each language in itself for screen readers', () => {
  const html = renderIn('en', <LanguageSwitch />)
  expect(html).toContain('aria-label="Português"')
  expect(html).toContain('aria-label="Español"')
})

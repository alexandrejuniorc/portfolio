import { expect, test } from 'vitest'
import { renderIn } from '@/test/render'
import { ThemeToggle } from './ThemeToggle'

test('is a button that carries both labels, so CSS can show the right one without waiting for React', () => {
  const html = renderIn('en', <ThemeToggle />)
  expect(html).toMatch(/^<button type="button"/)
  expect(html).toContain('aria-label="Switch between dark and light theme"')
  expect(html).toContain('>Light<')
  expect(html).toContain('>Dark<')
})

test('speaks the language of the page', () => {
  const html = renderIn('pt', <ThemeToggle />)
  expect(html).toContain('aria-label="Alternar entre tema escuro e claro"')
  expect(html).toContain('>Claro<')
  expect(html).toContain('>Escuro<')
})

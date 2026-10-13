import { expect, test } from 'vitest'
import { renderIn } from '@/test/render'
import { SiteHeader } from './SiteHeader'

const count = (html: string, needle: string) => html.split(needle).length - 1

test('links the name to the home page of the current language', () => {
  expect(renderIn('en', <SiteHeader />)).toMatch(/href="\/"[^>]*>Alexandre Junior</)
  expect(renderIn('es', <SiteHeader />)).toMatch(/href="\/es"[^>]*>Alexandre Junior</)
})

test('links the four sections, once in the bar and once in the phone menu', () => {
  const html = renderIn('en', <SiteHeader />)
  for (const anchor of ['#work', '#stack', '#clients', '#contact']) {
    expect(count(html, `href="${anchor}"`)).toBe(2)
  }
  expect(html).toContain('<details class="menu lg:hidden">')
  expect(html).toContain('>Menu</summary>')
})

test('carries the language switch and the theme toggle in both layouts', () => {
  const html = renderIn('pt', <SiteHeader />)
  expect(count(html, 'aria-label="Idioma"')).toBe(2)
  expect(count(html, 'aria-label="Alternar entre tema escuro e claro"')).toBe(2)
  expect(html).toContain('>Projetos<')
})

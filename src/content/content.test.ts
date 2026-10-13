import { describe, expect, test } from 'vitest'
import { locales } from '@/paraglide/runtime'
import en from '../../messages/en.json'
import es from '../../messages/es.json'
import pt from '../../messages/pt.json'
import { cases } from './cases'
import { clients } from './clients'
import { proofs } from './proof'
import { stackSides } from './stack'
import { stats } from './stats'

describe('content model', () => {
  test('four case studies, each part with a flow of at least three steps', () => {
    expect(cases.map((item) => item.id)).toEqual(['optimus', 'apis', 'braskem', 'advisor'])
    for (const item of cases) {
      expect(item.stack.length).toBeGreaterThan(0)
      for (const part of item.parts) expect(part.steps.length).toBeGreaterThanOrEqual(3)
    }
  })

  test('the API case tells three generations, one per client', () => {
    const apis = cases.find((item) => item.id === 'apis')
    expect(apis?.parts.map((part) => part.heading)).toEqual(['Gerdau', 'RHI Magnesita', 'Bunge'])
  })

  test('eight clients, and the hero figure matches the list', () => {
    expect(clients.map((client) => client.name)).toEqual([
      'Whirlpool',
      'Gerdau',
      'RHI Magnesita',
      'Bunge',
      'Braskem',
      'Piracanjuba',
      'Zilor',
      'Bemol',
    ])
    expect(stats.find((stat) => stat.id === 'clients')?.value).toBe(String(clients.length))
  })

  test('three certifications and one award, newest first', () => {
    expect(proofs.map((proof) => proof.id)).toEqual(['fiori', 'genai', 'build', 'hack2build'])
    expect(proofs.map((proof) => proof.year)).toEqual([2026, 2026, 2025, 2024])
  })

  test('both stacks are listed with the technologies the cases rely on', () => {
    expect(stackSides.map((side) => side.id)).toEqual(['sap', 'web'])
    const all = stackSides.flatMap((side) => side.items)
    for (const name of [
      'CAP',
      'SAP API Management',
      'React',
      'Next.js',
      'NestJS',
      'Python',
      'Terraform',
    ]) {
      expect(all).toContain(name)
    }
  })

  test.each([...locales])('every message the content points to resolves in %s', (locale) => {
    const messages = [
      ...cases.flatMap((item) => [
        item.title,
        item.meta,
        item.intro,
        ...item.parts.flatMap((part) => [part.text, ...part.steps.map((step) => step.label)]),
      ]),
      ...clients.map((client) => client.work),
      ...proofs.map((proof) => proof.title),
      ...stackSides.map((side) => side.title),
      ...stats.map((stat) => stat.label),
    ]
    const texts = messages.map((message) => message({}, { locale }))
    expect(texts.filter((text) => text.trim() === '')).toEqual([])
  })
})

describe('copy rules', () => {
  const catalogs = { en, pt, es } as Record<string, Record<string, string>>

  test.each(Object.keys(catalogs))('%s never names a consultancy', (locale) => {
    const offenders = Object.entries(catalogs[locale]).filter(([, text]) =>
      /lab2dev|cidic|garbes/i.test(text),
    )
    expect(offenders).toEqual([])
  })

  test.each(Object.keys(catalogs))(
    '%s keeps each hero headline line within 24 characters',
    (locale) => {
      expect(catalogs[locale].hero_title_line1.length).toBeLessThanOrEqual(24)
      expect(catalogs[locale].hero_title_line2.length).toBeLessThanOrEqual(24)
    },
  )

  test.each(['pt', 'es'])('%s translations are not copies of the English text', (locale) => {
    const copies = Object.entries(catalogs.en)
      .filter(([key, text]) => key !== '$schema' && text.split(/\s+/).length >= 6)
      .filter(([key, text]) => catalogs[locale][key] === text)
      .map(([key]) => key)
    expect(copies).toEqual([])
  })
})

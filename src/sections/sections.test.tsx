import { describe, expect, test } from 'vitest'
import { renderIn } from '@/test/render'
import { Hero } from './hero/Hero'
import { Work } from './work/Work'

const count = (html: string, needle: string) => html.split(needle).length - 1

describe('Hero', () => {
  test('says who he is and what he does, in one h1 of two lines', () => {
    const html = renderIn('en', <Hero />)
    expect(count(html, '<h1')).toBe(1)
    expect(html).toContain('Software that connects')
    expect(html).toContain('SAP to everything else.')
    expect(html).toContain('I am Alexandre Junior, a full-stack engineer in São Paulo')
  })

  test('offers the CV of the page language as the one primary action', () => {
    const en = renderIn('en', <Hero />)
    expect(count(en, 'class="arrow-button"')).toBe(1)
    expect(en).toContain('href="/cv/CV_Alexandre_Junior_EN.pdf"')
    const pt = renderIn('pt', <Hero />)
    expect(pt).toContain('href="/cv/CV_Alexandre_Junior_BR.pdf"')
    expect(pt).toContain('Baixar CV')
  })

  test('shows the three figures as arrows', () => {
    const html = renderIn('en', <Hero />)
    expect(count(html, 'class="flow-step"')).toBe(3)
    for (const figure of ['>5+<', '>8<', '>1M+<']) expect(html).toContain(figure)
    expect(html).toContain('enterprise clients, from Whirlpool to Braskem')
  })
})

describe('Work', () => {
  test('is the section the navigation points to', () => {
    const html = renderIn('en', <Work />)
    expect(html).toMatch(/^<section id="work"/)
    expect(count(html, '<h2')).toBe(1)
  })

  test('tells four cases, each an article named by its own heading', () => {
    const html = renderIn('en', <Work />)
    expect(count(html, '<article')).toBe(4)
    for (const id of ['optimus', 'apis', 'braskem', 'advisor']) {
      expect(html).toContain(`aria-labelledby="case-${id}"`)
      expect(html).toContain(`id="case-${id}"`)
    }
    expect(html).toContain('Optimus Pricing')
    expect(html).toContain('Whirlpool, 2025')
  })

  test('draws six flows, three of them for the three generations of the API case', () => {
    const html = renderIn('en', <Work />)
    expect(count(html, 'class="flow flow-case"')).toBe(6)
    for (const client of ['Gerdau', 'RHI Magnesita', 'Bunge']) {
      expect(html).toContain(`<h4 class="t-lead font-display font-bold">${client}</h4>`)
    }
  })

  test('names the whole stack of a case, not only the SAP side', () => {
    const html = renderIn('en', <Work />)
    expect(html).toContain('Next.js, NestJS, AWS ECS, AWS Lambda, DynamoDB, S3, VTEX')
    expect(html).toContain('Python, React, Node.js, CI/CD, UI5, SAP API Management')
  })

  test('is translated', () => {
    const html = renderIn('es', <Work />)
    expect(html).toContain('Un problema, resuelto tres veces')
    expect(html).toContain('Hecho con')
    expect(html).toContain('Cola de aprobación')
  })
})

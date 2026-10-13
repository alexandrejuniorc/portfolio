import { describe, expect, test } from 'vitest'
import { absoluteUrl, buildHead, personJsonLd } from './seo'

const metaContent = (head: ReturnType<typeof buildHead>, key: string) =>
  head.meta.find(
    (tag) => ('name' in tag && tag.name === key) || ('property' in tag && tag.property === key),
  )

describe('absoluteUrl', () => {
  test('joins the site URL and a path, keeping the slash only on the home page', () => {
    expect(absoluteUrl('/')).toBe('https://example.test/')
    expect(absoluteUrl('/pt')).toBe('https://example.test/pt')
    expect(absoluteUrl('/og/en.png', 'https://alexandre.dev')).toBe(
      'https://alexandre.dev/og/en.png',
    )
  })
})

describe('buildHead', () => {
  test('titles and describes the page in its own language', () => {
    const en = buildHead('en')
    const pt = buildHead('pt')
    expect(en.meta[0]).toEqual({
      title: 'Alexandre Junior, software engineer for SAP BTP and the web',
    })
    expect(pt.meta[0]).toEqual({
      title: 'Alexandre Junior, engenheiro de software para SAP BTP e web',
    })
    expect(metaContent(pt, 'description')).toMatchObject({
      content: expect.stringContaining('Engenheiro de software full-stack'),
    })
  })

  test('points canonical at the page itself', () => {
    expect(buildHead('en').links[0]).toEqual({ rel: 'canonical', href: 'https://example.test/' })
    expect(buildHead('es').links[0]).toEqual({ rel: 'canonical', href: 'https://example.test/es' })
  })

  test('lists every language, plus x-default on the English page', () => {
    expect(buildHead('pt').links.slice(1)).toEqual([
      { rel: 'alternate', hrefLang: 'en', href: 'https://example.test/' },
      { rel: 'alternate', hrefLang: 'pt-BR', href: 'https://example.test/pt' },
      { rel: 'alternate', hrefLang: 'es', href: 'https://example.test/es' },
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://example.test/' },
    ])
  })

  test('gives link previews an image and a locale of their own', () => {
    const pt = buildHead('pt')
    expect(metaContent(pt, 'og:image')).toMatchObject({ content: 'https://example.test/og/pt.png' })
    expect(metaContent(pt, 'og:locale')).toMatchObject({ content: 'pt_BR' })
    expect(metaContent(pt, 'og:url')).toMatchObject({ content: 'https://example.test/pt' })
    expect(metaContent(pt, 'twitter:card')).toMatchObject({ content: 'summary_large_image' })
  })

  test('embeds a Person as JSON-LD', () => {
    const [script] = buildHead('es').scripts
    expect(script.type).toBe('application/ld+json')
    expect(JSON.parse(script.children)).toMatchObject({
      '@type': 'Person',
      name: 'Alexandre Junior',
      url: 'https://example.test/es',
      jobTitle: 'Ingeniero de software full-stack',
    })
  })
})

test('personJsonLd links the profiles a recruiter will check', () => {
  expect(personJsonLd('en').sameAs).toEqual([
    'https://www.linkedin.com/in/alexandrejuniorc/',
    'https://github.com/alexandrejuniorc',
  ])
})

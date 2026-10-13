import { describe, expect, test } from 'vitest'
import en from '../messages/en.json'
import es from '../messages/es.json'
import pt from '../messages/pt.json'

const catalogs = { en, pt, es } as Record<string, Record<string, string>>
const keysOf = (catalog: Record<string, string>) =>
  Object.keys(catalog)
    .filter((key) => key !== '$schema')
    .sort()

describe('message catalogs', () => {
  test.each(['pt', 'es'])('%s has exactly the keys of en', (locale) => {
    expect(keysOf(catalogs[locale])).toEqual(keysOf(catalogs.en))
  })

  test.each(Object.keys(catalogs))('%s has no empty message', (locale) => {
    const empty = Object.entries(catalogs[locale]).filter(([, text]) => String(text).trim() === '')
    expect(empty).toEqual([])
  })
})

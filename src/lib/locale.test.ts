import { expect, test } from 'vitest'
import { locales } from '@/paraglide/runtime'
import { cvHref, LOCALE_TAG, localePath, NATIVE_NAME } from './locale'

test('each locale has a public path without a trailing slash', () => {
  expect(locales.map(localePath)).toEqual(['/', '/pt', '/es'])
})

test('each locale has a BCP 47 tag and its own name', () => {
  expect(locales.map((locale) => LOCALE_TAG[locale])).toEqual(['en', 'pt-BR', 'es'])
  expect(locales.map((locale) => NATIVE_NAME[locale])).toEqual(['English', 'Português', 'Español'])
})

test('Portuguese gets the Brazilian CV; English and Spanish get the English one', () => {
  expect(cvHref('pt')).toBe('/cv/CV_Alexandre_Junior_BR.pdf')
  expect(cvHref('en')).toBe('/cv/CV_Alexandre_Junior_EN.pdf')
  expect(cvHref('es')).toBe('/cv/CV_Alexandre_Junior_EN.pdf')
})

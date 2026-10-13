import { expect, test } from 'vitest'
import { resolveSiteUrl } from './site-url'

test('an explicit VITE_SITE_URL wins and loses its trailing slash', () => {
  expect(
    resolveSiteUrl({
      VITE_SITE_URL: 'https://alexandre.dev/',
      VERCEL_PROJECT_PRODUCTION_URL: 'x.vercel.app',
    }),
  ).toBe('https://alexandre.dev')
})

test('on Vercel the production domain is used, with https', () => {
  expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'portfolio.vercel.app' })).toBe(
    'https://portfolio.vercel.app',
  )
})

test('with nothing set it is the local dev address', () => {
  expect(resolveSiteUrl({})).toBe('http://localhost:3000')
})

test('blank values count as unset', () => {
  expect(resolveSiteUrl({ VITE_SITE_URL: '  ', VERCEL_PROJECT_PRODUCTION_URL: '' })).toBe(
    'http://localhost:3000',
  )
})

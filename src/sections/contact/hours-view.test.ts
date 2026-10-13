import { expect, test } from 'vitest'
import { buildHoursView } from './hours-view'

const JULY_NOON_UTC = new Date('2026-07-01T12:00:00Z')

test('tells a visitor in Berlin how many working hours they share, in the page language', () => {
  expect(buildHoursView(JULY_NOON_UTC, 120, 'en').sentence).toBe('We share 4 working hours today.')
  expect(buildHoursView(JULY_NOON_UTC, 120, 'pt').sentence).toBe(
    'Temos 4 horas de trabalho em comum hoje.',
  )
  expect(buildHoursView(JULY_NOON_UTC, 120, 'es').sentence).toBe(
    'Compartimos 4 horas de trabajo hoy.',
  )
})

test('uses the singular for exactly one hour', () => {
  expect(buildHoursView(JULY_NOON_UTC, 300, 'en').sentence).toBe('We share 1 working hour today.')
})

test('says so plainly when the working days do not meet', () => {
  expect(buildHoursView(JULY_NOON_UTC, 540, 'en').sentence).toBe(
    'Our working days do not overlap today. Email works best.',
  )
})

test('writes fractions the way the language writes them', () => {
  expect(buildHoursView(JULY_NOON_UTC, 345, 'en').sentence).toBe(
    'We share 0.25 working hours today.',
  )
  expect(buildHoursView(JULY_NOON_UTC, 345, 'pt').sentence).toBe(
    'Temos 0,25 horas de trabalho em comum hoje.',
  )
})

test('shows the time in São Paulo on a 24-hour clock', () => {
  expect(buildHoursView(JULY_NOON_UTC, 120, 'en').hostLine).toBe(
    'Alexandre, 9:00 to 18:00 in São Paulo. It is 09:00 there now.',
  )
})

test('carries the two rows of the day', () => {
  const view = buildHoursView(JULY_NOON_UTC, 120, 'en')
  expect(view.rows.host).toHaveLength(48)
  expect(view.rows.visitor).toHaveLength(48)
})

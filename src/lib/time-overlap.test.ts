import { describe, expect, test } from 'vitest'
import {
  dayRows,
  describeOverlap,
  minutesToHours,
  offsetMinutes,
  SLOTS_PER_DAY,
  sharedWorkingMinutes,
} from './time-overlap'

const SAO_PAULO = -180
const countState = (slots: Array<{ state: string }>, state: string) =>
  slots.filter((slot) => slot.state === state).length

describe('offsetMinutes', () => {
  test.each([
    ['America/Sao_Paulo', '2026-10-13T12:00:00Z', -180],
    ['Europe/Berlin', '2026-07-01T12:00:00Z', 120],
    ['Europe/Berlin', '2026-01-15T12:00:00Z', 60],
    ['America/Los_Angeles', '2026-07-01T12:00:00Z', -420],
    ['Asia/Kolkata', '2026-10-13T12:00:00Z', 330],
    ['Asia/Kathmandu', '2026-10-13T12:00:00Z', 345],
    ['UTC', '2026-10-13T23:59:59.999Z', 0],
  ])('%s at %s is %i minutes from UTC', (timeZone, at, expected) => {
    expect(offsetMinutes(timeZone, new Date(at))).toBe(expected)
  })
})

describe('sharedWorkingMinutes', () => {
  test.each([
    ['the same time zone', SAO_PAULO, 540],
    ['Berlin in summer', 120, 240],
    ['Berlin in winter', 60, 300],
    ['Los Angeles in summer', -420, 300],
    ['Karachi, eight hours ahead', 300, 60],
    ['India, on a half-hour offset', 330, 30],
    ['Nepal, on a 45-minute offset', 345, 15],
    ['Tokyo, on the other side of the day', 540, 0],
    ['Kiritimati, seventeen hours ahead', 840, 120],
    ['Baker Island, nine hours behind', -720, 0],
  ])('with a visitor in %s', (_place, visitorOffset, expected) => {
    expect(sharedWorkingMinutes(SAO_PAULO, visitorOffset)).toBe(expected)
  })

  test('is the same whichever side asks', () => {
    for (const offset of [-720, -420, 0, 120, 330, 345, 540, 840]) {
      expect(sharedWorkingMinutes(SAO_PAULO, offset)).toBe(sharedWorkingMinutes(offset, SAO_PAULO))
    }
  })

  test('is never negative, never more than a working day, for any offset on Earth', () => {
    for (let offset = -720; offset <= 840; offset += 15) {
      const minutes = sharedWorkingMinutes(SAO_PAULO, offset)
      expect(Number.isInteger(minutes)).toBe(true)
      expect(minutes).toBeGreaterThanOrEqual(0)
      expect(minutes).toBeLessThanOrEqual(540)
    }
  })
})

describe('dayRows', () => {
  test('draws one day of half-hour slots for each person, on the visitor clock', () => {
    const rows = dayRows(SAO_PAULO, 120)
    expect(rows.host).toHaveLength(SLOTS_PER_DAY)
    expect(rows.visitor).toHaveLength(SLOTS_PER_DAY)
    expect(rows.visitor.map((slot) => slot.minute).slice(0, 3)).toEqual([0, 30, 60])
    expect(rows.visitor.at(-1)?.minute).toBe(1410)
  })

  test('a visitor in Berlin shares 14:00 to 18:00 of their day', () => {
    const rows = dayRows(SAO_PAULO, 120)
    const shared = rows.visitor.filter((slot) => slot.state === 'shared').map((slot) => slot.minute)
    expect(shared).toEqual([840, 870, 900, 930, 960, 990, 1020, 1050])
    expect(rows.host.filter((slot) => slot.state === 'shared').map((slot) => slot.minute)).toEqual(
      shared,
    )
    expect(countState(rows.visitor, 'work')).toBe(10)
    expect(countState(rows.host, 'work')).toBe(10)
  })

  test('in the same time zone the two rows are identical', () => {
    const rows = dayRows(SAO_PAULO, SAO_PAULO)
    expect(rows.host).toEqual(rows.visitor)
    expect(countState(rows.host, 'shared')).toBe(18)
  })

  test('the shared slots add up to the shared minutes on half-hour offsets', () => {
    for (const offset of [-420, 0, 60, 120, 330, 540]) {
      const rows = dayRows(SAO_PAULO, offset)
      expect(countState(rows.host, 'shared') * 30).toBe(sharedWorkingMinutes(SAO_PAULO, offset))
    }
  })
})

test('minutesToHours keeps at most two decimals', () => {
  expect(minutesToHours(240)).toBe(4)
  expect(minutesToHours(210)).toBe(3.5)
  expect(minutesToHours(15)).toBe(0.25)
  expect(minutesToHours(100)).toBe(1.67)
  expect(minutesToHours(0)).toBe(0)
})

describe('describeOverlap', () => {
  test('follows daylight saving time of the visitor through the year', () => {
    expect(describeOverlap(new Date('2026-07-01T12:00:00Z'), 120, 'America/Sao_Paulo').hours).toBe(
      4,
    )
    expect(describeOverlap(new Date('2026-01-15T12:00:00Z'), 60, 'America/Sao_Paulo').hours).toBe(5)
  })

  test('returns the minutes and the rows behind the figure', () => {
    const overlap = describeOverlap(new Date('2026-07-01T12:00:00Z'), 345, 'America/Sao_Paulo')
    expect(overlap.minutes).toBe(15)
    expect(overlap.hours).toBe(0.25)
    expect(overlap.rows.host).toHaveLength(SLOTS_PER_DAY)
  })
})

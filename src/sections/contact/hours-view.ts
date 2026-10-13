import { SITE } from '@/config/site'
import { LOCALE_TAG } from '@/lib/locale'
import { type DayRows, describeOverlap } from '@/lib/time-overlap'
import { m } from '@/paraglide/messages'
import type { Locale } from '@/paraglide/runtime'

export type HoursView = { sentence: string; hostLine: string; rows: DayRows }

/** Turns one instant and one visitor offset into the words and rows the contact section shows. */
export function buildHoursView(now: Date, visitorOffset: number, locale: Locale): HoursView {
  const tag = LOCALE_TAG[locale]
  const { hours, rows } = describeOverlap(now, visitorOffset, SITE.hostTimeZone)

  let sentence: string
  if (hours === 0) sentence = m.overlap_none({}, { locale })
  else if (hours === 1) sentence = m.overlap_one({}, { locale })
  else {
    const formatted = new Intl.NumberFormat(tag, { maximumFractionDigits: 2 }).format(hours)
    sentence = m.overlap_many({ hours: formatted }, { locale })
  }

  const time = new Intl.DateTimeFormat(tag, {
    timeZone: SITE.hostTimeZone,
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  return { sentence, hostLine: m.overlap_host({ time }, { locale }), rows }
}

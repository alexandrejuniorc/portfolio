export const MINUTES_PER_DAY = 1440
export const SLOTS_PER_DAY = 48

/** Minutes after local midnight. */
export type Workday = { startMinute: number; endMinute: number }
export const DEFAULT_WORKDAY: Workday = { startMinute: 9 * 60, endMinute: 18 * 60 }

export type SlotState = 'off' | 'work' | 'shared'
/** Half an hour of a day. `minute` is where it starts on the visitor's clock. */
export type Slot = { minute: number; state: SlotState }
export type DayRows = { host: Slot[]; visitor: Slot[] }

const mod = (value: number, modulus: number) => ((value % modulus) + modulus) % modulus

/** Minutes east of UTC for an IANA time zone at a given instant: Berlin in July is 120. */
export function offsetMinutes(timeZone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((item) => item.type === type)?.value)
  const wallClockAsUtc = Date.UTC(
    part('year'),
    part('month') - 1,
    part('day'),
    part('hour'),
    part('minute'),
    part('second'),
  )
  // `|| 0` turns the -0 that rounding a few negative milliseconds gives into 0.
  return Math.round((wallClockAsUtc - at.getTime()) / 60000) || 0
}

/** The working day of someone at this offset, as [start, end) in UTC minutes. `end` may pass 1440. */
function utcWindow(offset: number, workday: Workday): [number, number] {
  const start = mod(workday.startMinute - offset, MINUTES_PER_DAY)
  return [start, start + (workday.endMinute - workday.startMinute)]
}

/** Minutes of the day during which both people are at work. */
export function sharedWorkingMinutes(
  hostOffset: number,
  visitorOffset: number,
  workday: Workday = DEFAULT_WORKDAY,
): number {
  const [hostStart, hostEnd] = utcWindow(hostOffset, workday)
  const [visitorStart, visitorEnd] = utcWindow(visitorOffset, workday)
  let total = 0
  // The windows live on a 24-hour circle, so compare against the day before and after too.
  for (const shift of [-MINUTES_PER_DAY, 0, MINUTES_PER_DAY]) {
    const start = Math.max(hostStart, visitorStart + shift)
    const end = Math.min(hostEnd, visitorEnd + shift)
    total += Math.max(0, end - start)
  }
  return total
}

/** One day in half-hour slots for each person, laid out on the visitor's clock from midnight. */
export function dayRows(
  hostOffset: number,
  visitorOffset: number,
  workday: Workday = DEFAULT_WORKDAY,
): DayRows {
  const slotMinutes = MINUTES_PER_DAY / SLOTS_PER_DAY
  const atWork = (minute: number) => minute >= workday.startMinute && minute < workday.endMinute
  const host: Slot[] = []
  const visitor: Slot[] = []

  for (let index = 0; index < SLOTS_PER_DAY; index += 1) {
    const minute = index * slotMinutes
    // Judge each slot by its middle, so offsets of 15 or 45 minutes round to the nearer side.
    const visitorMiddle = minute + slotMinutes / 2
    const hostMiddle = mod(visitorMiddle - visitorOffset + hostOffset, MINUTES_PER_DAY)
    const visitorWorks = atWork(visitorMiddle)
    const hostWorks = atWork(hostMiddle)
    const shared = visitorWorks && hostWorks
    host.push({ minute, state: shared ? 'shared' : hostWorks ? 'work' : 'off' })
    visitor.push({ minute, state: shared ? 'shared' : visitorWorks ? 'work' : 'off' })
  }

  return { host, visitor }
}

/** 240 is 4, 210 is 3.5, 15 is 0.25. */
export function minutesToHours(minutes: number): number {
  return Math.round((minutes / 60) * 100) / 100
}

/** Everything the contact section shows about one visitor at one instant. */
export function describeOverlap(
  now: Date,
  visitorOffset: number,
  hostTimeZone: string,
  workday: Workday = DEFAULT_WORKDAY,
): { minutes: number; hours: number; rows: DayRows } {
  const hostOffset = offsetMinutes(hostTimeZone, now)
  const minutes = sharedWorkingMinutes(hostOffset, visitorOffset, workday)
  return {
    minutes,
    hours: minutesToHours(minutes),
    rows: dayRows(hostOffset, visitorOffset, workday),
  }
}

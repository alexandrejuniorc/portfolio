import { useEffect, useState } from 'react'
import type { Slot } from '@/lib/time-overlap'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { buildHoursView, type HoursView } from './hours-view'

/**
 * The one live thing on the page: how many working hours this visitor shares with Alexandre
 * today. The prerendered HTML carries a fixed sentence; the figure appears after hydration,
 * because only the browser knows the visitor's time zone.
 */
export function WorkingHours() {
  const [view, setView] = useState<HoursView | null>(null)

  useEffect(() => {
    const locale = getLocale()
    const update = () => {
      const now = new Date()
      setView(buildHoursView(now, -now.getTimezoneOffset(), locale))
    }
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  if (!view) return <p className="t-lead">{m.overlap_static()}</p>

  return (
    <div>
      <p className="t-lead" aria-live="polite">
        {view.sentence}
      </p>
      <p className="t-small mt-6">{view.hostLine}</p>
      <HoursRow slots={view.rows.host} />
      <p className="t-small mt-4">{m.overlap_visitor()}</p>
      <HoursRow slots={view.rows.visitor} />
    </div>
  )
}

/** Decorative: the sentence above already says what the row shows. */
function HoursRow({ slots }: { slots: Slot[] }) {
  return (
    <div className="hours-row mt-2" aria-hidden="true">
      {slots.map((slot) => (
        <i key={slot.minute} data-state={slot.state} />
      ))}
    </div>
  )
}

import { ArrowButton } from '@/components/ArrowButton'
import { Flow } from '@/components/Flow'
import { stats } from '@/content/stats'
import { cvHref } from '@/lib/locale'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

/** First screen: who he is, the one action, and three figures as arrows running off the edge. */
export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-copy">
        <h1 className="t-display">
          <span className="rise block" style={order(0)}>
            {m.hero_title_line1()}
          </span>
          <span className="rise block" style={order(1)}>
            {m.hero_title_line2()}
          </span>
        </h1>
        <p className="t-lead rise mt-6 max-w-[40rem]" style={order(2)}>
          {m.hero_lead()}
        </p>
        <div className="rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={order(3)}>
          <ArrowButton href={cvHref(getLocale())} download>
            {m.hero_cta()}
          </ArrowButton>
          <a className="link" href="#work">
            {m.hero_secondary()}
          </a>
        </div>
      </div>

      <Flow
        variant="hero"
        as="ul"
        label={m.hero_stats_label()}
        items={stats.map((stat) => ({
          key: stat.id,
          content: (
            <>
              <span className="t-display block">{stat.value}</span>
              <span className="flow-caption">{stat.label()}</span>
            </>
          ),
        }))}
      />
    </section>
  )
}

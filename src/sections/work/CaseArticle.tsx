import { Flow } from '@/components/Flow'
import type { CaseStudy } from '@/content/types'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'

/** One case: what it is, the full stack, and how the solution flows. Architecture only, never a screen. */
export function CaseArticle({ item }: { item: CaseStudy }) {
  const headingId = `case-${item.id}`

  return (
    <article aria-labelledby={headingId}>
      <header data-reveal>
        <h3 id={headingId} className="t-heading">
          {item.title()}
        </h3>
        <p className="mt-3 text-muted">{item.meta()}</p>
      </header>

      <div className="mt-8 grid gap-x-8 gap-y-6 lg:grid-cols-12" data-reveal style={order(1)}>
        <p className="t-lead lg:col-span-7">{item.intro()}</p>
        <p className="lg:col-span-4 lg:col-start-9">
          <span className="text-muted">{m.work_built_with()}</span> {item.stack.join(', ')}
        </p>
      </div>

      {/* Each flow runs the full width of the page, so four steps always have room for their labels. */}
      <div className="mt-12 flex flex-col gap-12">
        {item.parts.map((part, index) => (
          <div key={part.id} data-reveal style={order(index + 2)}>
            {part.heading ? (
              <h4 className="t-lead font-display font-bold">{part.heading}</h4>
            ) : null}
            <p className={part.heading ? 'mt-2 max-w-[60ch]' : 'max-w-[60ch]'}>{part.text()}</p>
            <Flow
              variant="case"
              items={part.steps.map((step, position) => ({
                key: `${part.id}-${position}`,
                content: (
                  <>
                    <span className="flow-label">{step.label()}</span>
                    {step.tech ? <span className="flow-tech t-small">{step.tech}</span> : null}
                  </>
                ),
              }))}
            />
          </div>
        ))}
      </div>
    </article>
  )
}

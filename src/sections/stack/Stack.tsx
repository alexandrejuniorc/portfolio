import { Flow } from '@/components/Flow'
import { stackSides } from '@/content/stack'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'

/** Two blocks of the same size, locked together by the arrow: neither stack is the footnote. */
export function Stack() {
  return (
    <section id="stack" className="section-pad">
      <div className="wrap grid gap-x-8 gap-y-6 md:grid-cols-12">
        <h2 className="t-heading md:col-span-6" data-reveal>
          {m.stack_heading()}
        </h2>
        <p className="t-lead md:col-span-5 md:col-start-8" data-reveal style={order(1)}>
          {m.stack_note()}
        </p>
      </div>

      <div className="mt-12 md:mt-16" data-reveal>
        <Flow
          variant="stack"
          as="ul"
          items={stackSides.map((side) => ({
            key: side.id,
            content: (
              <>
                <h3 className="t-heading">{side.title()}</h3>
                <ul className="arrow-bullets mt-6 columns-2 gap-x-8">
                  {side.items.map((name) => (
                    <li key={name} className="mb-1 break-inside-avoid">
                      {name}
                    </li>
                  ))}
                </ul>
              </>
            ),
          }))}
        />
      </div>
    </section>
  )
}

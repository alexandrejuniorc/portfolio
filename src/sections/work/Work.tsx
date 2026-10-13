import { cases } from '@/content/cases'
import { m } from '@/paraglide/messages'
import { CaseArticle } from './CaseArticle'

/** The section heading is for assistive technology only: each case title already leads at heading size. */
export function Work() {
  return (
    <section id="work" className="section-pad">
      <div className="wrap">
        <h2 className="sr-only">{m.work_heading()}</h2>
        <div className="flex flex-col gap-24 md:gap-40">
          {cases.map((item) => (
            <CaseArticle key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

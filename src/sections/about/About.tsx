import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'

/** The person behind the work, on a field one tone away from the page. */
export function About() {
  return (
    <section id="about" className="section-pad bg-surface">
      <div className="wrap grid gap-x-8 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="t-heading" data-reveal>
            {m.about_heading()}
          </h2>
          <p className="t-lead mt-8 max-w-[38rem]" data-reveal style={order(1)}>
            {m.about_bio()}
          </p>
        </div>

        <dl
          className="flex flex-col gap-8 md:col-span-4 md:col-start-9"
          data-reveal
          style={order(2)}
        >
          <div>
            <dt className="font-display font-bold">{m.about_education_title()}</dt>
            <dd className="mt-2">{m.about_edu_bsc()}</dd>
            <dd className="mt-2">{m.about_edu_tech()}</dd>
          </div>
          <div>
            <dt className="font-display font-bold">{m.about_languages_title()}</dt>
            <dd className="mt-2">{m.about_lang_pt()}</dd>
            <dd className="mt-2">{m.about_lang_en()}</dd>
          </div>
          <div>
            <dt className="font-display font-bold">{m.about_location_title()}</dt>
            <dd className="mt-2">{m.about_location()}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

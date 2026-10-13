import { SITE } from '@/config/site'
import { cvHref } from '@/lib/locale'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { WorkingHours } from './WorkingHours'

/** The whole field turns to the deepest blue, and the address is the largest thing in it. */
export function Contact() {
  return (
    <section id="contact" className="section-pad bg-arrow-1 text-arrow-1-ink">
      <div className="wrap">
        <h2 className="t-heading" data-reveal>
          {m.contact_heading()}
        </h2>
        <p className="t-lead mt-4" data-reveal style={order(1)}>
          {m.contact_lead()}
        </p>

        <a
          className="contact-email t-display mt-12"
          href={`mailto:${SITE.email}`}
          translate="no"
          data-reveal
          style={order(2)}
        >
          {SITE.email}
        </a>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-12">
          <ul className="md:col-span-4" data-reveal>
            <li>
              <a className="nav-link -ml-2.5" href={cvHref(getLocale())} download>
                {m.contact_cv()}
              </a>
            </li>
            <li>
              <a className="nav-link -ml-2.5" href={SITE.linkedin} rel="me noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="nav-link -ml-2.5" href={SITE.github} rel="me noopener">
                GitHub
              </a>
            </li>
          </ul>
          <div className="md:col-span-7 md:col-start-6" data-reveal style={order(1)}>
            <WorkingHours />
          </div>
        </div>
      </div>
    </section>
  )
}

import { proofs } from '@/content/proof'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'

/** One line per credential at heading size, with the issuer and year at the other end. */
export function Proof() {
  return (
    <section id="proof" className="section-pad">
      <div className="wrap">
        <h2 className="t-heading text-muted" data-reveal>
          {m.proof_heading()}
        </h2>
        <ul className="mt-4">
          {proofs.map((proof, index) => (
            <li
              key={proof.id}
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-2"
              data-reveal
              style={order(index + 1)}
            >
              <span className="t-heading">{proof.title()}</span>
              <span className="text-muted tabular-nums">
                {proof.issuer}, {proof.year}
                {proof.href ? (
                  <>
                    {' '}
                    <a className="link" href={proof.href} rel="noopener">
                      {m.proof_credential()}
                    </a>
                  </>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

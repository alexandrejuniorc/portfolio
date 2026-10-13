import { createFileRoute } from '@tanstack/react-router'
import { RevealObserver } from '@/components/RevealObserver'
import { SiteHeader } from '@/components/SiteHeader'
import { buildHead } from '@/lib/seo'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

export const Route = createFileRoute('/')({
  head: () => buildHead(getLocale()),
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        {m.skip_to_content()}
      </a>
      <SiteHeader />
      <main id="main">
        <h1 className="t-display wrap pt-40">
          <span className="block">{m.hero_title_line1()}</span>
          <span className="block">{m.hero_title_line2()}</span>
        </h1>
      </main>
      <RevealObserver />
    </>
  )
}

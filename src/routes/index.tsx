import { createFileRoute } from '@tanstack/react-router'
import { RevealObserver } from '@/components/RevealObserver'
import { SiteHeader } from '@/components/SiteHeader'
import { buildHead } from '@/lib/seo'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { Hero } from '@/sections/hero/Hero'
import { Work } from '@/sections/work/Work'

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
        <Hero />
        <Work />
      </main>
      <RevealObserver />
    </>
  )
}

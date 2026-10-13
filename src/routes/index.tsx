import { createFileRoute } from '@tanstack/react-router'
import { RevealObserver } from '@/components/RevealObserver'
import { SiteHeader } from '@/components/SiteHeader'
import { buildHead } from '@/lib/seo'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { About } from '@/sections/about/About'
import { Clients } from '@/sections/clients/Clients'
import { Contact } from '@/sections/contact/Contact'
import { Footer } from '@/sections/footer/Footer'
import { Hero } from '@/sections/hero/Hero'
import { Proof } from '@/sections/proof/Proof'
import { Stack } from '@/sections/stack/Stack'
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
        <Stack />
        <Clients />
        <Proof />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}

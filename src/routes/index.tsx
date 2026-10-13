import { createFileRoute } from '@tanstack/react-router'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { ThemeToggle } from '@/components/ThemeToggle'
import { buildHead } from '@/lib/seo'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

export const Route = createFileRoute('/')({
  head: () => buildHead(getLocale()),
  component: HomePage,
})

function HomePage() {
  return (
    <main id="main">
      <h1>
        <span className="block">{m.hero_title_line1()}</span>
        <span className="block">{m.hero_title_line2()}</span>
      </h1>
      <LanguageSwitch />
      <ThemeToggle />
    </main>
  )
}

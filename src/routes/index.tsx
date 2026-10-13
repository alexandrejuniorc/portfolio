import { createFileRoute } from '@tanstack/react-router'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: `${m.hero_title_line1()} ${m.hero_title_line2()}` }] }),
  component: HomePage,
})

function HomePage() {
  return (
    <main id="main">
      <h1>
        <span className="block">{m.hero_title_line1()}</span>
        <span className="block">{m.hero_title_line2()}</span>
      </h1>
    </main>
  )
}

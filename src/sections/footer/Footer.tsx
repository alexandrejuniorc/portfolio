import { LanguageSwitch } from '@/components/LanguageSwitch'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SITE } from '@/config/site'
import { m } from '@/paraglide/messages'

/** The name returns at display size; the switches are within reach again at the end of the page. */
export function Footer() {
  return (
    <footer className="wrap py-16">
      <p className="t-display">{SITE.name}</p>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="text-muted">{m.footer_built_with()}</p>
        <div className="flex flex-wrap items-center gap-x-4">
          <LanguageSwitch />
          <ThemeToggle />
          <a className="nav-link" href="#main">
            {m.footer_top()}
          </a>
        </div>
      </div>
    </footer>
  )
}

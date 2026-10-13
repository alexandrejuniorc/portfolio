import { useEffect, useRef } from 'react'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SITE } from '@/config/site'
import { localePath } from '@/lib/locale'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

const SECTIONS = [
  { href: '#work', label: m.nav_work },
  { href: '#stack', label: m.nav_stack },
  { href: '#clients', label: m.nav_clients },
  { href: '#contact', label: m.nav_contact },
]

/**
 * A plain row over the first screen: no bar, no background. The full row needs 1024px;
 * below that the links move into the menu, because at 768px they are wider than the screen.
 */
export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null)

  // Following a link inside the phone menu closes it. One listener on the disclosure, so the
  // links stay plain anchors.
  useEffect(() => {
    const details = menu.current
    if (!details) return
    const closeOnLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        details.removeAttribute('open')
      }
    }
    details.addEventListener('click', closeOnLink)
    return () => details.removeEventListener('click', closeOnLink)
  }, [])

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <a
          className="nav-link -ml-2.5 font-display font-bold"
          href={localePath(getLocale())}
          translate="no"
        >
          {SITE.name}
        </a>

        <div className="hidden items-center gap-4 lg:flex">
          <nav aria-label={m.nav_label()}>
            <ul className="flex">
              {SECTIONS.map((section) => (
                <li key={section.href}>
                  <a className="nav-link" href={section.href}>
                    {section.label()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        {/* A native disclosure: the phone menu opens without JavaScript. */}
        <details ref={menu} className="menu lg:hidden">
          <summary className="nav-link -mr-2.5">{m.nav_menu()}</summary>
          <div className="menu-panel">
            <nav aria-label={m.nav_label()}>
              <ul>
                {SECTIONS.map((section) => (
                  <li key={section.href}>
                    <a className="nav-link" href={section.href}>
                      {section.label()}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </details>
      </div>
    </header>
  )
}

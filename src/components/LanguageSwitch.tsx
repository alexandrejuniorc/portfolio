import { LOCALE_TAG, localePath, NATIVE_NAME } from '@/lib/locale'
import { m } from '@/paraglide/messages'
import { getLocale, locales } from '@/paraglide/runtime'

/** Plain links: each language is its own prerendered page, so this works without JavaScript. */
export function LanguageSwitch() {
  const current = getLocale()

  return (
    <nav aria-label={m.language_label()}>
      <ul className="flex">
        {locales.map((locale) => (
          <li key={locale}>
            <a
              className="nav-link"
              href={localePath(locale)}
              hrefLang={LOCALE_TAG[locale]}
              lang={LOCALE_TAG[locale]}
              aria-current={locale === current ? 'true' : undefined}
            >
              {/* The full name is read out; the code stays part of the accessible name for voice control. */}
              {locale.toUpperCase()}
              <span className="sr-only"> {NATIVE_NAME[locale]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

import { type Locale, localizeHref } from '@/paraglide/runtime'

/** BCP 47 tags for <html lang> and hreflang. */
export const LOCALE_TAG: Record<Locale, string> = { en: 'en', pt: 'pt-BR', es: 'es' }

/** Each language named in itself, for the language switch. */
export const NATIVE_NAME: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
}

/** Public path of the page in a locale, without a trailing slash: "/", "/pt", "/es". */
export function localePath(locale: Locale): string {
  const href = localizeHref('/', { locale })
  return href.length > 1 ? href.replace(/\/+$/, '') : href
}

/** There is no Spanish CV, so Spanish readers get the English one. */
export function cvHref(locale: Locale): string {
  return locale === 'pt' ? '/cv/CV_Alexandre_Junior_BR.pdf' : '/cv/CV_Alexandre_Junior_EN.pdf'
}

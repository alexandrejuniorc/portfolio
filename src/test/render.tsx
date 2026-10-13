import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { type Locale, overwriteGetLocale } from '@/paraglide/runtime'

/** Renders a component to an HTML string as the page would in the given locale. */
export function renderIn(locale: Locale, element: ReactElement): string {
  overwriteGetLocale(() => locale)
  return renderToStaticMarkup(element)
}

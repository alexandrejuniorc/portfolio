import displayFont from '@fontsource-variable/red-hat-display/files/red-hat-display-latin-wght-normal.woff2?url'
import textFont from '@fontsource-variable/red-hat-text/files/red-hat-text-latin-wght-normal.woff2?url'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { LOCALE_TAG } from '@/lib/locale'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { getLocale } from '@/paraglide/runtime'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#07090d' },
    ],
    links: [
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: displayFont,
        crossOrigin: 'anonymous',
      },
      { rel: 'preload', as: 'font', type: 'font/woff2', href: textFont, crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    // The theme script in <head> may change data-theme before React hydrates.
    <html lang={LOCALE_TAG[getLocale()]} data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

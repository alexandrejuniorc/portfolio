import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { paraglideOptions } from './i18n.config.ts'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    paraglideVitePlugin(paraglideOptions),
    tanstackStart({
      // crawlLinks stays off: the crawler follows the links to the CV and rewrites the PDFs
      // as text, which corrupts them. The three pages are listed by hand instead.
      prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: true, failOnError: true },
      pages: [{ path: '/' }, { path: '/pt' }, { path: '/es' }],
    }),
    viteReact(),
    tailwindcss(),
  ],
})

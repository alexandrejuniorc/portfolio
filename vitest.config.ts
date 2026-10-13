import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vitest/config'
import { paraglideOptions } from './i18n.config.ts'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  define: { __SITE_URL__: JSON.stringify('https://example.test') },
  plugins: [paraglideVitePlugin(paraglideOptions)],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
})

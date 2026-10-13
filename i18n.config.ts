import type { paraglideVitePlugin } from '@inlang/paraglide-js'

type ParaglideOptions = Parameters<typeof paraglideVitePlugin>[0]

/**
 * One set of compiler options for the build and for the tests. If the two differed,
 * whichever ran last would overwrite src/paraglide with a different runtime.
 */
export const paraglideOptions: ParaglideOptions = {
  project: './project.inlang',
  outdir: './src/paraglide',
  outputStructure: 'message-modules',
  // Only the URL picks the locale, so every page can be prerendered and served as a file.
  strategy: ['url', 'baseLocale'],
  urlPatterns: [
    {
      pattern: '/:path(.*)?',
      localized: [
        ['pt', '/pt/:path(.*)?'],
        ['es', '/es/:path(.*)?'],
        ['en', '/:path(.*)?'],
      ],
    },
  ],
}

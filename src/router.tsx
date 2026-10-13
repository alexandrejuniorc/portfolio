import { createRouter } from '@tanstack/react-router'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'
import { routeTree } from './routeTree.gen'

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    // "/pt" is the same route as "/": Paraglide strips and restores the locale segment.
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  })

import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server.js'

// Only runs during prerendering: it tells Paraglide which locale each URL is in.
export default {
  fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, () => handler.fetch(req))
  },
}

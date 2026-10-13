import { m } from '@/paraglide/messages'
import type { Proof } from './types'

/** Newest first. `href` is the public credential page; leave it out when there is none. */
export const proofs: Proof[] = [
  { id: 'fiori', title: m.proof_fiori, issuer: 'SAP', year: 2026 },
  { id: 'genai', title: m.proof_genai, issuer: 'SAP', year: 2026 },
  { id: 'build', title: m.proof_build, issuer: 'SAP', year: 2025 },
  { id: 'hack2build', title: m.proof_hack2build, issuer: 'SAP', year: 2024 },
]

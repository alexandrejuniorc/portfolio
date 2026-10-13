import { m } from '@/paraglide/messages'
import type { Proof } from './types'

/** Newest first. `href` is the public credential page; leave it out when there is none. */
export const proofs: Proof[] = [
  {
    id: 'fiori',
    title: m.proof_fiori,
    issuer: 'SAP',
    year: 2026,
    href: 'https://www.credly.com/badges/278d036f-b8cb-4ff8-a007-b3989a08a818/linked_in_profile',
  },
  {
    id: 'genai',
    title: m.proof_genai,
    issuer: 'SAP',
    year: 2026,
    href: 'https://www.credly.com/badges/fc0fc302-1035-436f-9d1d-32c03d717bb6/linked_in_profile',
  },
  {
    id: 'build',
    title: m.proof_build,
    issuer: 'SAP',
    year: 2025,
    href: 'https://www.credly.com/badges/ed990ba5-c82d-43ff-8f26-f2eb8c5d49f0/linked_in_profile',
  },
  {
    id: 'hack2build',
    title: m.proof_hack2build,
    issuer: 'SAP',
    year: 2024,
    href: 'https://www.credly.com/badges/afa63212-2ad1-43fa-bac4-8ecdc65d0401/linked_in_profile',
  },
]

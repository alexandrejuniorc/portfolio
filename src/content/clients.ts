import { m } from '@/paraglide/messages'
import type { Client } from './types'

export const clients: Client[] = [
  { id: 'whirlpool', name: 'Whirlpool', work: m.client_whirlpool },
  { id: 'gerdau', name: 'Gerdau', work: m.client_gerdau },
  { id: 'rhi', name: 'RHI Magnesita', work: m.client_rhi },
  { id: 'bunge', name: 'Bunge', work: m.client_bunge },
  { id: 'braskem', name: 'Braskem', work: m.client_braskem },
  { id: 'piracanjuba', name: 'Piracanjuba', work: m.client_piracanjuba },
  { id: 'zilor', name: 'Zilor', work: m.client_zilor },
  { id: 'bemol', name: 'Bemol', work: m.client_bemol },
]

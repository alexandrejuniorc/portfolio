import type { Locale } from '@/paraglide/runtime'

/** A compiled Paraglide message without parameters. Call it bare for the active locale. */
export type Msg = (inputs?: Record<string, never>, options?: { locale?: Locale }) => string

/** One step of a solution, drawn as an arrow. `tech` is a product name and is never translated. */
export type FlowStep = { label: Msg; tech?: string }

/** A flow with the paragraph that explains it. `heading` is set when a case has several parts. */
export type CasePart = { id: string; heading?: string; text: Msg; steps: FlowStep[] }

export type CaseStudy = {
  id: string
  title: Msg
  /** Client and year, as a short line. */
  meta: Msg
  intro: Msg
  stack: string[]
  parts: CasePart[]
}

export type Client = { id: string; name: string; work: Msg }

export type Proof = { id: string; title: Msg; issuer: string; year: number; href?: string }

export type StackSide = { id: 'sap' | 'web'; title: Msg; items: string[] }

/** A hero figure. `value` reads the same in every language. */
export type Stat = { id: string; value: string; label: Msg }

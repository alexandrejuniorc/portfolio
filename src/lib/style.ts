import type { CSSProperties } from 'react'

/** Sets --order, which staggers the entrance of sibling elements. */
export const order = (index: number) => ({ '--order': index }) as CSSProperties

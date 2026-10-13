import type { ReactNode } from 'react'

export type FlowItem = { key: string; content: ReactNode }

type FlowProps = {
  items: FlowItem[]
  /** hero: three blues, full bleed. case: quiet steps, the last in the accent. stack: two large blocks. */
  variant: 'hero' | 'case' | 'stack'
  /** Use "ul" when the order of the items carries no meaning. */
  as?: 'ol' | 'ul'
  label?: string
}

/** The site's one motif: steps that lock into each other like an integration flow. */
export function Flow({ items, variant, as: Tag = 'ol', label }: FlowProps) {
  return (
    <Tag className={`flow flow-${variant}`} aria-label={label}>
      {items.map((item) => (
        <li key={item.key} className="flow-step">
          {item.content}
        </li>
      ))}
    </Tag>
  )
}

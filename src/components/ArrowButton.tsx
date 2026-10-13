import type { AnchorHTMLAttributes } from 'react'

/** The primary action. The arrow is the inner element, so the focus outline of the link is never clipped. */
export function ArrowButton({
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={className ? `arrow-button ${className}` : 'arrow-button'} {...rest}>
      <span className="arrow-button-shape">{children}</span>
    </a>
  )
}

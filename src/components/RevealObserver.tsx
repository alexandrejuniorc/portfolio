import { useEffect } from 'react'

/**
 * Entrance animation for content below the first screen. Until this effect runs nothing is
 * hidden, so the page reads in full without JavaScript. Mount once, after the sections.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const show = (node: Element) => node.setAttribute('data-revealed', '')

    if (!('IntersectionObserver' in window)) {
      for (const node of nodes) show(node)
      return
    }

    // Whatever is already on screen stays put: hiding it now would make it blink.
    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight) show(node)
    }
    root.classList.add('reveal-on')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    for (const node of nodes) observer.observe(node)

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-on')
    }
  }, [])

  return null
}

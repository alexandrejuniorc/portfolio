import { useEffect } from 'react'
import { m } from '@/paraglide/messages'
import { useThemeStore } from '@/stores/theme.store'

/**
 * Shows the name of the theme a click switches to. Both names are in the markup and
 * data-theme picks one, so the label is right before React hydrates.
 */
export function ThemeToggle() {
  const toggle = useThemeStore((state) => state.toggle)

  useEffect(() => {
    useThemeStore.getState().syncWithDocument()
  }, [])

  return (
    <button type="button" className="nav-link" aria-label={m.theme_toggle_label()} onClick={toggle}>
      <span className="hidden dark:inline">{m.theme_light()}</span>
      <span className="hidden light:inline">{m.theme_dark()}</span>
    </button>
  )
}

export type Theme = 'dark' | 'light'

/** The localStorage key written by the Zustand persist middleware. */
export const THEME_STORAGE_KEY = 'portfolio-theme'

/** Black and blue is the identity of the site, so a first visit is always dark. */
export const DEFAULT_THEME: Theme = 'dark'

/** Reads what persist stores: {"state":{"theme":"light"},"version":0}. Anything else is dark. */
export function parseStoredTheme(raw: string | null | undefined): Theme {
  if (!raw) return DEFAULT_THEME
  try {
    const parsed = JSON.parse(raw) as { state?: { theme?: unknown } | null } | null
    return parsed?.state?.theme === 'light' ? 'light' : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function nextTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

/** The theme currently painted, as set on <html> by THEME_INIT_SCRIPT or by the toggle. */
export function readDocumentTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME
  return document.documentElement.dataset.theme === 'light' ? 'light' : DEFAULT_THEME
}

/**
 * Runs in <head> before the first paint, so a returning visitor never sees the wrong theme.
 * It is serialised into the HTML and must not reference anything outside itself.
 * Order of precedence: ?theme= in the URL, the stored choice, dark.
 */
export const THEME_INIT_SCRIPT = `(function(){var t='dark';try{var q=new URLSearchParams(location.search).get('theme');if(q==='light'||q==='dark'){t=q}else{var s=JSON.parse(localStorage.getItem('${THEME_STORAGE_KEY}')||'null');if(s&&s.state&&s.state.theme==='light'){t='light'}}}catch(e){}document.documentElement.dataset.theme=t})()`

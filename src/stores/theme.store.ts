import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  applyTheme,
  DEFAULT_THEME,
  nextTheme,
  readDocumentTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '@/lib/theme'

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
  /** Adopts whatever the head script painted. Call once after mount. */
  syncWithDocument: () => void
}

/** localStorage that never throws: private windows and blocked site data keep the choice for the visit only. */
const safeStorage = createJSONStorage<Pick<ThemeState, 'theme'>>(() => ({
  getItem: (name) => {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value)
    } catch {
      // Nothing to do: the theme still applies to this visit.
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name)
    } catch {
      // Nothing to remove.
    }
  },
}))

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: DEFAULT_THEME,
      setTheme: (theme) => {
        applyTheme(theme)
        set({ theme })
      },
      toggle: () => get().setTheme(nextTheme(get().theme)),
      syncWithDocument: () => set({ theme: readDocumentTheme() }),
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: safeStorage,
      partialize: (state) => ({ theme: state.theme }),
      // The head script already applied the stored theme. Hydrating here would make the
      // first client render differ from the prerendered HTML.
      skipHydration: true,
    },
  ),
)

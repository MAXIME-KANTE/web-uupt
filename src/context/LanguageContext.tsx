import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'fr' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const STORAGE_KEY = 'uupt-lang'

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr'
  } catch {
    // localStorage indisponible (mode privé strict, etc.) — FR par défaut.
    return 'fr'
  }
}

/**
 * Fournit la langue courante à tout l'arbre.
 *
 * Le rendu bilingue reste assuré par le CSS existant : chaque texte existe en
 * double (`data-lang="fr"` / `data-lang="en"`) et la classe `.lang-en` sur
 * <html> détermine la variante visible. Ce contexte gère l'état, la
 * persistance (localStorage) et la synchronisation de l'attribut <html>.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('lang-en', lang === 'en')
    html.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Persistance impossible — on ignore.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])

  const toggleLang = useCallback(() => {
    setLangState((previous) => (previous === 'fr' ? 'en' : 'fr'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l’intérieur d’un LanguageProvider.')
  }
  return context
}

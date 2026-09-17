import { useEffect } from 'react'

/**
 * Met à jour dynamiquement le <title>, la meta description, et les
 * balises Open Graph / Twitter Card de la page courante.
 * Garantit un aperçu social correct pour chaque route (WhatsApp,
 * LinkedIn, Facebook, Twitter). Le link canonical suit la route courante ;
 * noindex=true (3e argument) pose un meta robots « noindex, follow ».
 */
export function usePageMeta(title: string, description?: string, noindex = false): void {
  useEffect(() => {
    document.title = title

    // ── Helper : crée ou met à jour une <meta> ────────────────────
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = content
    }

    // ── Helper : crée ou met à jour un <link> ─────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        document.head.appendChild(el)
      }
      el.href = href
    }

    // ── Balises standards ─────────────────────────────────────────
    if (description) {
      setMeta('name', 'description', description)
    }

    // ── Canonical : suit la route courante (sans query ni hash) ───
    setLink('canonical', window.location.origin + window.location.pathname)

    // ── Robots : noindex pour les pages utilitaires (merci, 404) ──
    if (noindex) {
      setMeta('name', 'robots', 'noindex, follow')
    } else {
      // Page indexable : retire un éventuel noindex de la page précédente.
      document.querySelector('meta[name="robots"]')?.remove()
    }

    // ── Open Graph ────────────────────────────────────────────────
    setMeta('property', 'og:title', title)
    if (description) {
      setMeta('property', 'og:description', description)
    }
    // og:url propre : la route seule (comme la canonical) — pas de query
    // ni de hash, sinon chaque partage avec paramètres crée une URL distincte.
    setMeta('property', 'og:url', window.location.origin + window.location.pathname)

    // ── Twitter Card ──────────────────────────────────────────────
    setMeta('name', 'twitter:title', title)
    if (description) {
      setMeta('name', 'twitter:description', description)
    }

    // Au démontage de la page, on restaure la canonical racine
    // (celle posée en dur dans index.html).
    return () => {
      const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (canonical) canonical.href = `${window.location.origin}/`
    }
  }, [title, description, noindex])
}

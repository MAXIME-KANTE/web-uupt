/**
 * ── DÉCOUPAGE DU BUNDLE PAR ROUTE (Étape 17) ────────────────────────────────
 * Les pages intérieures sont chargées à la demande (React.lazy dans App.tsx).
 * Ce module centralise les MÊMES spécificateurs d'import pour permettre le
 * préchargement au survol / au clic des liens (voir PageVeil) : le bundler
 * déduplique les chunks, un import() ici réutilise exactement celui du lazy.
 *
 * L'accueil reste dans le chunk initial (LCP) — il n'a pas d'entrée ici.
 */

const loaders: Record<string, () => Promise<unknown>> = {
  '/axe-academique-culturel': () => import('./AxeAcademiqueCulturelPage'),
  '/axe-innovation': () => import('./AxeInnovationPage'),
  '/axe-sportif': () => import('./AxeSportifPage'),
  '/a-propos': () => import('./AboutPage'),
  '/historique': () => import('./HistoriquePage'),
  '/partenaires': () => import('./PartenairesPage'),
  '/contact': () => import('./ContactPage'),
  '/mentions-legales': () => import('./LegalPage'),
  '/politique-de-confidentialite': () => import('./PrivacyPage'),
  '/merci': () => import('./ThankYouPage'),
}

const inflight = new Map<string, Promise<unknown>>()

/** Précharge le chunk d'une route (sans effet si absente ou déjà partie). */
export function prefetchRoute(path: string): void {
  const loader = loaders[path]
  if (!loader || inflight.has(path)) return
  const promise = loader().catch(() => {
    inflight.delete(path) // permet une nouvelle tentative au prochain survol
  })
  inflight.set(path, promise)
}

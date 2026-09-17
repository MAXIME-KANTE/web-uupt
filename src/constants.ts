/**
 * Configuration centrale du site UUPT — source unique pour le formulaire
 * (FormSubmit), le JSON-LD (index.html) et le prérendu (scripts/prerender.mjs).
 */

/** Email de contact opérationnel — TODO(UUPT) : remplacer par l'email officiel. */
export const CONTACT_EMAIL = 'contact@uupt.sn'

/**
 * Origine publique du site (placeholder — TODO(UUPT) : substituer au domaine
 * définitif ici ET dans index.html / sitemap.xml, comme documenté chez SALEEL).
 */
export const SITE_URL = 'https://uupt.maximekante23.workers.dev'

/** URL Unsplash optimisée (le site n'utilise que des visuels distants, spec §9). */
const unsplash = (id: string, width = 1920): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

/** Diaporama du hero d'accueil — la 1re image est préchargée dans index.html
 * (et attendue par le Preloader : mettre les deux à jour ensemble). */
export const HOME_HERO_SLIDES: readonly string[] = [
  unsplash('photo-1523050854058-8df90110c9f1'),
  unsplash('photo-1475721027785-f74eccf877e2'),
  unsplash('photo-1523240795612-9a054b0db644'),
]

export type AxeId = 'academique-culturel' | 'innovation' | 'sportif'

/** Galerie de chaque axe — hero de page axe + mini-carrousels de l'accueil.
 * TODO(UUPT) : enrichir avec de vraies photos d'événements quand disponibles. */
export const AXE_GALLERIES: Record<AxeId, readonly string[]> = {
  'academique-culturel': [
    unsplash('photo-1521587760476-6c12a4b040da', 1600),
    unsplash('photo-1475721027785-f74eccf877e2', 1600),
  ],
  innovation: [
    unsplash('photo-1518770660439-4636190af475', 1600),
    unsplash('photo-1523240795612-9a054b0db644', 1600),
  ],
  sportif: [unsplash('photo-1546519638-68e109498ffc', 1600)],
}

/** Pool d'arrière-plans aléatoires (fonds de section, bandeaux CTA) — useCalquePool. */
export const CALQUE_IMAGES: readonly string[] = [
  unsplash('photo-1523050854058-8df90110c9f1', 1920),
  unsplash('photo-1523240795612-9a054b0db644', 1920),
  unsplash('photo-1475721027785-f74eccf877e2', 1920),
]

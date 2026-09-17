/**
 * Configuration centrale du site UUPT — source unique pour le formulaire
 * (FormSubmit), le JSON-LD (index.html) et le prérendu (scripts/prerender.mjs).
 */

/** Email de contact officiel — alimente le formulaire FormSubmit (ContactForm),
 *  le footer, les mentions légales, la politique de confidentialité et la carte
 *  communauté (mailto). TODO(UUPT) : substituer l'email définitif de l'Union
 *  si différent (changer aussi `organization.email` dans uuptData.ts). */
export const CONTACT_EMAIL = 'maximekante23@gmail.com'

/**
 * Origine publique du site (placeholder — TODO(UUPT) : substituer au domaine
 * définitif ici ET dans index.html / sitemap.xml, comme documenté chez SALEEL).
 */
export const SITE_URL = 'https://uupt.maximekante23.workers.dev'

/* ---------------------------- Photos ------------------------------ */

/**
 * Photo locale de `public/images` — les fichiers livrés (WhatsApp) portent
 * espaces et parenthèses : `encodeURI` garantit une URL valide partout
 * (`src`, `srcset`, `background-image`).
 */
const localPhoto = (file: string): string => encodeURI(`/images/${file}`)

/**
 * Photos officielles de l'Union — TOUT le site puise dans ce pool (diaporamas
 * de hero, galeries, mini-carrousels de cartes, bandeaux CTA). Pour publier une
 * nouvelle photo : déposer le fichier dans `public/images` puis l'ajouter ici
 * (voir `public/images/README.md`).
 */
export const LOCAL_PHOTOS: readonly string[] = [
  localPhoto('WhatsApp Image 2026-09-16 at 15.20.14.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 15.20.14 (1).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 15.20.14 (2).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 15.56.46.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 15.56.47.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 17.25.49.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 17.25.49 (1).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 17.25.49 (2).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 17.25.49 (3).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 20.53.00.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 20.53.01.jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 20.53.01 (1).jpeg'),
  localPhoto('WhatsApp Image 2026-09-16 at 20.53.01 (2).jpeg'),
]

/** Nombre d'images par diaporama de hero — contrat produit : 6 par hero
 *  (accueil, pages d'axes et pages intérieures). */
export const HERO_SLIDE_COUNT = 6

/**
 * Fenêtre circulaire de `count` photos du pool à partir de `offset` : chaque
 * diaporama peut ainsi s'ouvrir sur un sous-ensemble (et un ordre) différent,
 * sans jamais sortir du pool ni dépasser sa taille.
 */
export const rotatePhotos = (
  pool: readonly string[],
  count: number,
  offset = 0,
): readonly string[] =>
  pool.length === 0
    ? []
    : Array.from({ length: Math.min(count, pool.length) }, (_, index) => pool[(offset + index) % pool.length])

/** Diaporama du hero d'accueil (6 photos) — la 1re image est préchargée dans
 * `index.html` (et attendue par le Preloader : mettre les deux à jour ensemble). */
export const HOME_HERO_SLIDES: readonly string[] = rotatePhotos(LOCAL_PHOTOS, HERO_SLIDE_COUNT)

export type AxeId = 'academique-culturel' | 'innovation' | 'sportif'

/**
 * Galerie de chaque axe — diaporama du hero de page ([0 … HERO_SLIDE_COUNT-1],
 * 6 photos), galerie « L'axe en images » (photos suivantes), mini-diaporamas
 * des cartes de l'accueil et fonds de section. Le pool local n'est pas encore
 * qualifié par axe (photos livrées en bloc) : chaque axe ouvre donc le pool
 * sur un décalage différent (0 / 4 / 9) pour que les trois pages ne montrent
 * pas la même première photo. TODO(UUPT) : réordonner les entrées le jour où
 * chaque photo est rattachée à un axe précis.
 */
export const AXE_GALLERIES: Record<AxeId, readonly string[]> = {
  'academique-culturel': rotatePhotos(LOCAL_PHOTOS, LOCAL_PHOTOS.length, 0),
  innovation: rotatePhotos(LOCAL_PHOTOS, LOCAL_PHOTOS.length, 4),
  sportif: rotatePhotos(LOCAL_PHOTOS, LOCAL_PHOTOS.length, 9),
}

/** Pool d'arrière-plans aléatoires (fonds de section, bandeaux CTA) — useCalquePool. */
export const CALQUE_IMAGES: readonly string[] = LOCAL_PHOTOS

/** Index du lot « bandeaux CTA / fonds de section » dans un pool mélangé :
 *  juste APRÈS le lot hero ([0 … HERO_SLIDE_COUNT-1]) pour ne jamais afficher
 *  deux fois la même photo dans une page. */
export const CALQUE_BAND_INDEX = HERO_SLIDE_COUNT

import { useMemo } from 'react'
import { CALQUE_IMAGES } from '../constants'
import { shuffle } from '../utils/random'

/**
 * Tirage mélangé du pool d'arrière-plans « calque », recalculé à chaque
 * montage de page (donc à chaque navigation). Convention de slices consommées
 * par les pages (voir CALQUE_BAND_INDEX dans constants.ts) :
 * `[0 … HERO_SLIDE_COUNT-1]` heroes · `[HERO_SLIDE_COUNT]` bande CTA ·
 * `[HERO_SLIDE_COUNT+1]` section à backdrop — garantit l'absence de doublon
 * d'image au sein d'une même page.
 *
 * `pool` : par défaut le pool visuel CALQUE_IMAGES (les photos locales).
 * Les pages AXE passent la galerie de LEUR axe (AXE_GALLERIES[axe]) : les
 * fonds de section et bandes CTA d'une page axe puisent dans la rotation
 * propre à cet axe.
 */
export function useCalquePool(pool: readonly string[] = CALQUE_IMAGES): readonly string[] {
  return useMemo(() => shuffle(pool), [pool])
}

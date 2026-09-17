import { useMemo } from 'react'
import { CALQUE_IMAGES } from '../constants'
import { shuffle } from '../utils/random'

/**
 * Tirage mélangé du pool d'arrière-plans « calque », recalculé à chaque
 * montage de page (donc à chaque navigation). Slices consommées par la page :
 * [0..2] héros · [3] bande CTA · [4] section à backdrop — garantit l'absence
 * de doublon d'image au sein d'une même page.
 *
 * `pool` : par défaut le pool visuel CALQUE_IMAGES. Les pages AXE passent
 * la galerie de LEUR axe (AXE_GALLERIES[axe]) : les fonds de section et
 * bandes CTA d'une page axe ne montrent QUE des photos de cet axe — jamais
 * un terrain de sport sur la page Innovation, par exemple.
 */
export function useCalquePool(pool: readonly string[] = CALQUE_IMAGES): readonly string[] {
  return useMemo(() => shuffle(pool), [pool])
}

/**
 * Utilitaires d'aléatoire purs (aucune mutation des entrées).
 */

/** Mélange Fisher-Yates — renvoie un NOUVEAU tableau. */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Tirage de `count` éléments distincts dans l'ordre aléatoire. */
export function pickRandom<T>(pool: readonly T[], count: number): T[] {
  return shuffle(pool).slice(0, Math.max(0, count))
}

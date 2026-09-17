import type Lenis from 'lenis'

/**
 * Instance Lenis partagée (une seule pour toute l'application).
 * `SmoothScroll` l'enregistre au montage et la retire au démontage ;
 * les autres composants (ScrollToTop, ancres…) l'utilisent via ces helpers
 * pour rester synchrones avec le smooth scroll plutôt que de lutter contre.
 */
let instance: Lenis | null = null

export function setLenis(next: Lenis | null): void {
  instance = next
}

export function getLenis(): Lenis | null {
  return instance
}

/** Remonte instantanément en haut de page, via Lenis quand il est actif. */
export function scrollToTopImmediate(): void {
  if (instance) {
    instance.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

/**
 * Positionne instantanément la page sur un élément (ancre partagée, #pole-…
 * dans l'URL). En SPA, le saut natif du navigateur échoue : la cible n'existe
 * pas dans le HTML initial, elle n'apparaît qu'après le rendu React — on
 * rejoue donc le positionnement une fois la page montée.
 */
export function scrollToElementImmediate(element: HTMLElement): void {
  if (instance) {
    instance.scrollTo(element, { immediate: true })
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, y)
  }
}

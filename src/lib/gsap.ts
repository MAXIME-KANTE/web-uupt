import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

/**
 * Hub GSAP du projet : plugins enregistrés UNE fois au niveau module,
 * réexportés pour tous les composants d'animation. L'inertie Lenis anime
 * le scroll natif de la fenêtre — ScrollTrigger fonctionne donc sans
 * scrollerProxy ; les composants qui le souhaitent branchent
 * `lenis.on('scroll', ScrollTrigger.update)` pour un rendu optimal.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip)

/** Pont de debug/capture (même convention que window.__lenis) : expose les
 *  instances pour les scripts scripts/*.mjs et le prérendu, sans jamais
 *  importer gsap côté page. */
declare global {
  interface Window {
    __gsap?: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; Flip: typeof Flip }
  }
}
if (typeof window !== 'undefined') {
  window.__gsap = { gsap, ScrollTrigger, Flip }
}

export { gsap, ScrollTrigger, Flip, useGSAP }

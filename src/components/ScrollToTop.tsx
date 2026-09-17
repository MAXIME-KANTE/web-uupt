import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToElementImmediate, scrollToTopImmediate } from '../lib/smoothScroll'

/**
 * Remonte en haut de page à chaque changement de route,
 * comme le ferait le chargement d'une nouvelle page HTML.
 * Passe par Lenis quand l'inertie de scroll est active pour rester instantané.
 *
 * Une ancre explicite (#pole-immobilier…) prime sur la remontée : en SPA le
 * saut natif du navigateur a échoué (la cible n'existait pas encore dans le
 * DOM), on le rejoue donc après le rendu — les liens d'ancre partagés
 * atterrissent au bon endroit.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) {
      scrollToTopImmediate()
      return
    }

    // Deux rAF : attend le paint post-mount pour que la cible soit mesurée
    // à sa place définitive (slots sticky = 100svh, layout stable). La page
    // visée est CHARGÉE PARESSEUSEMENT : la cible n'existe pas encore au
    // montage — on réessaie ~2 s, le temps que le chunk se rende.
    let tries = 0
    let timer = 0
    const attempt = () => {
      const target = document.getElementById(hash)
      if (target instanceof HTMLElement) {
        scrollToElementImmediate(target)
        return
      }
      if (tries++ < 14) timer = window.setTimeout(attempt, 150)
    }
    let frame2 = 0
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(attempt)
    })
    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      window.clearTimeout(timer)
    }
  }, [pathname])

  return null
}

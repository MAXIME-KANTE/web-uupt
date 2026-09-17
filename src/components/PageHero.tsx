import type { ReactNode } from 'react'
import HeroCarousel from './HeroCarousel'
import { CALQUE_IMAGES, HERO_SLIDE_COUNT } from '../constants'

interface PageHeroProps {
  /** `plain` : fond clair dégradé · `photo` : photo + voile sombre. */
  variant?: 'plain' | 'photo'
  /** Images du carrousel de fond ; défaut : les HERO_SLIDE_COUNT premières
   *  photos du pool partagé CALQUE_IMAGES (6, contrat « 6 par hero »). */
  images?: readonly string[]
  children: ReactNode
}

/** Héro des pages intérieures, avec carrousel de fond et titre de page. */
export default function PageHero({ variant = 'plain', images, children }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${variant}`}>
      <HeroCarousel images={images ?? CALQUE_IMAGES.slice(0, HERO_SLIDE_COUNT)} priority />
      <div className="hero-overlay" />
      <div className="container">{children}</div>
    </section>
  )
}

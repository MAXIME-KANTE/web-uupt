import type { ReactNode } from 'react'
import HeroCarousel from './HeroCarousel'
import { CALQUE_IMAGES } from '../constants'

interface PageHeroProps {
  /** `plain` : fond clair dégradé · `photo` : photo + voile sombre. */
  variant?: 'plain' | 'photo'
  /** Images du carrousel de fond ; défaut : CALQUE_IMAGES (pool partagé). */
  images?: readonly string[]
  children: ReactNode
}

/** Héro des pages intérieures, avec carrousel de fond et titre de page. */
export default function PageHero({ variant = 'plain', images, children }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${variant}`}>
      <HeroCarousel images={images ?? CALQUE_IMAGES} priority />
      <div className="hero-overlay" />
      <div className="container">{children}</div>
    </section>
  )
}

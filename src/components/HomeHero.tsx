import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroCarousel from './HeroCarousel'
import { scrollToElementImmediate } from '../lib/smoothScroll'
import { HOME_HERO_SLIDES } from '../constants'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import { PROMISE_STATS } from './PromiseStrip'

/**
 * Hero simple de l'accueil — plein écran, sans animation liée au scroll :
 * un diaporama d'images (les quatre pôles + l'équipe) fondu en arrière-plan
 * sous un voile sombre quasi uniforme, un contenu parfaitement CENTRÉ
 * (surtitre, titre, accroche, deux CTA pilules) et la bande de chiffres clés
 * `.hero-stats` (4 colonnes, `PROMISE_STATS`, PLEINE LARGEUR TRANSPARENTE
 * sur la photo — un filet horizontal en haut + filets verticaux entre
 * colonnes dessinent la bande, aucune carte ni fond navy ; bloc dédié dans
 * App.css). Deux modes : DÉTACHÉE du bord inférieur partout (bottom 3rem
 * desktop / 2rem ≤640px en grille 2×2, z-index 3 : transparente, son bas
 * doit rester AU-DESSUS de la carte claire qui remonte sur le hero — sinon
 * la feuille blanche se verrait au travers), MASQUÉE en paysage ≤600px de
 * haut. La sentinelle de scroll vit juste APRÈS le hero
 * (comme sur les pages intérieures) : la navbar se compacte quand le hero
 * sort du viewport, et la section suivante remonte en carte claire sur son
 * bord inférieur.
 *
 * `prefers-reduced-motion` : HeroCarousel fige la première image et le CSS
 * désactive le zoom/fondu des slides — le hero reste parfaitement lisible.
 */
export default function HomeHero() {
  const { lang } = useLanguage()
  return (
    <>
      <section
        className="hero hero--home"
        aria-label={
          lang === 'fr'
            ? 'SALEEL GROUPE — groupe multisectoriel à Thiès, Sénégal'
            : 'SALEEL GROUPE — multisectoral group in Thiès, Senegal'
        }
      >
        <HeroCarousel images={HOME_HERO_SLIDES} interval={4500} priority />
        <div className="hero-overlay" />

        <div className="hero-content hero-content--center">
          <span className="hero-eyebrow" data-lang="fr">
            Groupe multisectoriel · Thiès, Sénégal
          </span>
          <span className="hero-eyebrow" data-lang="en">
            Multisectoral group · Thiès, Senegal
          </span>
          <h1 data-lang="fr">
            Ensemble,<br />construisons l&rsquo;avenir&nbsp;!
          </h1>
          <h1 data-lang="en">
            Building the future<br />of our territories
          </h1>
          <p data-lang="fr">
            Génie civil, immobilier, comptabilité et numérique : quatre expertises réunies
            pour transformer vos ambitions en projets durables.
          </p>
          <p data-lang="en">
            Civil engineering, real estate, accounting and digital: four expertises to turn
            your ambitions into lasting projects.
          </p>
          <div className="hero-actions">
            {/* Ancre interne : scroll doux via Lenis (le saut natif lutte
                contre le smooth scroll et atterrit sous la navbar fixée). */}
            <a
              href="#poles"
              className="button button--light"
              data-lang="fr"
              onClick={(event) => {
                event.preventDefault()
                const target = document.getElementById('poles')
                if (target) scrollToElementImmediate(target)
              }}
            >
              Découvrir nos pôles <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href="#poles"
              className="button button--light"
              data-lang="en"
              onClick={(event) => {
                event.preventDefault()
                const target = document.getElementById('poles')
                if (target) scrollToElementImmediate(target)
              }}
            >
              Discover our divisions <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Link to="/contact" className="button button--ghost" data-lang="fr">
              Démarrer un projet
            </Link>
            <Link to="/contact" className="button button--ghost" data-lang="en">
              Start a project
            </Link>
          </div>
        </div>

        <Reveal
          className="hero-stats"
          aria-label={
            lang === 'fr'
              ? 'Chiffres clés de SALEEL GROUPE'
              : 'SALEEL GROUPE key figures'
          }
        >
          {PROMISE_STATS.map((stat) => (
            <div className="hero-stats__item" key={stat.value}>
              <strong>{stat.value}</strong>
              <span data-lang="fr">{stat.fr}</span>
              <span data-lang="en">{stat.en}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Sentinelle APRÈS le hero : la navbar passe en mode compact quand il
          sort du viewport (même mécanique que les pages intérieures). */}
      <div className="scroll-sentinel" aria-hidden="true" />
    </>
  )
}

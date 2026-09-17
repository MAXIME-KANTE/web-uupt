import { Link } from 'react-router-dom'
import HeroCarousel from './HeroCarousel'
import { scrollToElementImmediate } from '../lib/smoothScroll'
import { HOME_HERO_SLIDES } from '../constants'
import { useLanguage } from '../context/LanguageContext'
import { heroContent, organization } from '../data/uuptData'

/**
 * Hero simple de l'accueil UUPT — plein écran, sans animation liée au
 * scroll : un diaporama d'images (`HOME_HERO_SLIDES`, la première étant
 * préchargée dans index.html) fondu en arrière-plan sous un voile sombre
 * quasi uniforme, un contenu parfaitement CENTRÉ (surtitre, titre en deux
 * lignes avec accent serif, accroche, deux CTA pilules) piloté par
 * `heroContent` dans `src/data/uuptData.ts` :
 *
 *  - CTA primaire  : ancre interne `#poles` (section « Nos axes ») — scroll
 *    doux via Lenis, comme le hero SALEEL (le saut natif lutte contre le
 *    smooth scroll et atterrit sous la navbar fixée) ;
 *  - CTA secondaire : route `/contact` (Link ordinaire).
 *
 * Les 4 chiffres clés ne vivent pas dans le hero (contrairement à SALEEL) :
 * la composition UUPT les place dans la section `StatsBand` animée au
 * scroll, juste après le bandeau d'engagement.
 *
 * La sentinelle de scroll vit juste APRÈS le hero (comme sur les pages
 * intérieures) : la navbar se compacte quand le hero sort du viewport, et
 * la carte claire `.promise-rise` remonte sur son bord inférieur.
 *
 * `prefers-reduced-motion` : HeroCarousel fige la première image et le CSS
 * désactive le zoom/fondu des slides — le hero reste parfaitement lisible.
 */
export default function HomeHero() {
  const { lang } = useLanguage()
  const PrimaryIcon = heroContent.primaryCta.icon
  const SecondaryIcon = heroContent.secondaryCta.icon
  // Ancre interne (« #poles ») : scroll doux ; sinon navigation route.
  const primaryIsAnchor = heroContent.primaryCta.href.startsWith('#')

  const scrollToPrimaryAnchor = () => {
    const target = document.getElementById(heroContent.primaryCta.href.slice(1))
    if (target) scrollToElementImmediate(target)
  }

  return (
    <>
      <section
        className="hero hero--home"
        aria-label={`${organization.name} — ${organization.type[lang]}`}
      >
        <HeroCarousel images={HOME_HERO_SLIDES} interval={4500} priority />
        <div className="hero-overlay" />

        <div className="hero-content hero-content--center">
          <span className="hero-eyebrow" data-lang="fr">
            {heroContent.overtitle.fr}
          </span>
          <span className="hero-eyebrow" data-lang="en">
            {heroContent.overtitle.en}
          </span>
          <h1 data-lang="fr">
            {heroContent.title.lead.fr}
            <br />
            <em className="ti">{heroContent.title.accent.fr}</em>
            &nbsp;{heroContent.title.tail.fr}
          </h1>
          <h1 data-lang="en">
            {heroContent.title.lead.en}
            <br />
            <em className="ti">{heroContent.title.accent.en}</em>
            {heroContent.title.tail.en}
          </h1>
          <p data-lang="fr">{heroContent.subtitle.fr}</p>
          <p data-lang="en">{heroContent.subtitle.en}</p>
          <div className="hero-actions">
            {primaryIsAnchor ? (
              <>
                <a
                  href={heroContent.primaryCta.href}
                  className="button button--light"
                  data-lang="fr"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToPrimaryAnchor()
                  }}
                >
                  {heroContent.primaryCta.label.fr}
                  {PrimaryIcon && <PrimaryIcon size={17} aria-hidden="true" />}
                </a>
                <a
                  href={heroContent.primaryCta.href}
                  className="button button--light"
                  data-lang="en"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToPrimaryAnchor()
                  }}
                >
                  {heroContent.primaryCta.label.en}
                  {PrimaryIcon && <PrimaryIcon size={17} aria-hidden="true" />}
                </a>
              </>
            ) : (
              <>
                <Link
                  to={heroContent.primaryCta.href}
                  className="button button--light"
                  data-lang="fr"
                >
                  {heroContent.primaryCta.label.fr}
                  {PrimaryIcon && <PrimaryIcon size={17} aria-hidden="true" />}
                </Link>
                <Link
                  to={heroContent.primaryCta.href}
                  className="button button--light"
                  data-lang="en"
                >
                  {heroContent.primaryCta.label.en}
                  {PrimaryIcon && <PrimaryIcon size={17} aria-hidden="true" />}
                </Link>
              </>
            )}
            <Link to={heroContent.secondaryCta.href} className="button button--ghost" data-lang="fr">
              {heroContent.secondaryCta.label.fr}
              {SecondaryIcon && <SecondaryIcon size={17} aria-hidden="true" />}
            </Link>
            <Link to={heroContent.secondaryCta.href} className="button button--ghost" data-lang="en">
              {heroContent.secondaryCta.label.en}
              {SecondaryIcon && <SecondaryIcon size={17} aria-hidden="true" />}
            </Link>
          </div>
        </div>
      </section>

      {/* Sentinelle APRÈS le hero : la navbar passe en mode compact quand il
          sort du viewport (même mécanique que les pages intérieures). */}
      <div className="scroll-sentinel" aria-hidden="true" />
    </>
  )
}

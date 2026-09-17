import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../context/LanguageContext'
import { organization } from '../data/uuptData'

/**
 * Bandeau d'engagement de l'accueil UUPT — la tagline officielle de l'Union
 * (`organization.tagline`) en titre, la nature du mouvement et sa date de
 * création en appui, et un bouton vers la page À propos. Posé juste après
 * la sentinelle du hero dans son wrapper `.promise-rise` (HomePage), il
 * remonte en carte claire arrondie sur le bord inférieur du diaporama ;
 * révélation du contenu par Reveal.
 *
 * (L'ancien export SALEEL `PROMISE_STATS` a été retiré avec la bande
 * `.hero-stats` du hero : les chiffres clés UUPT vivent dans `StatsBand`.)
 */
export default function PromiseStrip() {
  const { lang } = useLanguage()

  return (
    <Reveal className="promise-strip">
      <span className="promise-index" aria-hidden="true">01</span>
      <div className="promise-strip__main">
        <h2 data-lang="fr">{organization.tagline.fr}</h2>
        <h2 data-lang="en">{organization.tagline.en}</h2>
        <p data-lang="fr">
          {organization.type.fr}, créé le {organization.createdLabel.fr} à{' '}
          {organization.city}, {organization.country.fr}.
        </p>
        <p data-lang="en">
          {organization.type.en}, founded on {organization.createdLabel.en} in{' '}
          {organization.city}, {organization.country.en}.
        </p>
      </div>
      <Link
        className="promise-strip__btn"
        to="/a-propos"
        aria-label={
          lang === 'fr' ? "Découvrir l'UUPT (À propos)" : 'About UUPT'
        }
      >
        <ArrowRight size={24} aria-hidden="true" />
      </Link>
    </Reveal>
  )
}

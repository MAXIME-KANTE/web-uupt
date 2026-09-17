import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../context/LanguageContext'

export const PROMISE_STATS = [
  { value: '04', fr: "Pôles d'activité", en: 'Business divisions' },
  { value: '2026', fr: 'Année de lancement', en: 'Year founded' },
  { value: '2035', fr: "Vision Afrique de l'Ouest", en: 'West Africa vision' },
  { value: 'Thiès', fr: 'Siège social, Sénégal', en: 'Headquarters, Senegal' },
] as const

/**
 * Section « promesse » — RETIRÉE de l'accueil (la carte « 01 » n'existe
 * plus) : ce composant n'est plus rendu. Le fichier reste la source de
 * `PROMISE_STATS`, désormais affichés dans la bande `.hero-stats` du hero
 * d'accueil (voir HomeHero).
 */
export default function PromiseStrip() {
  const { lang } = useLanguage()
  return (
    <>
      <Reveal className="promise-strip">
        <span className="promise-index" aria-hidden="true">01</span>
        <div className="promise-strip__main">
          <h2 data-lang="fr">Ensemble, construisons <em className="ti">l'avenir</em></h2>
          <h2 data-lang="en">Together, let's build <em className="ti">the future</em></h2>
          <p data-lang="fr">
            Une équipe sénégalaise engagée, une vision régionale et la rigueur nécessaire pour
            accompagner chaque projet, du diagnostic à la livraison.
          </p>
          <p data-lang="en">
            A committed Senegalese team, a regional vision and the rigour to support every
            project, from diagnosis to delivery.
          </p>
        </div>
        <Link
          className="promise-strip__btn"
          to="/a-propos"
          aria-label={
            lang === 'fr'
              ? 'Découvrir le groupe SALEEL (À propos)'
              : 'About SALEEL group'
          }
        >
          <ArrowRight size={24} aria-hidden="true" />
        </Link>
      </Reveal>

    </>
  )
}

import { useLanguage } from '../context/LanguageContext'

const WORDS_FR: readonly string[] = [
  'Génie Civil',
  'Immobilier',
  'Comptabilité',
  'Numérique',
  'Rigueur',
  'Intégrité',
  'Innovation',
  'Excellence',
  'Thiès · Sénégal',
]

const WORDS_EN: readonly string[] = [
  'Civil Engineering',
  'Real Estate',
  'Accounting',
  'Digital',
  'Rigour',
  'Integrity',
  'Innovation',
  'Excellence',
  'Thiès · Senegal',
]

/**
 * Bandeau défilant infini (métiers & valeurs). La piste est composée de deux
 * moitiés identiques pour une boucle sans couture (translateX(-50 %)) ;
 * l’animation CSS se met en pause au survol et est désactivée sous
 * `prefers-reduced-motion` (voir App.css).
 */
export default function Marquee() {
  const { lang } = useLanguage()
  const words = lang === 'en' ? WORDS_EN : WORDS_FR

  return (
    <div className="marquee" aria-hidden="true">
      {/* key={lang} : la piste est remontée au changement de langue (les deux
          langues n’ont pas la même largeur de contenu). */}
      <div className="marquee__track" key={lang}>
        <div className="marquee__half">
          {words.map((word) => (
            <span key={word} className="marquee__item">
              {word}
            </span>
          ))}
        </div>
        <div className="marquee__half">
          {words.map((word) => (
            <span key={word} className="marquee__item">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface MarqueeProps {
  /** Mots défilants — noms propres non traduits (sigles des BDE, etc.) :
   * la piste est identique dans les deux langues. */
  items: readonly string[]
}

/**
 * Bandeau défilant infini (noms des BDE partenaires sur l'accueil UUPT).
 * La piste est composée de deux moitiés identiques pour une boucle sans
 * couture (translateX(-50 %)) ; l’animation CSS se met en pause au survol
 * et est désactivée sous `prefers-reduced-motion` (voir App.css).
 *
 * Remarque : fournir une séquence suffisamment longue (≥ largeur d'un
 * écran large, quitte à répéter la liste) — sinon la boucle laisse un vide
 * à droite sur les grands viewports.
 */
export default function Marquee({ items }: MarqueeProps) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__half">
          {items.map((word, index) => (
            <span key={`${word}-${index}`} className="marquee__item">
              {word}
            </span>
          ))}
        </div>
        <div className="marquee__half">
          {items.map((word, index) => (
            <span key={`${word}-${index}`} className="marquee__item">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

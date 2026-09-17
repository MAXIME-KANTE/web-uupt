import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_EMAIL } from '../constants'

/**
 * Carte sombre « communauté » : champ email + bouton orange. Sans backend,
 * l’inscription ouvre un mailto pré-rempli vers CONTACT_EMAIL.
 * Placée en fin de page, elle fait le pont vers le footer sombre.
 */
export default function CommunityCard() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState('')
  const [noted, setNoted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent('Abonnement aux actualités UUPT')
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir les actualités de l'UUPT (Union des Universités Privées de Thiès).\n\nEmail : ${email}\n`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setNoted(true)
  }

  return (
    <section className="section community-section" id="communaute">
      <div className="container">
        <div className="community-card">
          <h2 data-lang="fr">Rejoignez la communauté SALEEL</h2>
          <h2 data-lang="en">Join the SALEEL community</h2>
          <p data-lang="fr">
            Suivez nos chantiers, nos réalisations et nos actualités — au Sénégal et au sein de la
            diaspora.
          </p>
          <p data-lang="en">
            Follow our sites, achievements and news — in Senegal and across the diaspora.
          </p>
          <form className="community-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="community-email" data-lang="fr">
              Votre adresse email
            </label>
            <label className="sr-only" htmlFor="community-email" data-lang="en">
              Your email address
            </label>
            <input
              id="community-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nom@exemple.com"
              autoComplete="email"
            />
            <button
              type="submit"
              className="community-form__btn"
              aria-label={lang === 'en' ? 'Subscribe' : 'S’inscrire'}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
          <p className="community-form__note" role="status" aria-live="polite">
            {noted && (
              <>
                <span data-lang="fr">
                  Votre messagerie s'est ouverte — envoyez l'e-mail pour finaliser votre
                  inscription.
                </span>
                <span data-lang="en">
                  Your email client has opened — send the e-mail to complete your
                  subscription.
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

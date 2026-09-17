import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import JsonLd, { breadcrumbJsonLd } from '../components/JsonLd'
import { HERO_SLIDE_COUNT } from '../constants'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import { contactChannels, contactCopy, socialLinks } from '../data/uuptData'

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: 'Contact', path: 'contact' },
  ]),
]

/**
 * Page Contact : la carte « split » (marque / formulaire) porte l'essentiel ;
 * les canaux directs (contactChannels, uuptData) et la rangée de réseaux
 * (socialLinks) passent dessous, en grille pleine largeur.
 */
export default function ContactPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'Contact – Union des Universités Privées de Thiès'
      : 'Contact – Union of Private Universities of Thiès',
    lang === 'fr' ? contactCopy.description.fr : contactCopy.description.en,
  )

  const calque = useCalquePool()

  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />
      <PageHero variant="photo" images={calque.slice(0, HERO_SLIDE_COUNT)}>
        <span className="eyebrow" data-lang="fr">{contactCopy.eyebrow.fr}</span>
        <span className="eyebrow" data-lang="en">{contactCopy.eyebrow.en}</span>
        <h1 data-lang="fr">Contact</h1>
        <h1 data-lang="en">Contact</h1>
        {/* `highlight` est optionnel dans SectionCopy — la ligne d'accroche
            n'est rendue que si la donnée le fournit. */}
        {contactCopy.highlight && (
          <>
            <p className="hero-lead--onphoto" data-lang="fr">
              {contactCopy.title.fr} <em className="ti">{contactCopy.highlight.fr}</em>.
            </p>
            <p className="hero-lead--onphoto" data-lang="en">
              {contactCopy.title.en} <em className="ti">{contactCopy.highlight.en}</em>.
            </p>
          </>
        )}
        <p className="hero-lead--onphoto" data-lang="fr">{contactCopy.description.fr}</p>
        <p className="hero-lead--onphoto" data-lang="en">{contactCopy.description.en}</p>
      </PageHero>

      {/* Sentinelle pour le header sticky (page non-pôle : après le hero) */}
      <div className="scroll-sentinel" aria-hidden="true" />

      {/* CARTE DE CONTACT — volet marque + formulaire (voir ContactForm) */}
      <section className="section contact-card-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {/* CANAUX DIRECTS */}
      <section className="section section--alt contact-details-section">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="eyebrow" data-lang="fr">Coordonnées</span>
            <span className="eyebrow" data-lang="en">Contact details</span>
            <h2 data-lang="fr">Nous joindre directement</h2>
            <h2 data-lang="en">Reach us directly</h2>
          </Reveal>

          {/* Une carte par canal de contactChannels (uuptData) : icône lucide
              portée par la donnée, valeur coordonnée (string) en lien direct,
              valeur éditoriale ({ fr, en }) en paires data-lang. */}
          <div className="contact-info-grid">
            {contactChannels.map((channel) => {
              const isDirectLink =
                channel.href.startsWith('mailto:') || channel.href.startsWith('tel:')
              return (
                <Reveal className="contact-info-item" key={channel.id}>
                  <div className="contact-info-icon">
                    <channel.icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 data-lang="fr">{channel.label.fr}</h3>
                    <h3 data-lang="en">{channel.label.en}</h3>
                    {isDirectLink ? (
                      <p>
                        <a href={channel.href} className="link-accent">
                          {typeof channel.value === 'string'
                            ? channel.value
                            : channel.value[lang]}
                        </a>
                      </p>
                    ) : (
                      <>
                        <p data-lang="fr">
                          {typeof channel.value === 'string' ? channel.value : channel.value.fr}
                        </p>
                        <p data-lang="en">
                          {typeof channel.value === 'string' ? channel.value : channel.value.en}
                        </p>
                      </>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="response-engagement-box">
            <div className="response-engagement-icon">⏱</div>
            <div>
              <h3 data-lang="fr">Notre engagement de réponse</h3>
              <h3 data-lang="en">Our response commitment</h3>
              <p data-lang="fr">
                Chaque demande reçoit une réponse personnalisée sous <strong>24h à 48h
                ouvrées</strong>. Vous ne resterez jamais sans nouvelles.
              </p>
              <p data-lang="en">
                Every enquiry receives a personalised response within <strong>24 to 48
                working hours</strong>. You will never be left without news.
              </p>
            </div>
          </Reveal>

          {/* Réseaux de l'Union — rangée socialLinks (uuptData) dans
              l'emplacement « encart » du gabarit. TODO(UUPT) : les href de
              socialLinks sont des espaces réservés (voir uuptData). */}
          <Reveal className="diaspora-box diaspora-box--center">
            <span className="eyebrow" data-lang="fr">Réseaux de l’Union</span>
            <span className="eyebrow" data-lang="en">The Union’s networks</span>
            <p data-lang="fr">
              Suivez les actualités de l’Union, de ses trois axes et de ses BDE
              partenaires sur nos réseaux.
            </p>
            <p data-lang="en">
              Follow news from the Union, its three axes and its partner BDEs on our
              networks.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-cream/70 text-ink/75 transition-colors duration-300 hover:border-brand/60 hover:text-brand-dark"
                >
                  <social.icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

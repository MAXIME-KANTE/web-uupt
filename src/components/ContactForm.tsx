import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_EMAIL } from '../constants'
import BrandLogo from './BrandLogo'
import HeroCarousel from './HeroCarousel'
import WhatsAppIcon from './icons/WhatsAppIcon'

/**
 * Diaporama du volet de marque : deux images par pôle (génie civil,
 * immobilier, comptabilité, numérique) en fondu automatique — le fond vit,
 * l'identité des quatre métiers reste présente derrière le texte.
 */
const BRAND_SLIDES: readonly string[] = [
  '/genie-civil/benjamin-lehman-wgMEX8OK0PY-unsplash.webp',
  '/immobilier/joao-emanuel-z849oJ33SdI-unsplash.webp',
  '/comptabilite/analyse-graphiques.webp',
  '/numerique/ben-kolde-bs2Ba7t69mM-unsplash.webp',
  '/genie-civil/chris-robert-a6LCzq7G86A-unsplash.webp',
  '/immobilier/jonathan-majam-hN-YvP7FZMg-unsplash.webp',
  '/comptabilite/bureau-planification.webp',
  '/numerique/christina-wocintechchat-com-m-6Dv3pe-JnSg-unsplash.webp',
]

interface ContactFormState {
  firstName: string
  email: string
  phone: string
  projectType: string
  message: string
}

const INITIAL_STATE: ContactFormState = {
  firstName: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
}

interface PoleOption {
  value: string
  fr: string
  en: string
}

const POLE_OPTIONS: readonly PoleOption[] = [
  { value: 'Génie Civil & BTP', fr: 'Génie Civil & BTP', en: 'Civil Engineering & Construction' },
  { value: 'Immobilier', fr: 'Immobilier', en: 'Real Estate' },
  { value: 'Comptabilité & Gestion', fr: 'Comptabilité & Gestion', en: 'Accounting & Management' },
  { value: 'Informatique & Numérique', fr: 'Informatique & Numérique', en: 'IT & Digital' },
  { value: 'Autre', fr: 'Autre demande', en: 'Other request' },
]

/**
 * Envoi RÉEL depuis un site statique via FormSubmit (aucun backend à gérer,
 * aucune inscription) : le formulaire est posté en AJAX vers leur endpoint
 * qui relaie le message sur CONTACT_EMAIL.
 * ⚠️ À la PREMIÈRE soumission, FormSubmit envoie un e-mail d'activation à
 * CONTACT_EMAIL — cliquer une fois sur le lien pour activer la réception
 * (ensuite tout arrive automatiquement).
 * Repli : si le service est injoignable (réseau, bloqueur), on propose le
 * mailto: classique pré-rempli vers la même adresse.
 */
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

/** Icône « G » officielle multicolore (simple <svg>, aucun script tiers). */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C40.9 35.4 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  )
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const WHATSAPP_HREF =
  'https://wa.me/221786879314?text=' +
  encodeURIComponent('Bonjour SALEEL GROUPE, je souhaite un devis pour…')

/**
 * Carte de contact « split » : volet gauche de marque (diaporama des pôles
 * sous voile nuit, logo, accroche, coordonnées, vague décorative) + volet
 * droit formulaire. Mobile : le volet de marque devient un bandeau compact.
 *
 * Soumission : POST AJAX FormSubmit → arrive directement sur CONTACT_EMAIL
 * (voir ci-dessus) ; états sending / sent / error avec repli mailto.
 * « Continuer avec Google » : pré-raccordé côté UI ; pour activer la vraie
 * connexion (récupérer nom + email du compte), brancher Google Identity
 * Services ici — le bouton affiche aujourd'hui un message de repli honnête.
 */
export default function ContactForm() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [googleNote, setGoogleNote] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  const validateEmail = (value: string): boolean => {
    const valid = EMAIL_RE.test(value.trim())
    setEmailError(!valid)
    return valid
  }

  const handleChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setForm((previous) => ({ ...previous, [field]: value }))
      if (field === 'email') {
        // Revalidation en direct dès que l'utilisateur corrige l'adresse.
        if (value.trim() && emailError) setEmailError(!EMAIL_RE.test(value.trim()))
      }
    }

  const validateForm = (): boolean => validateEmail(form.email)

  const buildMailto = (): string => {
    const subject =
      lang === 'en'
        ? `Project request — ${form.projectType || 'General'} — ${form.firstName}`
        : `Demande de projet — ${form.projectType || 'Général'} — ${form.firstName}`
    const body =
      lang === 'en'
        ? `Name: ${form.firstName}\nEmail: ${form.email}\nPhone: ${form.phone}\nDivision: ${form.projectType}\n\nMessage:\n${form.message}`
        : `Nom : ${form.firstName}\nEmail : ${form.email}\nTéléphone : ${form.phone}\nPôle : ${form.projectType}\n\nMessage :\n${form.message}`
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    setStatus('sending')

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject:
            lang === 'en'
              ? `Project request — ${form.projectType || 'General'} — ${form.firstName}`
              : `Demande de projet — ${form.projectType || 'Général'} — ${form.firstName}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          // Leurre antispam FormSubmit — les bots remplissent ce champ, pas les humains
          _honey: '',
          Nom: form.firstName,
          Email: form.email,
          Téléphone: form.phone || '—',
          Pôle: form.projectType || '—',
          Message: form.message,
        }),
      })
      const data: { success?: string | boolean } = await response
        .json()
        .catch(() => ({}))
      const ok = response.ok && (data.success === true || data.success === 'true')
      if (!ok) throw new Error('formsubmit refused')
      setStatus('sent')
      setForm(INITIAL_STATE)
      navigate('/merci')
    } catch {
      // Service injoignable : on propose le mailto pré-rempli (même adresse).
      setStatus('error')
    }
  }

  return (
    <div className="contact-card">
      {/* ── Volet gauche : marque ─────────────────────────────────────── */}
      <aside className="contact-card__brand">
        {/* Diaporama des pôles en fond (fondu auto, reduced-motion = figé),
            sous un voile nuit qui garantit la lisibilité du texte. */}
        <div className="contact-card__slides" aria-hidden="true">
          {/* Vignette ~40vw du volet de marque sur desktop : ne pas télécharger
              la variante plein viewport (défaut 100vw du carrousel). Le palier
              suit le CSS : .contact-card s'effondre en 1 colonne à 820px. */}
          <HeroCarousel images={BRAND_SLIDES} sizes="(min-width: 821px) 40vw, 100vw" />
        </div>
        <svg
          className="contact-card__wave"
          viewBox="0 0 400 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 96 C 70 44 130 140 205 96 C 275 55 330 128 400 84 L 400 180 L 0 180 Z"
            fill="rgba(255, 255, 255, 0.07)"
          />
          <path
            d="M0 128 C 80 84 150 168 230 124 C 300 86 350 148 400 116 L 400 180 L 0 180 Z"
            fill="rgba(255, 255, 255, 0.1)"
          />
        </svg>

        <div className="contact-card__logo-wrap">
          <BrandLogo className="contact-card__logo" priority tone="light" />
        </div>
        <p className="contact-card__eyebrow">
          <span data-lang="fr">Contact</span>
          <span data-lang="en">Contact</span>
        </p>
        <h2 className="contact-card__title" data-lang="fr">Parlons de<br />votre projet.</h2>
        <h2 className="contact-card__title" data-lang="en">Let's talk about<br />your project.</h2>
        <p className="contact-card__text" data-lang="fr">
          Un chantier à superviser, un bien à acquérir, des comptes à reprendre ou une idée
          numérique à lancer : écrivez-nous, un interlocuteur dédié vous répond sous 24 h ouvrées.
        </p>
        <p className="contact-card__text" data-lang="en">
          A site to supervise, a property to acquire, accounts to take over or a digital idea to
          launch: write to us — a dedicated contact will reply within 24 working hours.
        </p>
        <ul className="contact-card__channels">
          <li>
            <Mail size={15} aria-hidden="true" />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>
            <Phone size={15} aria-hidden="true" />
            <a href="tel:+221786879314">+221 78 687 93 14</a>
          </li>
          <li>
            <MapPin size={15} aria-hidden="true" />
            <span data-lang="fr">Thiès, Sénégal</span>
            <span data-lang="en">Thiès, Senegal</span>
          </li>
        </ul>

        {/* CTA WhatsApp direct : premier canal de conversion B2B au Sénégal. */}
        <div className="whatsapp-card">
          <WhatsAppIcon />
          <div>
            <h3 data-lang="fr">Échanger directement sur WhatsApp</h3>
            <h3 data-lang="en">Chat directly on WhatsApp</h3>
            <p data-lang="fr">Réponse rapide aux heures ouvrées, message pré-rempli.</p>
            <p data-lang="en">Quick answer during business hours, pre-filled message.</p>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener">
              <span data-lang="fr">Démarrer la conversation</span>
              <span data-lang="en">Start the conversation</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ── Volet droit : formulaire ──────────────────────────────────── */}
      <div className="contact-card__form">
        <span className="eyebrow" data-lang="fr">Formulaire</span>
        <span className="eyebrow" data-lang="en">Form</span>
        <h2 className="contact-card__form-title" data-lang="fr">Décrivez-nous votre besoin</h2>
        <h2 className="contact-card__form-title" data-lang="en">Tell us what you need</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="firstName" data-lang="fr">Nom complet</label>
            <label htmlFor="firstName" data-lang="en">Full name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              autoComplete="name"
              value={form.firstName}
              onChange={handleChange('firstName')}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" data-lang="fr">Adresse email</label>
            <label htmlFor="email" data-lang="en">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              aria-invalid={emailError}
              aria-describedby={emailError ? 'emailError' : undefined}
              className={emailError ? 'is-invalid' : undefined}
              value={form.email}
              onChange={handleChange('email')}
            />
            {emailError && (
              <span id="emailError" className="form-field__error" role="alert">
                <span data-lang="fr">Merci d&rsquo;indiquer une adresse email valide.</span>
                <span data-lang="en">Please enter a valid email address.</span>
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="phone" data-lang="fr">Téléphone (optionnel)</label>
            <label htmlFor="phone" data-lang="en">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>
          <div className="form-field">
            <label htmlFor="projectType" data-lang="fr">Pôle concerné (optionnel)</label>
            <label htmlFor="projectType" data-lang="en">Relevant division (optional)</label>
            <select
              id="projectType"
              name="projectType"
              value={form.projectType}
              onChange={handleChange('projectType')}
            >
              {/* Les <option> ne peuvent pas être masquées par CSS ([data-lang]) :
                  le libellé est donc rendu selon la langue courante. */}
              <option value="">{lang === 'en' ? 'Select…' : 'Sélectionnez…'}</option>
              {POLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {lang === 'en' ? option.en : option.fr}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="message" data-lang="fr">Votre message</label>
            <label htmlFor="message" data-lang="en">Your message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
            />
          </div>

          <button type="submit" className="button--submit" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span data-lang="fr">Envoi en cours…</span>
                <span data-lang="en">Sending…</span>
              </>
            ) : (
              <>
                <span data-lang="fr">Envoyer le message</span>
                <span data-lang="en">Send message</span>
                <Send size={17} className="submit-icon" aria-hidden="true" />
              </>
            )}
          </button>

          <div className="response-time-badge">
            <Clock size={16} aria-hidden="true" />
            <span data-lang="fr">Réponse garantie sous 24h à 48h ouvrées</span>
            <span data-lang="en">Guaranteed response within 24–48 working hours</span>
          </div>

          {/* succès = redirection /merci ; seule la branche erreur reste inline */}
          <p className="form-feedback" role="status" aria-live="polite">
            {status === 'error' && (
              <>
                <span data-lang="fr">
                  ⚠️ L'envoi automatique a échoué.{' '}
                  <a href={buildMailto()} className="link-accent">
                    Ouvrez votre messagerie
                  </a>{' '}
                  : votre message y est déjà pré-rempli vers {CONTACT_EMAIL}.
                </span>
                <span data-lang="en">
                  ⚠️ Automatic sending failed.{' '}
                  <a href={buildMailto()} className="link-accent">
                    Open your email client
                  </a>
                  : your message is pre-filled there towards {CONTACT_EMAIL}.
                </span>
              </>
            )}
          </p>
          <p className="contact-card__privacy" data-lang="fr">
            Vos informations servent uniquement à traiter votre demande (transmises à
            {` ${CONTACT_EMAIL}`} via un service d'acheminement) — rien n'est stocké ni réutilisé sur
            ce site.
          </p>
          <p className="contact-card__privacy" data-lang="en">
            Your details are only used to handle your request (forwarded to
            {` ${CONTACT_EMAIL}`} through a delivery service) — nothing is stored or reused on this
            site.
          </p>

          <div className="contact-card__google">
            <p className="contact-card__google-or" aria-hidden="true">
              <span data-lang="fr">ou</span>
              <span data-lang="en">or</span>
            </p>
            <button
              type="button"
              className="contact-card__google-btn"
              onClick={() => setGoogleNote(true)}
            >
              <GoogleIcon />
              <span data-lang="fr">Continuer avec Google</span>
              <span data-lang="en">Continue with Google</span>
            </button>
            <p className="contact-card__google-note" role="status" aria-live="polite">
              {googleNote && (
                <>
                  <span data-lang="fr">
                    La connexion Google arrive bientôt — le formulaire ci-dessus reste le moyen
                    le plus direct de nous écrire.
                  </span>
                  <span data-lang="en">
                    Google sign-in is coming soon — the form above remains the most direct way
                    to reach us.
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

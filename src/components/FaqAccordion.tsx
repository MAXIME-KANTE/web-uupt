import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface FaqItem {
  questionFr: string
  questionEn: string
  answerFr: string
  answerEn: string
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    questionFr: 'Quels services propose SALEEL GROUPE ?',
    questionEn: 'What services does SALEEL GROUPE offer?',
    answerFr:
      'Quatre pôles complémentaires : génie civil & BTP, immobilier, comptabilité & gestion, et informatique & numérique. Ils peuvent intervenir ensemble sur un même projet.',
    answerEn:
      'Four complementary divisions: civil engineering & construction, real estate, accounting & management, and IT & digital. They can work together on a single project.',
  },
  {
    questionFr: 'À qui s’adressent vos services ?',
    questionEn: 'Who are your services for?',
    answerFr:
      'Aux entreprises, aux particuliers et aux membres de la diaspora : construction, acquisition, gestion comptable ou transformation numérique.',
    answerEn:
      'Businesses, individuals and members of the diaspora: construction, acquisition, accounting management or digital transformation.',
  },
  {
    questionFr: 'Dans quelles zones intervenez-vous ?',
    questionEn: 'Which areas do you cover?',
    answerFr:
      'Nous sommes basés à Thiès et intervenons dans toutes les régions du Sénégal : Dakar, Thiès, Saint-Louis, Ziguinchor, Kaolack, et au-delà. Notre vision régionale s’étend à l’Afrique de l’Ouest à l’horizon 2035.',
    answerEn:
      'We are based in Thiès and operate across all regions of Senegal: Dakar, Thiès, Saint-Louis, Ziguinchor, Kaolack, and beyond. Our regional vision extends to West Africa by 2035.',
  },
  {
    questionFr: 'Comment démarrer un projet avec vous ?',
    questionEn: 'How do we start a project together?',
    answerFr:
      'Écrivez-nous via le formulaire de contact ou WhatsApp. Un premier échange nous permet de comprendre votre besoin, puis nous proposons un plan clair avec délais et budget.',
    answerEn:
      'Reach out via the contact form or WhatsApp. A first conversation helps us understand your need, then we propose a clear plan with timelines and budget.',
  },
  {
    questionFr: 'Accompagnez-vous la diaspora à distance ?',
    questionEn: 'Do you support the diaspora remotely?',
    answerFr:
      'Oui : suivi de chantier, transactions immobilières et gestion comptable peuvent être pilotés à distance, avec des points d’étape réguliers.',
    answerEn:
      'Yes: site supervision, real estate transactions and accounting management can be handled remotely, with regular progress updates.',
  },
  {
    questionFr: 'Le devis est-il gratuit ? Quel est le délai ?',
    questionEn: 'Is the quote free? How long does it take?',
    answerFr:
      'Oui, le devis est entièrement gratuit et sans engagement. Après un premier échange pour comprendre votre besoin, nous vous adressons une proposition détaillée sous 48h à 72h ouvrées.',
    answerEn:
      'Yes, the quote is completely free with no obligation. After a first conversation to understand your needs, we send you a detailed proposal within 48 to 72 working hours.',
  },
  {
    questionFr: 'Comment fonctionne la facturation ?',
    questionEn: 'How does billing work?',
    answerFr:
      'Nos prestations sont facturées selon un devis validé au préalable. Le paiement peut être échelonné selon l’avancement du projet (acompte, jalons, solde). Nous émettons des factures conformes aux normes OHADA.',
    answerEn:
      'Our services are billed according to a pre-approved quote. Payment can be staged according to project progress (deposit, milestones, final balance). We issue invoices compliant with OHADA standards.',
  },
  {
    questionFr: 'Peut-on combiner plusieurs pôles sur un même projet ?',
    questionEn: 'Can several divisions work on the same project?',
    answerFr:
      'Absolument, c’est même notre force. Par exemple, un projet immobilier peut mobiliser le pôle Génie Civil pour la construction, le pôle Immobilier pour la commercialisation, le pôle Comptabilité pour la gestion financière et le pôle Numérique pour la communication.',
    answerEn:
      'Absolutely — it’s actually our strength. For instance, a real estate project can involve Civil Engineering for construction, Real Estate for marketing, Accounting for financial management, and Digital for communications.',
  },
  {
    questionFr: 'Quelles garanties offrez-vous ?',
    questionEn: 'What guarantees do you offer?',
    answerFr:
      'Nous nous engageons sur un suivi transparent avec des points d’étape réguliers, le respect des délais convenus et un interlocuteur dédié pour chaque projet. En cas de problème, notre équipe intervient rapidement.',
    answerEn:
      'We commit to transparent follow-up with regular check-ins, respect for agreed deadlines, and a dedicated contact for each project. If an issue arises, our team responds swiftly.',
  },
  {
    questionFr: 'En combien de temps recevrai-je une réponse ?',
    questionEn: 'How quickly will I receive a response?',
    answerFr:
      'Nous nous engageons à répondre à toute demande sous 24h à 48h ouvrées. Pour les demandes urgentes, appelez-nous directement ou contactez-nous via WhatsApp.',
    answerEn:
      'We commit to responding to every enquiry within 24 to 48 working hours. For urgent requests, call us directly or reach out via WhatsApp.',
  },
]

/**
 * FAQ accordéon : ouverture fluide (hauteur animée via AnimatePresence),
 * chevron pivotant à 180°, un seul panneau ouvert à la fois.
 * Accessible : boutons natifs, aria-expanded/aria-controls/aria-labelledby.
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduced = usePrefersReducedMotion()

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <div key={item.questionFr} className={isOpen ? 'faq-item is-open' : 'faq-item'}>
            <button
              type="button"
              id={buttonId}
              className="faq-question"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span data-lang="fr">{item.questionFr}</span>
              <span data-lang="en">{item.questionEn}</span>
              <motion.span
                className="faq-chevron"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown size={18} aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-panel"
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p data-lang="fr">{item.answerFr}</p>
                  <p data-lang="en">{item.answerEn}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

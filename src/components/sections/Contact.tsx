import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  contactChannels,
  contactCopy,
  contactFormCopy,
  roleOptions,
  socialLinks,
} from '@/data/uuptData';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ContactFormErrors, ContactFormValues, SubmitStatus } from '@/types';

/* ------------------------------------------------------------------
 * Contact : formulaire d'adhesion / de contact + coordonnees.
 * La validation est reelle (cote client) ; l'envoi est simule car
 * aucun service backend n'est branche dans cette version.
 * ------------------------------------------------------------------ */

/** Classes communes a tous les champs du formulaire. */
const INPUT_CLASSES =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/25';

/**
 * Valide les valeurs du formulaire.
 * @returns Un objet vide si le formulaire est valide.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Indiquez votre nom complet (3 caractères minimum).';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Adresse email invalide (ex. prenom.nom@exemple.com).';
  }

  if (values.institution.trim().length < 2) {
    errors.institution = 'Précisez votre établissement ou votre BDE.';
  }

  if (!values.role) {
    errors.role = 'Sélectionnez votre rôle.';
  }

  if (values.message.trim().length < 20) {
    errors.message = 'Détaillez votre demande (20 caractères minimum).';
  }

  return errors;
}

export function Contact() {
  return (
    <section id="contact" className="bg-slate-950 py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle {...contactCopy} icon={Mail} tone="dark" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          {/* Coordonnees & reseaux */}
          <motion.aside
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7"
            >
              <h3 className="font-display text-lg font-bold text-white">Contact direct</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Le bureau de l’Union et le BDE de votre établissement restent joignables par ces
                canaux.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {contactChannels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      className="group flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600/40 hover:bg-blue-600/[0.08]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-600/15 text-blue-500 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <channel.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">
                          {channel.label}
                        </span>
                        <span className="block break-words text-sm font-medium text-slate-200">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7"
            >
              <h3 className="font-display text-lg font-bold text-white">Suivre l’Union</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Annonces d’activités, calendrier sportif et appels à participation des BDE.
              </p>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {socialLinks.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600/40 hover:bg-blue-600/10 hover:text-white"
                    >
                      <social.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-blue-600/25 bg-blue-600/[0.08] px-4 py-3.5 text-xs leading-relaxed text-blue-100">
                Établissement privé de Thiès ? Rejoindre la fédération se fait par simple demande,
                avec l’accord de votre direction et de votre BDE.
              </p>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Champ de formulaire generique (label + controle + message d'erreur).
 * ------------------------------------------------------------------ */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-relaxed text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * ContactForm : formulaire d'adhesion / de contact (carte blanche).
 * ------------------------------------------------------------------ */

const EMPTY_FORM: ContactFormValues = {
  fullName: '',
  email: '',
  institution: '',
  role: '',
  message: '',
};

function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const isSubmitting = status === 'submitting';

  /** Met a jour un champ et efface l'erreur associee. */
  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // TODO(UUPT) : brancher ici le service d'envoi officiel de l'Union
    // (API email, Google Form ou CRM). L'envoi est simule afin que
    // l'interface reste pleinement fonctionnelle sans backend.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus('success');
    setValues(EMPTY_FORM);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="rounded-2xl bg-white p-6 shadow-2xl sm:p-9"
    >
      <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-blue-600">
        <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {contactFormCopy.badge}
      </span>

      <h3 className="mt-5 text-2xl">{contactFormCopy.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{contactFormCopy.description}</p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h4 className="font-display text-lg font-bold text-slate-900">
              {contactFormCopy.successTitle}
            </h4>
            <p className="text-sm leading-relaxed text-emerald-900">
              {contactFormCopy.successMessage}
            </p>
            <Button variant="outlineDark" size="sm" onClick={() => setStatus('idle')}>
              {contactFormCopy.resetLabel}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="fullName" label="Nom complet" error={errors.fullName}>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Ex. Aïssatou Diop"
                  value={values.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={cn(INPUT_CLASSES, errors.fullName && 'border-red-400')}
                />
              </Field>

              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="prenom.nom@exemple.com"
                  value={values.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={cn(INPUT_CLASSES, errors.email && 'border-red-400')}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="institution" label="Établissement / BDE" error={errors.institution}>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  placeholder="Ex. BDE Pôle Informatique & Réseaux"
                  value={values.institution}
                  onChange={(event) => updateField('institution', event.target.value)}
                  aria-invalid={Boolean(errors.institution)}
                  aria-describedby={errors.institution ? 'institution-error' : undefined}
                  className={cn(INPUT_CLASSES, errors.institution && 'border-red-400')}
                />
              </Field>

              <Field id="role" label="Rôle" error={errors.role}>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={(event) => updateField('role', event.target.value)}
                    aria-invalid={Boolean(errors.role)}
                    aria-describedby={errors.role ? 'role-error' : undefined}
                    className={cn(
                      INPUT_CLASSES,
                      'appearance-none pr-11',
                      errors.role && 'border-red-400',
                    )}
                  >
                    <option value="">Sélectionnez votre rôle…</option>
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </Field>
            </div>

            <Field id="message" label="Votre message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Présentez votre demande : adhésion, proposition d’activité, partenariat…"
                value={values.message}
                onChange={(event) => updateField('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={cn(INPUT_CLASSES, 'resize-y', errors.message && 'border-red-400')}
              />
            </Field>

            {status === 'error' && (
              <p role="alert" className="text-xs leading-relaxed text-red-600">
                Le formulaire contient des informations à corriger avant l’envoi.
              </p>
            )}

            <Button
              type="submit"
              icon={Send}
              size="lg"
              fullWidth
              disabled={isSubmitting}
              className="mt-1"
            >
              {isSubmitting ? contactFormCopy.submittingLabel : contactFormCopy.submitLabel}
            </Button>

            <p className="text-center text-[0.7rem] leading-relaxed text-slate-500">
              {contactFormCopy.privacyNote}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
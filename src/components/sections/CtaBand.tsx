import { motion } from 'framer-motion';

import { organization } from '@/data/uuptData';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

/* ------------------------------------------------------------------
 * CtaBand : bandeau d'appel a l'action en fin de page d'accueil.
 * Cible les etablissements et BDE souhaitant rejoindre l'Union.
 * ------------------------------------------------------------------ */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
      {/* Halo bleu decoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl"
      />
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-page relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left"
      >
        <motion.div variants={fadeInUp} className="max-w-2xl">
          <span className="eyebrow text-blue-400">Rejoindre le mouvement</span>
          <h2 className="mt-4 text-3xl text-white sm:text-4xl">
            Votre établissement et son BDE prêt à{' '}
            <span className="text-blue-400">fédérer Thiès ?</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            L'UUPT accueille les universités, écoles et instituts privés de Thiès ainsi que
            leurs Bureaux Des Étudiants. Contactez-nous pour engager l'adhésion de votre
            établissement.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="white" iconPosition="right">
            Rejoindre l'UUPT
          </Button>
          <Button
            href={`https://wa.me/${organization.whatsapp}`}
            variant="outline"
            iconPosition="right"
          >
            Discuter sur WhatsApp
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { Info, Landmark, Users } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { headerCta, partnerDirectory, partnerStatusLabels, partnersCopy } from '@/data/uuptData';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Partner, PartnerStatus } from '@/types';

/* ------------------------------------------------------------------
 * Partners : etablissements d'enseignement superieur et BDE.
 * Grille de cartes (sigle, filieres, BDE, statut d'affiliation) et
 * bandeau d'information tant que le repertoire est provisoire.
 * ------------------------------------------------------------------ */

/** Couleurs du badge de statut d'affiliation. */
const STATUS_CLASSES: Record<PartnerStatus, string> = {
  affilie: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  'en-cours': 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  invite: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
};

export function Partners() {
  const { establishments, isPlaceholder, notice } = partnerDirectory;

  return (
    <section id="partenaires" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle {...partnersCopy} icon={Landmark} />

        {/* Bandeau d'information (liste provisoire) */}
        {isPlaceholder && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-left"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-blue-900 sm:text-sm">{notice}</p>
          </motion.div>
        )}

        {/* Grille des etablissements */}
        <motion.ul
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {establishments.map((partner) => (
            <motion.li key={partner.id} variants={fadeInUp} className="h-full">
              <PartnerCard partner={partner} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Appel a l'action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-slate-950 p-8 text-center sm:p-12"
        >
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-blue-300">
            Adhésion des établissements
          </span>

          <h3 className="max-w-2xl text-[1.35rem] leading-snug text-white sm:text-2xl">
            Votre université ou école privée n’est pas encore représentée ?
          </h3>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
            L’Union est ouverte à tout établissement d’enseignement supérieur privé de Thiès, ainsi
            qu’à son Bureau Des Étudiants. Écrivez-nous : une réunion de présentation est organisée
            avec votre direction et vos délégués.
          </p>

          <Button href={headerCta.href} icon={headerCta.icon} size="lg">
            {headerCta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/** Carte d'un etablissement partenaire et de son BDE. */
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 font-display text-sm font-extrabold tracking-tight text-white">
          {partner.shortName}
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide',
            STATUS_CLASSES[partner.status],
          )}
        >
          {partnerStatusLabels[partner.status]}
        </span>
      </div>

      <h3 className="mt-5 font-display text-base font-bold leading-snug text-slate-900">
        {partner.name}
      </h3>

      <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-slate-500">
        {partner.kind} • {partner.field}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {partner.filieres.map((filiere) => (
          <li
            key={filiere}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] text-slate-600"
          >
            {filiere}
          </li>
        ))}
      </ul>

      <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-600">
        <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
        {partner.bdeName}
      </p>
    </article>
  );
}
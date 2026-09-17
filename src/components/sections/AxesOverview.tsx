import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { activityAxes } from '@/data/uuptData';
import { fadeInUp, hoverLift, staggerContainer, viewportOnce } from '@/lib/motion';

/* ------------------------------------------------------------------
 * AxesOverview : apercu synthetique des 3 axes sur la page d'accueil.
 * Trois cartes claires (scroll reveal) avec lien vers la page /axes.
 * ------------------------------------------------------------------ */
export function AxesOverview() {
  return (
    <section id="axes-apercu" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-page">
        {/* En-tete de section */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-blue-700">
            Nos axes d'activités
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl">
            Trois leviers pour{' '}
            <span className="text-blue-600">faire rayonner les étudiants</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            De la plaidoirie aux tournois inter-établissements, l'UUPT structure la vie
            estudiantine de Thiès autour de trois axes complémentaires portés avec les BDE.
          </p>
        </div>

        {/* Cartes des axes */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {activityAxes.map((axis) => {
            const Icon = axis.icon;

            return (
              <motion.article
                key={axis.id}
                variants={fadeInUp}
                whileHover={hoverLift}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600/10 text-blue-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                  {axis.order} — {axis.tagline}
                </p>
                <h3 className="mt-2 text-lg">{axis.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {axis.description}
                </p>
                <Link
                  to="/axes"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors duration-300 group-hover:text-blue-900"
                >
                  Découvrir cet axe
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
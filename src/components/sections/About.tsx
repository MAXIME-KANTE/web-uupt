import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { SmartImage } from '@/components/ui/SmartImage';
import { aboutCopy, bdePartnership, media, missionPillars, organization } from '@/data/uuptData';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

/* ------------------------------------------------------------------
 * About : presentation de la mission federatrice de l'Union.
 * - illustration (fallback Unsplash) avec badge de date de creation
 * - les trois engagements statutaires (federer / promouvoir / BDE)
 * ------------------------------------------------------------------ */

export function About() {
  return (
    <section id="a-propos" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Illustration + badge de creation */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            {/* Cadre decoratif bleu */}
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-28 w-28 rounded-2xl border-4 border-blue-600/30"
            />

            <SmartImage
              asset={media.about}
              className="relative aspect-[4/3] w-full rounded-2xl shadow-xl"
            />

            {/* Badge : date de creation officielle */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-xl">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em]">
                {organization.createdLabel}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-wide text-white/85">
                Création officielle de l’{organization.acronym}
              </p>
            </div>
          </motion.div>

          {/* Texte + engagements */}
          <div className="flex flex-col gap-8">
            <SectionTitle {...aboutCopy} icon={Users} align="left" />

            <motion.ul
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-5"
            >
              {missionPillars.map((pillar) => (
                <motion.li
                  key={pillar.id}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* ------------------- Partenariat strategique BDE ------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-20 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-blue-700">
                {bdePartnership.eyebrow}
              </span>

              <h3 className="mt-5 text-[1.4rem] leading-snug sm:text-3xl">
                {bdePartnership.title}
              </h3>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
                {bdePartnership.description}
              </p>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2">
              {bdePartnership.commitments.map((commitment) => (
                <li
                  key={commitment.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                    <commitment.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-display text-sm font-bold text-slate-900">
                    {commitment.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {commitment.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
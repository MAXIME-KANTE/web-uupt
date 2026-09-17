import { motion, useScroll } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useRef } from 'react';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { timelineCopy, timelineSteps } from '@/data/uuptData';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
 * History : histoire de la creation de l'UUPT.
 * Timeline verticale sur fond sombre : le rail bleu se remplit au
 * fil du defilement (useScroll + scaleY) et l'etape fondatrice du
 * 26 avril 2026 est mise en exergue.
 * ------------------------------------------------------------------ */

export function History() {
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 85%', 'end 45%'],
  });

  return (
    <section id="historique" className="bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionTitle {...timelineCopy} icon={Rocket} tone="dark" />

        <div className="relative mt-14">
          <ol ref={listRef} className="relative flex flex-col gap-6">
            {/* Rail inactif */}
            <span
              aria-hidden="true"
              className="absolute left-[1.35rem] top-3 h-[calc(100%-1.5rem)] w-px bg-white/10"
            />
            {/* Rail actif : rempli au fil du defilement */}
            <motion.span
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute left-[1.35rem] top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400"
            />

            {timelineSteps.map((step) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Noeud de l'etape */}
                <span
                  className={cn(
                    'absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-300 hover:scale-105',
                    step.isMilestone
                      ? 'border-blue-600/50 bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'border-white/15 bg-white/[0.06] text-blue-500',
                  )}
                >
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>

                {/* Contenu */}
                <div
                  className={cn(
                    'rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300',
                    step.isMilestone
                      ? 'border-blue-600/40 bg-blue-600/[0.08]'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/20',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        'eyebrow rounded-full px-3 py-1',
                        step.isMilestone ? 'bg-blue-600 text-white' : 'bg-white/10 text-blue-300',
                      )}
                    >
                      Étape {step.order} — {step.phase}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      {step.period}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>

                  {step.isMilestone && (
                    <p className="mt-4 flex items-center gap-2 rounded-xl border border-blue-600/30 bg-blue-600/10 px-4 py-3 text-xs leading-relaxed text-blue-200">
                      <Rocket className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Acte fondateur de l’Union des Universités Privées de Thiès.
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
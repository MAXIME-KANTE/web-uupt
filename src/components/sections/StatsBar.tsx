import { motion } from 'framer-motion';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { keyStats } from '@/data/uuptData';

/* ------------------------------------------------------------------
 * StatsBar : bandeau sombre de chiffres cles, juste sous le hero.
 * Les compteurs s'animent a l'entree dans le viewport.
 * ------------------------------------------------------------------ */

export function StatsBar() {
  return (
    <section aria-label="Chiffres clés de l’Union" className="relative z-10 bg-slate-950">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 lg:grid-cols-4">
        {keyStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-blue-600/15 text-blue-500">
              <stat.icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <p className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight text-white sm:text-[2.75rem]">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            </p>

            <p className="mt-3 text-sm font-semibold text-white">{stat.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
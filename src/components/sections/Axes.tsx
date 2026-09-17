import { motion } from 'framer-motion';
import { ArrowRight, Check, Layers } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SmartImage } from '@/components/ui/SmartImage';
import { activityAxes, axesCopy } from '@/data/uuptData';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

/* ------------------------------------------------------------------
 * Axes : les trois axes d'activites de l'Union.
 * Trois cartes premium : image (zoom au survol), numero d'ordre,
 * icone en pastille, description et liste des activites concretes.
 * ------------------------------------------------------------------ */

export function Axes() {
  return (
    <section id="axes" className="bg-slate-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle {...axesCopy} icon={Layers} />

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {activityAxes.map((axis) => (
            <motion.li key={axis.id} variants={fadeInUp} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                {/* Visuel */}
                <div className="relative">
                  <SmartImage
                    asset={axis.image}
                    className="relative aspect-[16/10] w-full"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Numero d'ordre */}
                  <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-3.5 py-1 font-display text-xs font-extrabold tracking-[0.18em] text-white shadow-lg">
                    {axis.order}
                  </span>

                  {/* Icone de l'axe */}
                  <span className="absolute -bottom-6 right-6 grid h-12 w-12 place-items-center rounded-xl bg-white text-blue-600 shadow-lg ring-1 ring-slate-200">
                    <axis.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col p-6 pt-9">
                  <h3 className="font-display text-xl font-bold text-slate-900">{axis.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600">{axis.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{axis.description}</p>

                  {/* Activites concretes */}
                  <ul className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6">
                    {axis.activities.map((activity) => (
                      <li key={activity.title} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-sm font-semibold text-slate-800">
                            {activity.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                            {activity.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <div className="mt-auto pt-6">
                    <Button
                      href="#contact"
                      variant="outlineDark"
                      size="sm"
                      icon={ArrowRight}
                      fullWidth
                    >
                      Participer avec mon BDE
                    </Button>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
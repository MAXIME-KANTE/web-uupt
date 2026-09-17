import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { staggerContainer, fadeInUp } from '@/lib/motion';

interface PageHeroProps {
  /** Sur-titre en majuscules (ex. "Notre histoire"). */
  eyebrow: string;
  /** Titre principal de la page. */
  title: string;
  /** Portion du titre mise en valeur en bleu clair. */
  highlight?: string;
  /** Paragraphe d'introduction sous le titre. */
  description: string;
  /** Libelle affiche dans le fil d'Ariane (ex. "Historique"). */
  breadcrumb: string;
}

/* ------------------------------------------------------------------
 * PageHero : bandeau d'en-tete commun aux pages internes.
 * Fond bleu nuit epure (aucun motif artificiel), fil d'Ariane et
 * entree sequentielle en fade-in-up au chargement de la page.
 * ------------------------------------------------------------------ */

export function PageHero({ eyebrow, title, highlight, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-blue-950 pt-32 pb-16 sm:pt-36 sm:pb-20">
      {/* Halos bleus decoratifs (degrades subtils, pas de grille) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="visible"
        className="container-page relative"
      >
        {/* Fil d'Ariane */}
        <motion.nav variants={fadeInUp} aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-blue-200/80">
            <li>
              <Link to="/" className="rounded transition-colors hover:text-white">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-white">
              {breadcrumb}
            </li>
          </ol>
        </motion.nav>

        <motion.p
          variants={fadeInUp}
          className="eyebrow mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-blue-200"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl"
        >
          {title} {highlight && <span className="text-blue-400">{highlight}</span>}
        </motion.h1>

        <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}

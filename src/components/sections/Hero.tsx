import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { heroContent } from '@/data/uuptData';
import { fadeInUp, staggerContainer } from '@/lib/motion';

/* ------------------------------------------------------------------
 * Hero : section d'ouverture pleine page.
 * - image de fond plein ecran (/images/hero-bg.jpg) + voile sombre
 * - sur-titre en majuscules : MOUVEMENT ESTUDIANTIN • THIÈS, SÉNÉGAL
 * - titre percutant centre, avec accent bleu vif
 * - deux appels a l'action : pilule blanche + pilule contour
 * - bandeau d'accroche defilant en bas de section
 * ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      {/* Image de fond (fallback Unsplash si le fichier est absent) */}
      <SmartImage
        asset={heroContent.background}
        priority
        className="absolute inset-0 -z-20 h-full w-full"
        imageClassName="object-center"
      />

      {/* Voile sombre pour garantir le contraste du texte */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-scrim-dark" />

      <div className="container-page relative flex flex-1 flex-col items-center justify-center py-14 text-center">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Sur-titre */}
          <motion.p
            variants={fadeInUp}
            className="eyebrow text-shadow-strong text-white/80"
          >
            {heroContent.overtitle}
          </motion.p>

          {/* Titre principal */}
          <motion.h1
            variants={fadeInUp}
            className="text-shadow-strong max-w-4xl text-[2.25rem] font-extrabold leading-[1.06] text-white sm:text-6xl lg:text-7xl"
          >
            {heroContent.title.lead}{' '}
            <span className="text-blue-600">{heroContent.title.accent}</span>
            {heroContent.title.tail}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-[0.98rem] leading-relaxed text-white/80 sm:text-lg"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Appels a l'action */}
          <motion.div
            variants={fadeInUp}
            className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              href={heroContent.primaryCta.href}
              variant="white"
              size="lg"
              icon={heroContent.primaryCta.icon}
              className="w-full sm:w-auto"
            >
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="outline"
              size="lg"
              icon={heroContent.secondaryCta.icon}
              className="w-full sm:w-auto"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de defilement + bandeau d'accroche */}
      <div className="relative mt-auto">
        <div className="container-page flex justify-center pb-5">
          <a
            href="#a-propos"
            className="inline-flex flex-col items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 hover:text-white"
          >
            Découvrir
            <ArrowDown className="h-4 w-4 animate-float" aria-hidden="true" />
          </a>
        </div>

        <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-3.5 backdrop-blur-sm">
          <div className="flex w-max animate-marquee items-center gap-10 pr-10">
            {[...heroContent.marqueeItems, ...heroContent.marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-3 whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
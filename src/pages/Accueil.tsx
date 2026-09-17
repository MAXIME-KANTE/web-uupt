import { ArrowRight } from 'lucide-react';

import { CtaBand } from '@/components/sections/CtaBand';
import { AxesOverview } from '@/components/sections/AxesOverview';
import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';

/* ------------------------------------------------------------------
 * Page d'accueil (/) :
 * Hero plein ecran -> chiffres cles animes -> apercu des 3 axes
 * (liens vers /axes) -> appel a l'action BDE / contact.
 * ------------------------------------------------------------------ */
export function Accueil() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AxesOverview />
      <CtaBand />
      {/* Lien discret vers la page a-propos pour la decouverte */}
      <div className="sr-only">
        <a href="/a-propos">
          Découvrir la mission de l'UUPT <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
import { useEffect, useState } from 'react';
import type { SectionId } from '@/types';

/**
 * `useActiveSection` : detecte la section actuellement visible afin de
 * surligner le lien correspondant dans la navbar sticky.
 *
 * @param sectionIds Liste ordonnee des identifiants de sections observees.
 * @param offsetRatio Pourcentage de la hauteur de fenetre servant de ligne
 *                    de reference (0.35 = tiers superieur de l'ecran).
 */
export function useActiveSection(
  sectionIds: readonly SectionId[],
  offsetRatio = 0.35,
): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // On retient la premiere section intersectant la ligne de reference.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: `-${Math.round(offsetRatio * 100)}% 0px -55% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds, offsetRatio]);

  return activeSection;
}

/**
 * `useScrolled` : indique si l'utilisateur a depasse un seuil de scroll.
 * Utilise pour densifier la navbar au defilement.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
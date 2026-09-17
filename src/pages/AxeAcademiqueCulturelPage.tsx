import JsonLd, { serviceJsonLd, breadcrumbJsonLd } from '../components/JsonLd'
import AxePageTemplate from '../components/AxePageTemplate'
import { activityAxes } from '../data/uuptData'

/** L'axe porté par cette page (gabarit paramétré — voir AxePageTemplate). */
const AXE = activityAxes.find((axis) => axis.id === 'academique-culturel')!

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  serviceJsonLd({
    slug: 'axe-academique-culturel',
    name: `Axe ${AXE.order} — ${AXE.title.fr}`,
    serviceType: 'Axe d’activités estudiantines de l’UUPT',
    description: AXE.description.fr,
  }),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: AXE.title.fr, path: 'axe-academique-culturel' },
  ]),
]

/** Page de l'axe Académique & Culturel — route /axe-academique-culturel. */
export default function AxeAcademiqueCulturelPage() {
  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />
      <AxePageTemplate axe={AXE} />
    </>
  )
}

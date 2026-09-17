import JsonLd, { serviceJsonLd, breadcrumbJsonLd } from '../components/JsonLd'
import AxePageTemplate from '../components/AxePageTemplate'
import { activityAxes } from '../data/uuptData'

/** L'axe porté par cette page (gabarit paramétré — voir AxePageTemplate). */
const AXE = activityAxes.find((axis) => axis.id === 'innovation')!

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  serviceJsonLd({
    slug: 'axe-innovation',
    name: `Axe ${AXE.order} — ${AXE.title.fr}`,
    serviceType: 'Axe d’activités estudiantines de l’UUPT',
    description: AXE.description.fr,
  }),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: AXE.title.fr, path: 'axe-innovation' },
  ]),
]

/** Page de l'axe Innovation — route /axe-innovation. */
export default function AxeInnovationPage() {
  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />
      <AxePageTemplate axe={AXE} />
    </>
  )
}

import { useEffect } from 'react'
import { SITE_URL } from '../constants'

type Json = Record<string, unknown>

/**
 * Données structurées par page : injecte un `<script type="application/ld+json">`
 * dans le <head> au montage et le retire au démontage. Le @graph racine
 * (Organization + WebSite) vit statiquement dans index.html — ce composant
 * n'ajoute que les entrées propres à la page (Service, BreadcrumbList).
 *
 * ⚠️ Passer un `graph` défini AU NIVEAU MODULE de la page (référence stable) :
 * un littéral inline recrée le tableau à chaque rendu et rejoue l'effet.
 */
export default function JsonLd({ id, graph }: { id: string; graph: Json[] }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    document.head.appendChild(script)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, graph])
  return null
}

/** Entrée Service pour une page pôle (provider = l'Organization du @graph racine). */
export function serviceJsonLd(opts: {
  slug: string
  name: string
  serviceType: string
  description: string
}): Json {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/${opts.slug}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${SITE_URL}/${opts.slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Sénégal' },
    availableLanguage: ['fr', 'en'],
  }
}

/** Fil d'Ariane : items dans l'ordre Accueil → page — path SANS slash initial ('' = accueil). */
export function breadcrumbJsonLd(items: ReadonlyArray<{ name: string; path: string }>): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/${items[items.length - 1].path}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path ? `${SITE_URL}/${item.path}` : `${SITE_URL}/`,
    })),
  }
}

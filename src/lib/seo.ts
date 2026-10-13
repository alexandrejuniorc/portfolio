import { SITE, SITE_URL } from '@/config/site'
import { LOCALE_TAG, localePath } from '@/lib/locale'
import { m } from '@/paraglide/messages'
import { baseLocale, type Locale, locales } from '@/paraglide/runtime'

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', pt: 'pt_BR', es: 'es_ES' }

/** "https://site/" for the home page, "https://site/pt" for everything else. */
export function absoluteUrl(path: string, siteUrl: string = SITE_URL): string {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

export function personJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: absoluteUrl(localePath(locale)),
    email: `mailto:${SITE.email}`,
    jobTitle: m.meta_job_title({}, { locale }),
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
    sameAs: [SITE.linkedin, SITE.github],
    knowsAbout: [
      'SAP BTP',
      'SAP Fiori',
      'SAP CAP',
      'SAP Integration Suite',
      'React',
      'Next.js',
      'NestJS',
      'Python',
      'AWS',
      'Terraform',
    ],
  }
}

/** Everything the page puts in <head> for one locale. Used as the `head` of the route. */
export function buildHead(locale: Locale) {
  const title = m.meta_title({}, { locale })
  const description = m.meta_description({}, { locale })
  const url = absoluteUrl(localePath(locale))
  const image = absoluteUrl(`/og/${locale}.png`)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: OG_LOCALE[locale] },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...locales.map((other) => ({
        rel: 'alternate',
        hrefLang: LOCALE_TAG[other],
        href: absoluteUrl(localePath(other)),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: absoluteUrl(localePath(baseLocale)) },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(personJsonLd(locale)) }],
  }
}

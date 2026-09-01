// Single source of truth for the Person entity used across the site's JSON-LD. Every page
// shares the same @id (https://sanjayshrestha.com/#person) so consumers treat them as one
// entity — url/image/description can be overridden per page, but knowsAbout/worksFor/sameAs/
// address/email stay identical everywhere instead of drifting between hand-copied blocks.
export function getPersonSchema(overrides?: {
  url?: string
  image?: string
  description?: string
}) {
  return {
    '@type': 'Person',
    '@id': 'https://sanjayshrestha.com/#person',
    name: 'Sanjay Shrestha',
    jobTitle: 'Senior Product Designer',
    description:
      overrides?.description ??
      'Senior Product Designer with 15+ years designing digital products used by millions. Specialising in Design Systems, AI-Powered UX, and B2B SaaS.',
    url: overrides?.url ?? 'https://sanjayshrestha.com/',
    image: overrides?.image ?? 'https://sanjayshrestha.com/og-image.jpg',
    email: 'contact@sanjayshrestha.com',
    worksFor: {
      '@type': 'Organization',
      name: 'Decisions',
      url: 'https://www.meetingdecisions.com',
    },
    knowsAbout: [
      'Product Design',
      'UX Design',
      'Design Systems',
      'AI UX',
      'Agent UX',
      'Enterprise SaaS Design',
      'User Research',
      'Accessibility (WCAG)',
      'Interaction Design',
      'Information Architecture',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    sameAs: [
      'https://www.linkedin.com/in/shresthasans',
      'https://www.behance.net/shresthasans',
      'https://dribbble.com/shresthasans',
      'https://twitter.com/shresthasans',
      'https://github.com/shresthasans',
    ],
  }
}

// A distinct entity from the Person above, even though it's the same one-person practice —
// "Sanjay Shrestha" as an Organization.name identical to the Person.name made the two
// indistinguishable to schema consumers. Named after how the site already describes itself
// (see WebSite.description in layout.tsx) rather than inventing a business name unused
// anywhere else on the site.
export function getPublisherSchema() {
  return {
    '@type': 'Organization',
    '@id': 'https://sanjayshrestha.com/#organization',
    name: 'Sanjay Shrestha Portfolio',
    url: 'https://sanjayshrestha.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://sanjayshrestha.com/icon-512.png',
    },
  }
}

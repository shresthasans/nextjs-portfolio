export interface ProjectImages {
  hero: string
  gallery: { src: string; alt: string }[]
  heroBeforeAfter?: {
    before: string
    after: string
    beforeAlt: string
    afterAlt: string
  }
}

const projectImages: Record<string, ProjectImages> = {
  'decisions-ai-mobile-meeting-app': {
    hero: '/images/work/decisions-platform/hero.jpg',
    gallery: [],
  },
  'pagevamp-onboarding-redesign': {
    hero: '/images/work/pagevamp/hero.jpg',
    gallery: [
      { src: 'https://placehold.co/1200x600/EFF6FF/1D4ED8?text=Onboarding+Flow&font=montserrat', alt: 'Pagevamp: Redesigned onboarding flow' },
      { src: 'https://placehold.co/1200x600/FFF7ED/C2410C?text=Drop-off+Analysis&font=montserrat', alt: 'Pagevamp: Funnel drop-off by segment' },
      { src: 'https://placehold.co/1200x600/F0FDF4/166534?text=User+Personas&font=montserrat', alt: 'Pagevamp: David and Sarah persona summaries' },
      { src: 'https://placehold.co/1200x600/F5F3FF/6D28D9?text=Competitive+Analysis&font=montserrat', alt: 'Pagevamp: Competitive analysis matrix' },
      { src: 'https://placehold.co/1200x600/EFF6FF/1D4ED8?text=Final+Screens&font=montserrat', alt: 'Pagevamp: Prefill, domain, and privacy screens' },
    ],
  },
  'avira-antivirus-redesign': {
    hero: '/images/work/avira/hero.jpg',
    gallery: [
      { src: 'https://placehold.co/1200x600/FEF2F2/991B1B?text=Current+State%3A+Inconsistent+UI&font=montserrat', alt: 'Avira: Current-state inconsistencies across screens' },
      { src: 'https://placehold.co/1200x600/F0F9FF/0C4A6E?text=Affinity+Map%3A+Research+Synthesis&font=montserrat', alt: 'Avira: Affinity mapping of interview and usability findings' },
      { src: 'https://placehold.co/1200x600/FAFAF9/44403C?text=IA+%26+User+Flows&font=montserrat', alt: 'Avira: Information architecture and key user flows' },
      { src: 'https://placehold.co/1200x600/1E1B4B/C7D2FE?text=Design+System%3A+Warning+%7C+Error+%7C+Confirm&font=montserrat', alt: 'Avira: Design system — warning, error, and confirmation states' },
      { src: 'https://placehold.co/1200x600/F5F3FF/6D28D9?text=Wireframe+%E2%86%92+Final+UI&font=montserrat', alt: 'Avira: Dashboard wireframe to final high-fidelity UI' },
      { src: 'https://placehold.co/1200x600/1E1B4B/C7D2FE?text=Final+UI%3A+Dashboard+%7C+Scan+%7C+Quarantine+%7C+Upgrade&font=montserrat', alt: 'Avira: Final UI screens across all four core flows' },
    ],
  },
  'streamshare-streaming-app-design': {
    hero: '/images/work/streamshare/hero.jpg',
    gallery: [
      { src: '/images/work/streamshare/user-flow.jpg', alt: 'Streamshare: Onboarding flow' },
      { src: '/images/work/streamshare/wireframe-sketch.jpg', alt: 'Streamshare: Early wireframe sketches' },
      { src: '/images/work/streamshare/wireframe.jpg', alt: 'Streamshare: Discovery screen wireframe' },
      { src: '/images/work/streamshare/usability-testing.jpg', alt: 'Streamshare: Usability testing session' },
      { src: '/images/work/streamshare/prototype.jpg', alt: 'Streamshare: Stream detail prototype' },
      { src: '/images/work/streamshare/streamshare.jpg', alt: 'Streamshare: Final app screens' },
      { src: '/images/work/streamshare/affinity-mapping.jpg', alt: 'Streamshare: Affinity mapping' },
    ],
  },
  'nepal-pm-calendar': {
    hero: '/images/work/nepal-pm-calendar/hero.svg',
    gallery: [
      { src: 'https://placehold.co/1200x600/F5F3FF/6D28D9?text=Bikram+Sambat+Calendar&font=montserrat', alt: "Nepal PM Calendar: Bikram Sambat calendar in Office 365" },
      { src: 'https://placehold.co/1200x600/EFF6FF/1D4ED8?text=User+Flow&font=montserrat', alt: 'Nepal PM Calendar: User flow for event creation' },
      { src: 'https://placehold.co/1200x600/FFF7ED/C2410C?text=Localisation+System&font=montserrat', alt: 'Nepal PM Calendar: Nepali date localisation system' },
      { src: 'https://placehold.co/1200x600/F0FDF4/166534?text=Final+Design&font=montserrat', alt: "Nepal PM Calendar: Deployed in PM's Office" },
    ],
  },
  'stratus-maas-saas-dashboard-redesign': {
    hero: '/images/work/webscale-stratus/hero.jpg',
    gallery: [
      { src: '/images/work/webscale-stratus/01.svg', alt: 'Stratus: Platform dashboard' },
      { src: '/images/work/webscale-stratus/02.svg', alt: 'Stratus: Performance analytics' },
      { src: '/images/work/webscale-stratus/03.svg', alt: 'Stratus: Configuration panel' },
    ],
  },
  'linkedin-feed-redesign': {
    hero: '/images/work/linkedin/hero.jpg',
    gallery: [],
    heroBeforeAfter: {
      before: '/images/work/linkedin/linkedin-before.jpg',
      after: '/images/work/linkedin/linkedin-after.jpg',
      beforeAlt: 'Original LinkedIn homepage feed before the redesign',
      afterAlt: 'Redesigned LinkedIn homepage feed after the redesign',
    },
  },
}

export function getProjectImages(slug: string): ProjectImages | null {
  return projectImages[slug] ?? null
}

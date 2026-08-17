export interface Client {
  name: string
  logo: string
  width: number
  height: number
  href: string
}

export const clients: Client[] = [
  { name: 'Microsoft', logo: '/images/trusted-by/logo-microsoft.webp', width: 150, height: 32, href: 'https://www.microsoft.com/en-in/msidc' },
  { name: 'Webscale', logo: '/images/trusted-by/logo-webscale.svg', width: 230, height: 32, href: 'https://www.webscale.com/' },
  { name: 'Decisions', logo: '/images/trusted-by/logo-decisions.svg', width: 137, height: 32, href: 'https://meetingdecisions.com/' },
  { name: 'Neudesic IBM', logo: '/images/trusted-by/logo-neudesic-ibm.svg', width: 130, height: 32, href: 'https://www.neudesic.com/' },
  { name: 'Andmine', logo: '/images/trusted-by/logo-andmine.svg', width: 40, height: 40, href: 'https://andmine.com/' },
  { name: 'Innova Consulting', logo: '/images/trusted-by/logo-innovaconsulting.svg', width: 130, height: 32, href: 'https://innovaconsulting.com/' },
  { name: 'Meet Magento NYC', logo: '/images/trusted-by/logo-meetmagento-nyc.svg', width: 126, height: 32, href: 'https://meetmagentonyc.com/' },
  { name: 'Pagevamp', logo: '/images/trusted-by/logo-pagevamp.svg', width: 181, height: 32, href: 'https://pagevamp.com/' },
  { name: 'The Flash Pack', logo: '/images/trusted-by/logo-theflashpack.svg', width: 185, height: 32, href: 'https://itstheflashpack.com/' },
  { name: 'Aussie Webdev', logo: '/images/trusted-by/logo-aussie-webdev.webp', width: 105, height: 32, href: 'https://aussiewebdev.com.au/' },
  { name: 'Forge Trust', logo: '/images/trusted-by/logo-forgetrust.svg', width: 145, height: 32, href: 'https://forgetrust.com/' },
]

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'Slackbot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: 'https://sanjayshrestha.com/sitemap.xml',
  }
}

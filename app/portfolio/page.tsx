import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Sanjay Shrestha, Senior Product Designer portfolio PDF.',
  openGraph: {
    title: 'Portfolio | Sanjay Shrestha',
    description: 'Sanjay Shrestha, Senior Product Designer portfolio PDF.',
    url: 'https://sanjayshrestha.com/portfolio',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Sanjay Shrestha',
    description: 'Sanjay Shrestha, Senior Product Designer portfolio PDF.',
    images: ['/og-image.jpg'],
  },
}

export default function PortfolioPage() {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
      style={{ paddingTop: '4rem' }}
    >
      <div className="w-full h-full p-4 md:p-8">
        <iframe
          src="/portfolio/Sanjay_Shrestha_Senior_Product_Designer_Portfolio.pdf"
          className="w-full h-full rounded-xl shadow-2xl"
          style={{ border: 'none' }}
          title="Sanjay Shrestha Portfolio"
        />
      </div>
    </div>
  )
}

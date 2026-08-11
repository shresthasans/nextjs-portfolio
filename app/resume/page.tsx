import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Sanjay Shrestha, Senior Product Designer resume PDF.',
  alternates: {
    canonical: 'https://sanjayshrestha.com/resume',
  },
  openGraph: {
    title: 'Resume | Sanjay Shrestha',
    description: 'Sanjay Shrestha, Senior Product Designer resume PDF.',
    url: 'https://sanjayshrestha.com/resume',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Sanjay Shrestha',
    description: 'Sanjay Shrestha, Senior Product Designer resume PDF.',
    images: ['/og-image.jpg'],
  },
}

export default function ResumePage() {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
      style={{ paddingTop: '4rem' }}
    >
      <div className="w-full h-full p-4 md:p-8">
        <iframe
          src="/resume/Sanjay_Shrestha_Senior_Product_Designer_Resume.pdf"
          className="w-full h-full rounded-xl shadow-2xl"
          style={{ border: 'none' }}
          title="Sanjay Shrestha Resume"
        />
      </div>
    </div>
  )
}

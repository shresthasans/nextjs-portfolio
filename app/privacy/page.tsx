import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Sanjay Shrestha's privacy policy: what data this site collects through the contact form and analytics, and how it's used.",
  alternates: {
    canonical: 'https://sanjayshrestha.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Sanjay Shrestha',
    description:
      "What data this site collects through the contact form and analytics, and how it's used.",
    url: 'https://sanjayshrestha.com/privacy',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Sanjay Shrestha',
    description:
      "What data this site collects through the contact form and analytics, and how it's used.",
    images: ['/og-image.jpg'],
  },
}

export default function PrivacyPage() {
  return (
    <section className="pt-24 pb-24">
      <div className="container-portfolio">
        <AnimatedSection className="max-w-[70ch] mx-auto prose prose-lg prose-stone dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-headings:leading-snug prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 dark:prose-strong:text-stone-100">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4 not-prose">
            Privacy
          </p>
          <h1>Privacy Policy</h1>

          <p>
            This is a personal portfolio site, not a business collecting data at scale. This page covers
            the only two places this site handles personal data: the contact form and analytics.
          </p>

          <h2>Contact form</h2>
          <p>
            When you submit the contact form, your name, email address, and message are sent directly to
            me by email via{' '}
            <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
              Resend
            </a>
            , a transactional email provider. That data isn&apos;t stored in a database on this site, added
            to a mailing list, or used for marketing. It exists only in the resulting email thread between
            us, which I keep for as long as any normal correspondence.
          </p>

          <h2>Analytics</h2>
          <p>
            This site uses{' '}
            <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer">
              Google Analytics
            </a>{' '}
            and{' '}
            <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer">
              Microsoft Clarity
            </a>{' '}
            to understand how the site is used, page views, referrers, and general engagement, so I can
            improve it. Both set cookies and may record anonymized or pseudonymized usage data (Clarity
            includes session replay and heatmaps). Neither is used to identify you personally, and neither
            has access to anything you submit through the contact form.
          </p>

          <h2>What this site doesn&apos;t do</h2>
          <ul>
            <li>No account creation, no passwords, no user profiles</li>
            <li>No selling or sharing of personal data with third parties beyond the providers above</li>
            <li>No marketing emails or newsletter, unless you email me and ask to be added to one that doesn&apos;t currently exist</li>
          </ul>

          <h2>Your options</h2>
          <p>
            Most browsers let you block third-party cookies or use tracking protection, which will stop
            Google Analytics and Microsoft Clarity from running without affecting anything else on the
            site. If you&apos;d like a copy of, or the deletion of, any message you&apos;ve sent through the
            contact form, email{' '}
            <a href="mailto:contact@sanjayshrestha.com">contact@sanjayshrestha.com</a>.
          </p>

          <h2>Questions</h2>
          <p>
            For anything not covered here, reach out at{' '}
            <a href="mailto:contact@sanjayshrestha.com">contact@sanjayshrestha.com</a>.
          </p>

          <p className="text-sm text-stone-500 dark:text-stone-400">Last updated: September 2026.</p>
        </AnimatedSection>
      </div>
    </section>
  )
}

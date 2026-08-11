import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    "Sanjay Shrestha's accessibility statement: the standards this site aims to meet, known limitations, and how to report an issue.",
  alternates: {
    canonical: 'https://sanjayshrestha.com/accessibility',
  },
  openGraph: {
    title: 'Accessibility Statement | Sanjay Shrestha',
    description:
      "The accessibility standards this site aims to meet, known limitations, and how to report an issue.",
    url: 'https://sanjayshrestha.com/accessibility',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessibility Statement | Sanjay Shrestha',
    description:
      "The accessibility standards this site aims to meet, known limitations, and how to report an issue.",
    images: ['/og-image.jpg'],
  },
}

export default function AccessibilityPage() {
  return (
    <section className="pt-24 pb-24">
      <div className="container-portfolio">
        <AnimatedSection className="max-w-[70ch] mx-auto prose prose-lg prose-stone dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-headings:leading-snug prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 dark:prose-strong:text-stone-100">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4 not-prose">
            Accessibility
          </p>
          <h1>Accessibility Statement</h1>

          <p>
            This site is designed and built by a product designer, and accessibility is treated as a design
            requirement, not an afterthought. This statement covers what that means in practice, where the
            site currently falls short, and how to reach me if something doesn&apos;t work for you.
          </p>

          <h2>Standard we aim for</h2>
          <p>
            This site targets conformance with{' '}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG 2.1 Level AA
            </a>
            . That includes sufficient color contrast in both light and dark mode, full keyboard
            navigability, visible focus states, semantic heading structure, and alt text on meaningful
            images.
          </p>

          <h2>What&apos;s been done</h2>
          <ul>
            <li>Keyboard-navigable menus, links, and interactive components, with visible focus rings</li>
            <li>Color contrast checked against WCAG AA in both light and dark themes</li>
            <li>Semantic HTML and heading order used throughout, not just for styling</li>
            <li>Descriptive alt text on case-study and blog images</li>
            <li>Respects <code>prefers-reduced-motion</code> for users sensitive to animation</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Some embedded third-party content, PDF viewers, and interactive prototypes linked from case
            studies, isn&apos;t fully under this site&apos;s control and may not meet the same standard.
            Older case-study screenshots may also have less thorough alt text than newer ones. This is an
            active area of improvement, not a closed list.
          </p>

          <h2>Feedback</h2>
          <p>
            If you run into an accessibility barrier anywhere on this site, I&apos;d genuinely like to know.
            Email{' '}
            <a href="mailto:contact@sanjayshrestha.com">contact@sanjayshrestha.com</a> with the page and a
            description of the issue, and I&apos;ll look into it.
          </p>

          <p className="text-sm text-stone-500 dark:text-stone-400">Last updated: August 2026.</p>
        </AnimatedSection>
      </div>
    </section>
  )
}

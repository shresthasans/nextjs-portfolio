import Link from 'next/link'
import { Linkedin } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { testimonials } from '@/lib/testimonials'

export default function Testimonials() {
  return (
    <section className="py-28 border-y border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
      <div className="container-portfolio">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
            Recommendations
          </p>
          <h2 className="font-heading text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
            What people say
          </h2>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            Recommendations from colleagues and clients I&rsquo;ve worked with directly.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ name, title, quote, linkedinUrl }) => (
            <StaggerItem key={name}>
              <blockquote className="h-full p-6 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-700/40 rounded-2xl shadow-sm flex flex-col gap-4">
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="mt-auto flex items-center gap-2 text-sm">
                  <cite className="not-italic font-semibold text-stone-900 dark:text-stone-50">
                    {name}
                  </cite>
                  <span className="text-stone-400" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-stone-600 dark:text-stone-400">{title}</span>
                  {linkedinUrl && (
                    <Link
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} on LinkedIn`}
                      className="ml-auto shrink-0 -m-2 p-2 rounded-lg text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors duration-200"
                    >
                      <Linkedin size={16} />
                    </Link>
                  )}
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

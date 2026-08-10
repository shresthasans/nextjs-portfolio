import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import AnimatedSection from '@/components/AnimatedSection'
import BlogIndex from '@/components/BlogIndex'
import { BlogPost } from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on UX strategy, design systems, AI-powered interfaces, and building a career in product design.',
  openGraph: {
    title: 'Blog | Sanjay Shrestha',
    description: 'Thoughts on UX, design systems, AI, and career in product design.',
    url: 'https://sanjayshrestha.com/blog',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Sanjay Shrestha',
    description: 'Thoughts on UX, design systems, AI, and career in product design.',
    images: ['/og-image.jpg'],
  },
}

function getBlogPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title,
        date: data.date,
        readingTime: data.readingTime,
        tag: data.tag,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        series: data.series,
        seriesPart: data.seriesPart,
        seriesTotal: data.seriesTotal,
        seriesCoverImage: data.seriesCoverImage,
        seriesShortTitle: data.seriesShortTitle,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <section className="pt-24 pb-20">
      <div className="container-portfolio">
        <AnimatedSection className="mb-12">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4">
            Blog
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.1] mb-5 text-balance">
            Writing
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
            Thoughts on UX strategy, design systems, the role of AI in design, and building a long career in this field.
          </p>
        </AnimatedSection>

        <BlogIndex posts={posts} />
      </div>
    </section>
  )
}

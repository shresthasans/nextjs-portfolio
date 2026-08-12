#!/usr/bin/env node
// Validates every blog post and case study against the SEO/content conventions
// established across this repo's commit history. Run before publishing new
// content: `npm run check-content`. Exits non-zero on any error so it can
// gate CI later if wanted.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const BLOG_TAGS = new Set(['UX', 'Design Systems', 'AI', 'Career', 'Agent UX'])
const WORK_TYPES = new Set(['Enterprise', 'Government', 'SaaS', 'eCommerce'])

const clusterDataSrc = fs.readFileSync(path.join(ROOT, 'lib', 'cluster-data.ts'), 'utf-8')
const CLUSTER_SLUGS = new Set([...clusterDataSrc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]))

let errors = 0
let warnings = 0

function fail(msg) {
  console.log(`\x1b[31m✗ ERROR\x1b[0m ${msg}`)
  errors++
}
function warn(msg) {
  console.log(`\x1b[33m⚠ WARN\x1b[0m  ${msg}`)
  warnings++
}
function fileExists(publicPath) {
  if (!publicPath || /^https?:\/\//.test(publicPath)) return true
  return fs.existsSync(path.join(ROOT, 'public', publicPath.replace(/^\//, '')))
}

// ---- Blog posts ----

const blogDir = path.join(ROOT, 'content', 'blog')
const blogSlugs = new Set()

for (const filename of fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))) {
  const slug = filename.replace('.mdx', '')
  blogSlugs.add(slug)
  const { data } = matter(fs.readFileSync(path.join(blogDir, filename), 'utf-8'))
  const tag = `blog/${filename}`

  for (const field of ['title', 'date', 'readingTime', 'tag', 'excerpt']) {
    if (!data[field]) fail(`${tag}: missing required frontmatter field "${field}"`)
  }
  if (data.slug && data.slug !== slug) {
    fail(`${tag}: frontmatter slug "${data.slug}" doesn't match filename "${slug}"`)
  }
  if (data.tag && !BLOG_TAGS.has(data.tag)) {
    fail(`${tag}: tag "${data.tag}" isn't one of ${[...BLOG_TAGS].join(', ')} — BlogCard/tagHeaderBg lookups will silently render unstyled`)
  }
  if (data.cluster && !CLUSTER_SLUGS.has(data.cluster)) {
    fail(`${tag}: cluster "${data.cluster}" isn't one of ${[...CLUSTER_SLUGS].join(', ')} — won't show up on its hub page`)
  }
  if (data.excerpt) {
    const len = data.excerpt.length
    if (len < 133 || len > 158) {
      warn(`${tag}: excerpt is ${len} chars, established convention is 133-158`)
    }
  }
  if (data.date && isNaN(new Date(data.date).getTime())) {
    fail(`${tag}: date "${data.date}" isn't a valid date`)
  }
  if (data.coverImage && !fileExists(data.coverImage)) {
    fail(`${tag}: coverImage "${data.coverImage}" doesn't exist in /public`)
  }
  if (data.seoTitle && data.seoTitle.length > 60) {
    warn(`${tag}: seoTitle is ${data.seoTitle.length} chars, search engines truncate around 60`)
  }
}

// ---- Case studies ----

const workDir = path.join(ROOT, 'content', 'work')
const workDataSrc = fs.readFileSync(path.join(ROOT, 'lib', 'work-data.ts'), 'utf-8')
const registeredSlugs = new Set([...workDataSrc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]))

for (const m of workDataSrc.matchAll(/slug: '([^']+)'[\s\S]*?type: '([^']+)'/g)) {
  const [, slug, type] = m
  if (!WORK_TYPES.has(type)) {
    fail(`lib/work-data.ts: "${slug}" has type "${type}", not one of ${[...WORK_TYPES].join(', ')} — CaseStudyCard's typeColors lookup will render unstyled`)
  }
}

const slugPageSrc = fs.readFileSync(path.join(ROOT, 'app', 'work', '[slug]', 'page.tsx'), 'utf-8')
const unlistedMatch = slugPageSrc.match(/UNLISTED_SLUGS = new Set\(\[([^\]]*)\]\)/)
const unlistedSlugs = new Set(
  unlistedMatch ? [...unlistedMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]) : []
)

for (const filename of fs.readdirSync(workDir).filter((f) => f.endsWith('.mdx'))) {
  const slug = filename.replace('.mdx', '')
  const { data } = matter(fs.readFileSync(path.join(workDir, filename), 'utf-8'))
  const tag = `work/${filename}`

  // Note: frontmatter "type" here is freeform display text (rendered as-is on the case
  // study page), unrelated to CaseStudy['type'] in lib/work-data.ts checked below.
  for (const field of ['title', 'client', 'role', 'year', 'type', 'outcome', 'description']) {
    if (!data[field]) fail(`${tag}: missing required frontmatter field "${field}"`)
  }
  if (data.description) {
    const len = data.description.length
    if (len < 70 || len > 160) {
      warn(`${tag}: meta description is ${len} chars — Google truncates search snippets around 155-160`)
    }
  }
  if (!registeredSlugs.has(slug) && !unlistedSlugs.has(slug)) {
    fail(`${tag}: not registered in lib/work-data.ts and not in UNLISTED_SLUGS — page is live but missing from sitemap.xml and the /work index`)
  }
  if (!unlistedSlugs.has(slug)) {
    const ogPath = path.join(ROOT, 'public', 'images', 'og', `${slug}.jpg`)
    if (!fs.existsSync(ogPath)) {
      warn(`${tag}: no dedicated OG image at public/images/og/${slug}.jpg — falls back to the generic /og-image.jpg on social shares`)
    }
  }
}

// ---- Registered-but-orphaned check (work-data.ts entry with no content file) ----

for (const slug of registeredSlugs) {
  if (!fs.existsSync(path.join(workDir, `${slug}.mdx`))) {
    fail(`lib/work-data.ts: slug "${slug}" has no matching content/work/${slug}.mdx`)
  }
}

// ---- Topic cluster hub pages ----

for (const slug of CLUSTER_SLUGS) {
  const tag = `lib/cluster-data.ts`
  const contentPath = path.join(ROOT, 'content', 'clusters', `${slug}.mdx`)
  if (!fs.existsSync(contentPath)) {
    fail(`${tag}: cluster "${slug}" has no matching content/clusters/${slug}.mdx`)
    continue
  }
  const { data } = matter(fs.readFileSync(contentPath, 'utf-8'))
  for (const field of ['title', 'excerpt']) {
    if (!data[field]) fail(`content/clusters/${slug}.mdx: missing required frontmatter field "${field}"`)
  }
  if (data.excerpt) {
    const len = data.excerpt.length
    if (len < 133 || len > 158) {
      warn(`content/clusters/${slug}.mdx: excerpt is ${len} chars, established convention is 133-158`)
    }
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s).`)
process.exit(errors > 0 ? 1 : 0)

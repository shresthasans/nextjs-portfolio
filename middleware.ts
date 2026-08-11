import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Content from previous site versions (pre-Next.js rebuild) that Google still has indexed
// but that has no current equivalent to redirect to. Per SEO guidance: don't 301 orphaned
// pages to the homepage or another unrelated page just to preserve "link juice" — a 410
// tells Google the content is intentionally, permanently gone, which de-indexes it faster
// than a plain 404 (which Google treats as possibly temporary and keeps re-checking).
//
// The Avira case study is a deliberate exception: /work/avira-antivirus-redesign is still a
// live, current page — only these old pre-rebuild URLs for it are being retired.
const GONE_EXACT = new Set([
  '/avira',
  '/avira.html',
  '/projects/casestudy-avira.pdf',
  '/angular-js-and-javascript-mvc',
  '/best-blogs-for-front-end-development',
  '/ux-vs-cx-whats-the-different',
  '/category/cx',
  '/category/frontend',
  '/category/ux',
  '/category/blog',
  '/author/shresthasanspfl',
  '/projects/skilledup',
  '/projects/bodyrepair',
  '/projects/genie',
  '/projects/instatees',
  '/projects/jet-suite',
  '/projects/kratopia',
  '/projects/mockup',
  '/projects/plumbing',
  '/projects/pulse',
  '/projects/sftdev',
  '/projects/travel',
  '/projects/americana',
  '/projects/portfolio/v2',
  '/beta',
  '/psm',
])

const GONE_PREFIXES = [
  '/test/',
  '/liabilities/',
  '/projects/digital-lagos',
  '/projects/lime-proxies',
  '/projects/rohitsoni',
  '/projects/traider',
  '/projects/ms-uxdev',
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase()
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

  if (GONE_EXACT.has(normalized) || GONE_PREFIXES.some((p) => normalized.startsWith(p))) {
    // Render the actual site page (same fonts, nav, footer, theme) for the /gone route,
    // then re-serve its HTML here with a real 410 status — a plain page component can't
    // set its own status code, only a Response constructed in middleware can.
    const page = await fetch(new URL('/gone', request.url))
    const html = await page.text()
    return new NextResponse(html, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/avira',
    '/avira.html',
    '/projects/:path*',
    '/angular-js-and-javascript-mvc',
    '/best-blogs-for-front-end-development',
    '/ux-vs-cx-whats-the-different',
    '/category/:path*',
    '/author/:path*',
    '/test/:path*',
    '/liabilities/:path*',
    '/beta',
    '/psm',
  ],
}

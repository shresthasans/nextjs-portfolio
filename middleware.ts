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

const GONE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gone | Sanjay Shrestha</title>
<meta name="robots" content="noindex">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c0a09;
    color: #fafaf9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .wrap { text-align: center; padding: 24px; max-width: 420px; }
  .code { font-size: 4.5rem; font-weight: 800; color: #292524; line-height: 1; margin: 0 0 8px; }
  h1 { font-size: 1.375rem; font-weight: 600; margin: 0 0 12px; }
  p { color: #a8a29e; margin: 0 0 24px; line-height: 1.6; }
  .links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  a {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px; border-radius: 10px; font-size: 0.875rem; font-weight: 500;
    text-decoration: none; transition: background-color 0.2s;
  }
  .primary { background: #fafaf9; color: #1c1917; }
  .primary:hover { background: #fbbf24; }
  .secondary { background: #1c1917; color: #d6d3d1; border: 1px solid #292524; }
  .secondary:hover { background: #292524; }
</style>
</head>
<body>
  <div class="wrap">
    <p class="code">410</p>
    <h1>This page is gone</h1>
    <p>The content that used to live here has been permanently removed and won&rsquo;t be coming back.</p>
    <div class="links">
      <a class="primary" href="/">Back home</a>
      <a class="secondary" href="/work">View my work</a>
      <a class="secondary" href="/contact">Contact</a>
    </div>
  </div>
</body>
</html>`

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase()
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

  if (GONE_EXACT.has(normalized) || GONE_PREFIXES.some((p) => normalized.startsWith(p))) {
    return new NextResponse(GONE_HTML, {
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

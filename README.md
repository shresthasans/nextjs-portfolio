# Sanjay Shrestha — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS. Blog content is authored in MDX.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`) for blog posts
- [Resend](https://resend.com/) for contact form email
- Deployed to Cloudflare Pages via `@cloudflare/next-on-pages`

## Getting started

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — routes and pages (App Router), including `about`, `work`, `blog`, `portfolio`, `contact`, `resume`, `accessibility`, plus `sitemap.ts`, `robots.ts`, and `manifest.ts` for SEO/PWA
- `components/` — UI components
- `content/` — MDX blog posts and case studies
- `design-system/` — shared design tokens/primitives
- `lib/` — utilities and shared logic
- `public/` — static assets, incl. `images/` (WebP-optimized) and `resume/` (hosted resume PDF)

## Images

All images under `public/images/` are pre-optimized to WebP (converted via `sharp`) since `next/image` optimization is disabled (`images.unoptimized: true`, required for the Cloudflare Pages runtime). When adding new images, convert to WebP before committing rather than relying on `next/image` to do it at request time.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run pages:build` | Build for Cloudflare Pages |
| `npm run preview` | Build + preview locally via Wrangler |
| `npm run deploy` | Build + deploy to Cloudflare Pages |

## Environment variables

Create a `.env.local` file (not committed) with any required secrets, e.g.:

```
RESEND_API_KEY=your_key_here
```

## Deployment

Deployed to Cloudflare Pages. `wrangler.toml` holds the Cloudflare Pages project config. Run `npm run deploy` to build and deploy.

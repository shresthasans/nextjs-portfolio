/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      { source: '/work/pagevamp', destination: '/work/pagevamp-onboarding-redesign', permanent: true },
      { source: '/work/avira', destination: '/work/avira-antivirus-redesign', permanent: true },
      { source: '/work/streamshare', destination: '/work/streamshare-streaming-app-design', permanent: true },
      { source: '/work/streamshare-streaming-app-redesign', destination: '/work/streamshare-streaming-app-design', permanent: true },
      { source: '/work/webscale-stratus', destination: '/work/stratus-maas-saas-dashboard-redesign', permanent: true },
      { source: '/work/webscale-stratus-saas-dashboard-redesign', destination: '/work/stratus-maas-saas-dashboard-redesign', permanent: true },
      { source: '/blog/ai-ux-2024', destination: '/blog/ai-ux-design-patterns', permanent: true },
      { source: '/blog/ai-generated-ui-to-production-ready-handoff', destination: '/blog/ai-native-workflow-transition', permanent: true },
      { source: '/blog/ai-ux-design-patterns-that-work', destination: '/blog/ai-ux-design-patterns', permanent: true },
      { source: '/blog/building-a-design-system-from-scratch', destination: '/blog/design-systems-at-scale', permanent: true },
      { source: '/blog/icons-in-design-systems', destination: '/blog/icons-design-systems', permanent: true },
      { source: '/blog/scaling-product-design-with-ai-and-technical-skills', destination: '/blog/scaling-product-design-with-ai', permanent: true },
      { source: '/blog/senior-in-product-design', destination: '/blog/senior-designer-career', permanent: true },
      { source: '/blog/user-research-methods-in-product-design', destination: '/blog/user-research-applied', permanent: true },
      { source: '/blog/ux-fixes-that-boost-conversion', destination: '/blog/ux-fixes-boost-conversions', permanent: true },
    ]
  },
}

export default nextConfig

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

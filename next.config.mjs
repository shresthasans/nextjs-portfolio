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
    ]
  },
}

export default nextConfig

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

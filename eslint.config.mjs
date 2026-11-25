import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      // New in eslint-config-next 16 (React Compiler rules). Flags the setMounted(true)
      // hydration guard in HeroSection, PrototypeViewer, and ThemeProvider. Kept as a
      // warning until those are refactored (e.g. useSyncExternalStore).
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    ignores: ['.next/**', '.open-next/**', '.wrangler/**', 'node_modules/**', 'next-env.d.ts', 'cloudflare-env.d.ts'],
  },
]

export default eslintConfig

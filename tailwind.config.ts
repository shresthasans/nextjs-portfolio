import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#CA8A04',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#CA8A04',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            lineHeight: '1.8',
            fontSize: '1rem',
            color: 'var(--tw-prose-body)',
            /* Headings */
            'h2': {
              fontSize: '1.375rem',
              fontWeight: '700',
              marginTop: '3rem',
              marginBottom: '0.875rem',
              paddingBottom: '0.625rem',
              borderBottom: '1px solid var(--tw-prose-hr)',
              lineHeight: '1.3',
            },
            'h3': {
              fontSize: '1.125rem',
              fontWeight: '600',
              marginTop: '2.25rem',
              marginBottom: '0.625rem',
              lineHeight: '1.4',
            },
            'h4': {
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '1.75rem',
              marginBottom: '0.5rem',
            },
            /* Body */
            'p': {
              marginTop: '0',
              marginBottom: '1.375rem',
              lineHeight: '1.85',
            },
            /* Lists */
            'ul': {
              marginTop: '0.75rem',
              marginBottom: '1.375rem',
              paddingLeft: '1.5rem',
            },
            'ol': {
              marginTop: '0.75rem',
              marginBottom: '1.375rem',
              paddingLeft: '1.5rem',
            },
            'li': {
              marginTop: '0.4rem',
              marginBottom: '0.4rem',
              lineHeight: '1.75',
            },
            'ul > li': {
              paddingLeft: '0.375rem',
            },
            'ol > li': {
              paddingLeft: '0.375rem',
            },
            /* Nested list tighter */
            'li > ul, li > ol': {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
            },
            /* Strong */
            'strong': {
              fontWeight: '600',
            },
            /* HR */
            'hr': {
              marginTop: '3rem',
              marginBottom: '3rem',
              borderTopWidth: '1px',
            },
            /* Blockquote */
            'blockquote': {
              fontStyle: 'normal',
              fontWeight: '400',
              borderLeftWidth: '3px',
              paddingLeft: '1.25rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            /* Code */
            'code': {
              fontSize: '0.875em',
              fontWeight: '500',
              borderRadius: '0.25rem',
              paddingLeft: '0.35rem',
              paddingRight: '0.35rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            /* Tables */
            'table': {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontSize: '0.875em',
              lineHeight: '1.6',
            },
            'thead': {
              borderBottomWidth: '2px',
              borderBottomColor: 'var(--tw-prose-hr)',
            },
            'thead th': {
              fontWeight: '600',
              paddingRight: '1rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0',
              verticalAlign: 'bottom',
            },
            'thead th:first-child': { paddingLeft: '0' },
            'thead th:last-child': { paddingRight: '0' },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--tw-prose-hr)',
            },
            'tbody tr:last-child': { borderBottomWidth: '0' },
            'tbody td': {
              verticalAlign: 'baseline',
              paddingTop: '0.75rem',
              paddingRight: '1rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0',
            },
            'tbody td:first-child': { paddingLeft: '0' },
            'tbody td:last-child': { paddingRight: '0' },
            /* Lead paragraph */
            '[class~="lead"]': {
              fontSize: '1.125rem',
              lineHeight: '1.75',
            },
          },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config

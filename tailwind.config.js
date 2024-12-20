/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#2563EB',
              },
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            strong: {
              color: '#111827',
            },
            code: {
              color: '#111827',
            },
            figcaption: {
              color: '#6B7280',
            },
            blockquote: {
              color: '#111827',
              borderLeftColor: '#E5E7EB',
            },
            p: {
              marginBottom: '1.5em',
              lineHeight: '1.8',
            },
            'ul > li': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ol > li': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul > li::marker': {
              color: '#6B7280',
            },
            'ol > li::marker': {
              color: '#6B7280',
            },
          },
        },
        lg: {
          css: {
            p: {
              marginBottom: '1.666667em',
            },
          },
        },
      },
      aspectRatio: {
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
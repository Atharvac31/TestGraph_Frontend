/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Restrained, developer-tool palette. Slate for structure,
        // indigo as the single accent, semantic colors for status.
        surface: {
          DEFAULT: '#0b0f17',   // app background (dark base)
          raised: '#111827',    // cards
          border: '#1f2937',    // hairlines
        },
        ink: {
          DEFAULT: '#e5e7eb',   // primary text
          muted: '#9ca3af',     // secondary text
          faint: '#6b7280',     // tertiary text
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          soft: '#1e1b4b',
        },
        status: {
          critical: '#f87171',
          high: '#fb923c',
          medium: '#facc15',
          low: '#4ade80',
          open: '#f87171',
          resolved: '#4ade80',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.3), 0 1px 3px 0 rgb(0 0 0 / 0.2)',
      },
    },
  },
  plugins: [],
}
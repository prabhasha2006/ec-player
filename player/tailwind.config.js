/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        dark: '#0F172A',
        darker: '#020617',
        gray: {
          850: '#1E293B',
          750: '#334155',
        }
      },
      animation: {
        'wave': 'wave 0.5s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 2s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        wave: {
          '0%': { height: '20%' },
          '100%': { height: '100%' }
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'], // Modern titles
        'body': ['system-ui', '-apple-system', 'sans-serif'], // Neutral text
      },
      colors: {
        'german': {
          'black': '#1a1a1a',
          'red': '#dd0000',
          'gold': '#ffcc00',
        },
        'dark': {
          '50': '#f8f8f8',
          '100': '#e5e5e5',
          '200': '#d4d4d4',
          '300': '#a3a3a3',
          '400': '#737373',
          '500': '#525252',
          '600': '#404040',
          '700': '#262626',
          '800': '#171717',
          '900': '#0a0a0a',
        }
      },
      backgroundImage: {
        'german-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #dd0000 50%, #ffcc00 75%, #1a1a1a 100%)',
        'german-subtle': 'linear-gradient(135deg, #0a0a0a 0%, #171717 40%, #262626 60%, #1a1a1a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/shadcn-vue/dist/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      colors: {
        a4pm: {
          orange: '#FF8C00',
          'orange-dark': '#E67E00',
          'orange-light': '#FFA726',
          blue: '#1E3A8A',
          'blue-dark': '#1E293B',
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

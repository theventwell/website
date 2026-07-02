/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8D4FF',
          300: '#8CB8FF',
          400: '#5E9AFF',
          500: '#3B82F6',  // vibrant primary accent
          600: '#2563EB',
          700: '#1E40AF',  // rich confident deep
          800: '#1E3A8A',
          900: '#0F2A5E',
        },
        'accent-warm': {
          400: '#FBBF24',
          500: '#F59E0B', // warm amber for energy and trust
          600: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Balivia Medium', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -15px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'float': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
}

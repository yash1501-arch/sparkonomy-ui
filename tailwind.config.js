/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary-1': 'var(--brand-primary-1)',
        'brand-primary-2': 'var(--brand-primary-2)',
        'brand-primary-3': 'var(--brand-primary-3)',
      }
    },
  },
  plugins: [],
}

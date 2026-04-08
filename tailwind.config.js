/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        success: {
          light: 'var(--color-success-light)',
          dark: 'var(--color-success-dark)',
        }
      },
      width: {
        'sidebar-open': '200px',
        'sidebar-closed': '64px',
      }
    },
  },
  plugins: [],
}

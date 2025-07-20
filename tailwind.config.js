/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{ts,tsx,js,jsx,html}",
    "./**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          light: "#d9f99d",
          DEFAULT: "#65a30d",
          dark: "#3f6212",
        },
      },
    },
  },
  plugins: [],
};

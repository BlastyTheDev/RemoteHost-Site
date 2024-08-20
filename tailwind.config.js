/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      "lexend-exa": ["Lexend Exa", "sans-serif"],
      "poppins": ["Poppins", "sans-serif"],
      "cascadia-code": ["Cascadia Code", "monospace"],
    },
    extend: {},
    colors: {
      "bg-primary": "#222325",
      "bg-secondary": "#36383b",
      "bg-accent": "#0f1011",
      "highlight": "#5d6069",
      "text-primary": "#ffffff",
      "text-secondary": "#cfcdcd",
    }
  },
  plugins: [],
}


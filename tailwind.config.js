/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // Certifique-se de incluir 'mdx' se estiver usando
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  // Incluindo 'mdx' aqui também
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
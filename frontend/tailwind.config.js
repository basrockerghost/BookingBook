const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    function({ addUtilities}) {
      addUtilities({
        '.scrollbar-hidden': {
          'scrollbar-width': 'none',//for firefox
          '-ms-overflow-style': 'none', //for IE and Edge
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none', //for safari and chrome
        }
      })
    }
  ],
}
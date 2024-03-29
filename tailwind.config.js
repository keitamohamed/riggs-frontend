/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '300px', 'max': '768px'},
      // => @media (min--width: 300px and max-width: 570px) { ... }

      'cm': {'min': '768px'},
      // => @media (min-width: 768px) { ... }

      'sms': {'max': '960px'},
      // => @media (max-width: 960px) { ... }

      'smg': {'min': '300px', 'max': '960px'},
      // => @media (min--width: 300px and max-width: 960px) { ... }

      'md': {'min': '768px', 'max': '960px'},
      // => @media (min--width: 570px and max-width: 960px) { ... }

      'cul': {'min': '300px', 'max': '1390px'},
      // => @media (min--width: 300px and max-width: 1390px) { ... }

      'lg': {'min': '960px', 'max': '1440px'},
      // => @media (min-width: 960px and max: 1440px) { ... }

      'xl': {'min': '1440px'},
      // => @media (min-width: 1440px) { ... }

    },
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      '320': '320px', // @media(min - width: 320px) { ... }
      '375': '375px', // @media(min - width: 375px) { ... }
      '450': '450px', // @media(min - width: 450px) { ... }
      '640': '640px', //	@media(min - width: 640px) { ... }
      '768': '768px', // @media(min - width: 768px) { ... }
      "860": "860px", // @media(min - width: 860px) { ... }
      "960": "960px", // @media(min - width: 860px) { ... }
      '1024': '1024px', // @media(min - width: 1024px) { ... }
      '1280': '1280px', // @media(min - width: 1280px) { ... }
      '1536': '1536px', // @media(min - width: 1536px) { ... } // why 
      '1920': '1920px', // @media(min - width: 1920px) { ... }
      '2560': '2560px', // @media(min - width: 2560px) { ... }
      '3440': '3440px', // @media(min - width: 3440px) { ... }
      '3840': '3840px', // @media(min - width: 3840px) { ... }
      '4096': '4096px', // @media(min - width: 4096px) { ... }
      '5120': '5120px', // @media(min - width: 5120px) { ... }
      '5760': '5760px', // @media(min - width: 5760px) { ... }
      '7680': '7680px', // @media(min - width: 7680px) { ... }


    },
    extend: {
    
    },
  },
  plugins: [],
}
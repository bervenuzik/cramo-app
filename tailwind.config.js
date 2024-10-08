/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'asside': ' 5px 0px 10px 0px rgba(0,0,0,0.75)'
      },
      fontFamily: {
        'table': ['Roboto Mono'],
        
      }
    }
    
  },
  plugins: [],
}


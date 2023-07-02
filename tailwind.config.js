/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


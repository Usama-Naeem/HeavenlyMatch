/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#802A3D',
        lightburgundy: '#CC5869',
        appGray: '#F0F2F5',
        textGray: '#8C8C8C',
        gray: '#888888',
        lightGray: '#D9D9D9',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors:{
      green:'rgb(7, 137, 0)',
      red:'rgb(170, 0, 0)',
      gray:'rgb(63, 63, 63)',
      white:'rgb(255, 255, 255)',
      violet:'rgb(170, 0, 170)',
    }
  },
  plugins: [],
}

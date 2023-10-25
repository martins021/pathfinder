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
      background: 'rgb(53, 53, 53)',
      customGreen:'rgb(7, 137, 0)',
      customRed:'rgb(170, 0, 0)',
      customGray:'rgb(63, 63, 63)',
      customWhite:'rgb(255, 255, 255)',
      customViolet:'rgb(170, 0, 170)',
      customBlue:'rgb(0, 0, 170)',
      customYellow:'rgb(255,215,0)',
      customYellowHover:'rgb(144, 122, 0)',
      customBlack: 'rgb(0, 0, 0)'
    }
  },
  plugins: [],
}

module.exports = {
  // mode: 'jit',
  important: true,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('./app.colors.json'),
    },
  },
  variants: {
    // extend: {
    //   opacity: ['disabled'],
    //   pointerEvents: ['disabled'],
    //   cursor: ['disabled'],
    //   backgroundColor: ['checked'],
    //   borderColor: ['checked'],
    //   inset: ['checked'],
    //   zIndex: ['hover', 'active'],
    // }
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}

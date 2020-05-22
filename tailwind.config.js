const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: false,
  theme: {
    extend: {
      lineHeight: (theme) => ({
        ...theme('spacing')
      }),
      spacing: {
        container: '1216px',
      },
      fontFamily: {
        icon: [
          'Icomoon',
        ],
      },
    }
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.align-left': {
          left: '50%',
          transform: 'translateX(-50%)',
        },
      })
      addUtilities({
        '.scale-xs': {
          transform: 'scale(1.2)',
        },
      }, ['hover'])
      addUtilities({
        '.transition': {
          transition: 'all 0.25s ease-out',
        },
      }, ['hover'])
    })
  ],
  corePlugins: {
    container: false,
    border: ['hover', 'focus'],
  },
}

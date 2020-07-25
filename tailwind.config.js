/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima Nova'],
      },
    },
    colors:{
      'purple': '#3D3D57',
      'purple-dark': '#313146',
      'purple-darker': '#36364D',
      'red': '#FF2D20',
      'green': '#41B883',
      'green-dark': '#01c58e',
      'blue': '#17B9B8',
      dark : '#333646',
      darker: '#252734',
      darkest: '#7B7C87',
      yellow: '#FFC25C',
      white:  '#FFF',
      grey:'#EBEBEC',
      transparent: 'transparent',
    },
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/22': '48%',
      '1/3': '33.333333%',
      '1/33': '30.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
    }),
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}

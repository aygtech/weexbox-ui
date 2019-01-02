
module.exports = {
  plugins: {
    'postcss-plugin-weex': {},
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-url': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [
        'w-content'
      ],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};

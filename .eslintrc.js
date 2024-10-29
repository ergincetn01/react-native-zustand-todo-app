module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['eslint', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
    eslint: [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
  },
};

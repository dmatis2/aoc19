module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    radix: 'off',
    'comma-dangle': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'prefer-destructuring': 'off',
  },
};

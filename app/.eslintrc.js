module.exports = {
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  }, 
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
};

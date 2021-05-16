const path = require('path');

module.exports = {
  root: true,
  extends: ['@bo/eslint-config/base'],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};

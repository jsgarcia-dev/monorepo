import { nextJsConfig } from '@repo/eslint-config/next-js';

export default [
  ...nextJsConfig,
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
];

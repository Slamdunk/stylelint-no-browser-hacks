import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import pluginPromise from 'eslint-plugin-promise';

export default [
  eslint.configs.recommended,
  prettierConfig,
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'array-callback-return': 'error',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-lonely-if': 'error',
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: false,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],
      radix: 'error',
      strict: 'error',
      quotes: ['error', 'single'],
    },
  },
];

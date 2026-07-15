import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.astro/**', '.lighthouseci/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['public/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: globals.browser,
    },
  },
  {
    files: ['scripts/**/*.mjs', 'astro.config.mjs', 'eslint.config.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },
];

module.exports = {
  parser: 'vue-eslint-parser',
  globals: {
    defineProps: 'readonly',
  },
  env: {
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/no-multiple-template-root': 'off',
  },
}

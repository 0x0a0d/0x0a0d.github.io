module.exports = {
  env: {
    jest: true,
  },
  extends: ['@cylution/react'],
  overrides: [
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  // rules: {
  //   'unused-imports/no-unused-vars': 0,
  // },
}

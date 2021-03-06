module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['simple-import-sort'],
    extends: [
        'eslint:recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        'simple-import-sort/sort': 'error',
        'sort-imports': 'off',
    },
};

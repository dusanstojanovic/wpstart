module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',
        quotes: [2, 'single', { allowTemplateLiterals: true }],
        'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: [] }],
        'no-console': 'warn',
        semi: 'error',
        'no-var': 'error',
        indent: 2,
    },
};

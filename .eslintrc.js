module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jquery: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 1,
        'comma-dangle': 0,
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        'no-shadow': [
            'error',
            {
                builtinGlobals: false,
                hoist: 'functions',
                allow: [],
            },
        ],
        'no-console': 1,
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        semi: 2,
        'no-var': 2,
        // indent: 2,
        indent: ['error', 4, { SwitchCase: 1 }],
        'prefer-destructuring': [
            'error',
            {
                array: true,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
    },
};

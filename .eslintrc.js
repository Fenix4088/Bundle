const config = require("./scripts/config.shared");

const imageExtensions = "avif|webp|png|jpe?g|gif|svg";
const typesInterfaces = "type|types|interface|interfaces";
const styleExtensions = "css|scss|sass";

const errorOrWarn = config.__PROD__ ? "error" : "warn";

const orderImports = [
  // import React, { useState } from 'react';
  "^react",

  // import Some from 'third-party';
  "^(?!react)\\w+.*",

  `.*(${typesInterfaces})(.ts)?$`,

  // import { Routes } from '@/constants/routes';
  "^@/(.*)constants",

  // import { someAction } from '@/redux/auth/actions';
  // import { someAction } from '@/store/auth/actions';
  "^@/(store|redux)",

  // import { useModal } from '@/hooks';
  "^@/hooks",

  // import { Search } from '@/assets/icons';
  "^@/.*icons",

  // import { Button } from '@components/Button';
  // import { Button } from '@UI/Button';
  // import { Button } from '@/components/Button';
  // import { Button } from '@/UI/Button';
  "^@/?(components|UI)",

  // import { Routes } from '../constants/routes'; - relative path
  "^(../).*redux",

  `^(\.\.\/).*utils.*(?<!(${typesInterfaces}))$`,

  `^(\.\.\/).*icons.*(?<!(${typesInterfaces}))$`,

  "^(../).*(components|UI)",

  // import { Routes } from '../constants/routes'; - relative path
  "^(../).*constants",

  // import { Routes } from '../function/routes'; - relative path
  "^(../).*functions",

  "^(./).*constants",

  "^(./).*functions",

  // import { normalizeCard } from '../Normalize/Card/normalize';
  "^(../)+",

  // import { normalizeCard } from '../Normalize/Card/normalize';
  "^(./)+",

  `.*\.(${imageExtensions})$`,

  `.*\.(${styleExtensions})$`,
];

module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module", // Allows for the use of imports
  },

  plugins: [
    "@typescript-eslint",
    "prettier",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],

  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],

  globals: {
    __DEV__: "readonly",
    __PROD__: "readonly",
  },

  settings: {
    react: {
      pragma: "React",
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },

  rules: {
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        bracketSpacing: true,
        bracketSameLine: false,
        semi: true,
        requirePragma: false,
        proseWrap: "preserve",
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 120,
        // below line only for windows users facing CLRF and eslint/prettier error
        // non windows users feel free to delete it
        endOfLine: "auto",
        arrowParens: "always",
      },
    ],
    "react/prop-types": "off",
    "no-restricted-syntax": [
      // restrict default export
      "error",
      {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports",
      },
    ],
    "no-console": errorOrWarn,
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/react-in-jsx-scope": "off",
    'react/jsx-curly-brace-presence': ['error', { 'props': 'never', "children": 'never' }],

    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // set to "error" or "warn" ?
    "@typescript-eslint/no-empty-function": "warn",

    "simple-import-sort/imports": [
      "error",
      {
        groups: [orderImports],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/newline-after-import": "off",
  },

  ignorePatterns: [
    '__mocks__/*',
    'scripts/*',
    '.eslintrc.js',
    '.babelrc.js',
    'babelrc.config.js',
    'jest.config.js',
    'setupTests.ts',
    'node_modules',
  ]
};

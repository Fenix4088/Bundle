/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/utils/tests-utils/', '__mocks__', '.+(d.ts)'],
  globals: {
    __DEV__: true,
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/__mocks__/fileTransform.js",
    "^.+\\.css$": "<rootDir>/__mocks__/cssTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  moduleNameMapper: {
    //If u want to create a new alias, notes that should add the same into tsconfig.json
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    '^@/(.*)': '<rootDir>/src/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@styles/(.*)': '<rootDir>/src/assets/styles/$1',
  }
};


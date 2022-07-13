# React-typescript template

## Important !!!
**Template setup after template copying to your project:**
1. configure path in `scripts/config.ts:29`
2. configure scss variables in `scripts/config.ts:42` if you are working from docker
2. configure aliases in `scripts/config.ts:45` + `tsconfig.json`

**All keys of `path` object in `scripts/config.ts:29` should be settled**

**`src/assets/styles/abstracts/_index.scss` is shared across all scss files, you don't need to import it directly**

Any variable you are going to write in that file will be **<ins>global</ins>**

## Before running any script from package.json
Remove `'./src/components/TestComponent'` component! It was created just for **<ins>demo purposes</ins>**.

## pnpm (npm) scripts

To run eslint and dev server in `dev` mode with hot reload on `localhost`:
```bash
  pnpm start (npm run start)
```

To run  eslint and watch changes with webpack in `dev` mode:
```bash
  pnpm watch (npm run watch)
```

To run eslint and build in `prod` mode:
```bash
  pnpm build (npm run build)
```

To run webpack dev server in `dev` mode:
```bash
  pnpm webpack:serve (npm run webpack:serve)
```

To watch changes with webpack and write to disk in `dev` mode:
```bash
  pnpm webpack:watch (npm run webpack:watch)
```

To build in `prod` mode:
```bash
  pnpm webpack:build (npm run webpack:build)
```

To view how much any project module consumes  space in `prod` mode:
```bash
  pnpm analyze (npm run analyze)
```

To fix files with `eslint`:
```bash
  pnpm eslint:fix  (npm run eslint:fix)
```

To check webpack config validity:
```bash
  pnpm config:test  (npm run config:test)
```

To run tests once:
```bash
  pnpm test  (npm run test)
```

To run tests in watch mode:
```bash
  pnpm test:watch  (npm run test:watch)
```

To view tests coverage:
```bash
  pnpm test:coverage  (npm run test:coverage)
```

## Features:
- [hot module replacement](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- preconfigured [redux](https://redux.js.org/)
- preconfigured [eslint](https://eslint.org/) with [autosort imports](https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping)
- visually manage project dependencies with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

## Variables available globally in react application
- __DEV\_\_ - equals `true` if `process.env.NODE_ENV === 'development'`
- __PROD\_\_ - equals `true` if `process.env.NODE_ENV === 'production'`

## libs/plugins FAQ
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) rules description
- [configuring eslint in phpstorm](https://www.jetbrains.com/help/phpstorm/eslint.html#ws_js_eslint_manual_configuration)
- [eslint-plugin-simple-import-sort options](https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping)

## IDE (PhpStorm/WebStorm) config
- webpack
  1. go to *your JetBrains IDE settings* -> *Languages & Frameworks* -> *Webpack*<br />
  3. check `Manually` radio button and specify absolute path to `webpack.common.config.js`
- eslint
  1. go to *your JetBrains IDE settings* -> *Languages & Frameworks* -> *Javascript* -> *Code Quality Tools* -> *ESLint*<br />
  2. check `Manual ESLint configuration` radio button
  3. in `ESLint package` field specify absolute path to `<your_app>/node_modules/eslint`
  4. in `Working directories` field specify absolute path to project `<your_app>/src` folder
  5. in `Configuration file` field specify absolute path to project `<your_app>/.eslintrc.js`
  6. in `Run for files` field specify glob pattern `{**/*,*}.{js,ts,jsx,tsx,html,vue}`
  7. set checkmark in `Run eslint --fix on save` filed

## Folder structure
```
├── pnpm-lock.yaml —— delete this file if you are going to use npm instead of pnpm
├── public
│   └── index.html
├── scripts                                                                                                                                                                                                 
│   ├── config.shared.js                                                                                                                                                                                    
│   ├── config.ts —— file should be changed after clone to your project                                                                                                                                                                                           
│   ├── config.utils.ts                                                                                                                                                                                     
│   ├── webpack.common.config.ts                                                                                                                                                                            
│   ├── webpack.dev.config.ts
│   └── webpack.prod.config.ts
├── src
│   ├── assets
│   │   ├── images —— folder for common images
│   │   └── styles —— folder for common styles
│   │       ├── abstracts
│   │       │   ├── mixins
│   │       │   └── _index.scss —— shareable scss file with global variables (automatically included in every scss file)
│   │       └── index.scss
│   ├── components
│   │   ├── App
│   │   │   ├── App.module.scss
│   │   │   ├── App.tsx —— "presentational" component, responsible generally only for rendering
│   │   │   ├── App.container.tsx —— opinionated, contains business component logic with most amount of features, prefer this file over "src/contaienr" folder
│   │   │   ├── App.types.ts —— opinionated, if App.container.tsx containes more than 2 declared interfaces/types
│   │   │   ├── __tests__
│   │   │   │   └── App.test.tsx
│   │   │   └── index.tsx —— contains "export * from './App.container'"
│   │   └── UI —— folder for reusable components
│   │   ├── containers —— opinionated folder, prefer "hooks" over container components
│   │   ├── pages
│   │   └── sections
│   ├── constants
│   ├── context
│   ├── global.d.ts —— typescript types/interfaces accesible over project
│   ├── hooks
│   │   ├── useActions.ts
│   │   └── useTypedSelector.ts
│   ├── index.tsx
│   ├── store
│   │   ├── SomeFeature
│   │   │   ├── someFeature.actionCreators.ts
│   │   │   ├── someFeature.actionTypes.ts
│   │   │   ├── someFeature.reduser.ts
│   │   │   └── someFeature.types.ts
│   │   ├── actionCreators.tsx
│   │   ├── index.ts
│   │   └── rootReducer.ts
│   ├── types —— common project types related to project domain
│   └── utils —— common utils
└── tsconfig.json
```
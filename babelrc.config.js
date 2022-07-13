const config = require('./scripts/config.shared');
module.exports = {
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        debug: false,
        spec: false,
        loose: false,
        modules: 'auto',
        useBuiltIns: false,
      },
    ],
  ],
  plugins: [config.isServerRunning && require.resolve('react-refresh/babel')].filter(Boolean),
};

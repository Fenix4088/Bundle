import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import commonWebpackConfig from "./webpack.common.config";
import config, { TMode } from "./config";
import utils from "./config.utils";

const loaders = utils.getLoaders(false, config);
const rules = utils.getRules(loaders);

const MODE: TMode = "production";

const prodWebpackConfig: Configuration = {
  mode: MODE,

  output: {
    filename: "bundle.js",
  },

  devtool: false,

  stats: "detailed",

  module: {
    rules: [rules.scssModules, rules.sassModules, rules.scss, rules.sass, rules.cssModules, rules.css],
  },

  optimization: {
    nodeEnv: MODE,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        }
      }),
      new TerserPlugin({
        exclude: /node_modules/,
        extractComments: false,
        terserOptions: {
          parse: {
            html5_comments: false,
          },
          mangle: true,
          sourceMap: false,
          compress: {
            defaults: true,
            drop_console: false, // false by default. Pass true to discard calls to console.* functions.
            keep_infinity: true, // false by default. Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome.
            passes: 2, // 1 by default. The maximum number of times to run compress.
          },
          format: {
            comments: false, // "some" by default
            preamble: "", // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
            quote_style: 3, // 0 by default. 3 - always use the original quotes.
            preserve_annotations: false, // false by default.
            ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          },
          ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          keep_classnames: false, // undefined by default.
          keep_fnames: false, // false by default.
          safari10: false, // false by default.
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: `${config.paths.css}/bundle.css` }),

    new CompressionPlugin({ test: /\.(js|css)$/ }),

    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
    }),
  ],
};

export default merge<Configuration>(commonWebpackConfig, prodWebpackConfig);

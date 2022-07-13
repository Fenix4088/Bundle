import path from "path";
import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import commonWebpackConfig from "./webpack.common.config";
import config from "./config";
import utils from "./config.utils";

const loaders = utils.getLoaders(true, config);
const rules = utils.getRules(loaders);

const devWebpackConfig: Configuration = {
  mode: "development",

  output: {
    filename: "bundle.dev.js",
  },

  devtool: "eval-cheap-module-source-map",

  stats: "errors-warnings",

  devServer: {
    static: {
      directory: path.resolve(config.APP_ROOT, "public"),
    },
    client: {
      logging: "none",
      reconnect: 5,
      overlay: false,
    },
    compress: true,
    hot: config.isServerRunning, // instead of webpack.HotModuleReplacementPlugin
    port: config.port,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: !config.isServerRunning,
    },
  },

  module: {
    rules: [rules.scssModules, rules.sassModules, rules.scss, rules.sass, rules.cssModules, rules.css],
  },

  // @ts-ignore
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false,
    }),

    !config.isServerRunning && new MiniCssExtractPlugin({ filename: `${config.paths.css}/bundle.dev.css` }),

    config.isServerRunning &&
      new HtmlWebpackPlugin({
        template: path.resolve(config.APP_ROOT, "public/index.html"),
      }),

    config.isServerRunning &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
  ].filter(Boolean),
};

export default merge<Configuration>(commonWebpackConfig, devWebpackConfig);

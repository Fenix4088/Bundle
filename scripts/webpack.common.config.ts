import path from "path";
import { Configuration } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import config from "./config";
import utils from "./config.utils";

const webpackConfig: Configuration = {
  entry: path.join(config.APP_SRC, "index.tsx"),

  output: {
    chunkFilename: "[name].js",
    path: config.paths.js,
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".sass", ".scss", ".json"],
    alias: config.alias,
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
          "source-map-loader",
        ],
      },
      {
        test: /\.(avif|webp|png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              ...(config.isServerRunning
                ? {}
                : {
                    outputPath: config.paths.images,
                    publicPath: utils.relativePathToAbsolute(config.paths.images, config.publicPathOrUrl),
                  }),
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          "@svgr/webpack",
          {
            loader: "url-loader",
            options: {
              limit: 3000,
              name: "[name].[ext]",
              ...(config.isServerRunning
                ? {}
                : {
                    outputPath: config.paths.svg,
                    publicPath: utils.relativePathToAbsolute(config.paths.svg, config.publicPathOrUrl),
                  }),
            },
          },
        ],
      },
    ],
  },

  // @ts-ignore
  plugins: [
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
      failOnError: true,
    }),

    config.shouldAnalyzeBuild &&
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        openAnalyzer: true,
      }),
  ].filter(Boolean),
};

export default webpackConfig;

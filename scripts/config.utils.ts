import path from "path";
import fs from "fs";
import { RuleSetUseItem, RuleSetRule } from "webpack";
import autoprefixer from "autoprefixer";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { TConfiguration } from "./config";

type TResolvePath = (params: {
  folderToLookup: string;
  onLookupSuccess?: (resolvedPath: string) => string;
  onLookupFailed?: () => string;
  lookupMaxLevel?: number;
}) => string;
const resolvePath: TResolvePath = ({ folderToLookup, onLookupSuccess, onLookupFailed, lookupMaxLevel = 10 }) => {
  let directories = [];
  let directoryDepth = 0;
  let pathToLookup = "./";

  const readDir = () => {
    // guard against recursion
    if (directoryDepth >= lookupMaxLevel) {
      if (onLookupFailed) {
        pathToLookup = onLookupFailed();
        return;
      } else {
        throw Error(`Can't resolve project root! directoryDepth = ${directoryDepth}`);
      }
    }

    directoryDepth++;

    try {
      directories = fs.readdirSync(pathToLookup, { encoding: "utf-8" });
      if (!directories.includes(folderToLookup)) {
        pathToLookup = pathToLookup.concat("../");
        readDir();
      }
    } catch (e) {
      console.error("Error occurred during dir reading: ", e);
      process.exit(0);
    }
  };
  readDir();

  const resolvedPath = path.resolve(pathToLookup);

  if (onLookupSuccess) {
    return onLookupSuccess(resolvedPath);
  }

  return resolvedPath;
};

const relativePathToAbsolute = (relativePath: string, publicPath: string): string => {
  return publicPath.concat(
    relativePath // "../../../../design/images/apps/shipping/request/test.png"
      .replace(/\.\.\/+/gim, "") // "/design/images/apps/shipping/request/test.png" - after first replace
      .replace(/^"/gim, "") // /design/images/apps/shipping/request/test.png" - after second replace
      .replace(/"$/gim, "") // /design/images/apps/shipping/request/test.png - after third replace
  );
};

const configurePath = <TPath extends string, TPaths = { [key in TPath]: string }>(
  paths: TPaths,
  {
    shouldBuildToLocalPublic = false,
    pathToLocalAppPublic,
  }: { shouldBuildToLocalPublic: boolean; pathToLocalAppPublic: string }
): TPaths => {
  if (!pathToLocalAppPublic) {
    throw new Error("\"pathToLocalAppPublic\" argument should be settled");
  }

  if (!shouldBuildToLocalPublic) {
    return paths;
  }

  return Object.keys(paths).reduce((acc, directoryName) => {
    switch (directoryName) {
      case "images":
      case "css":
        // @ts-ignore
        acc[directoryName] = `../${directoryName}`; // relative to js directory
        break;
      case "svg":
        // @ts-ignore
        acc[directoryName] = `../images/${directoryName}`; // relative to js directory
        break;
      case "js":
      default:
        // @ts-ignore
        acc[directoryName] = `${pathToLocalAppPublic}/${directoryName}`;
    }

    return acc;
  }, {} as TPaths);
};

type TGetLoadersReturn<TRuleSetUseItem = RuleSetUseItem> = {
  postCss: () => TRuleSetUseItem;
  sass: () => TRuleSetUseItem;
  scss: () => TRuleSetUseItem;
  css: () => TRuleSetUseItem;
  cssModules: () => TRuleSetUseItem;
  styleOrExtractCss: () => TRuleSetUseItem;
};
type TGetLoaders = (isDevBuild: boolean, config: TConfiguration) => TGetLoadersReturn;
const getLoaders: TGetLoaders = (isDevBuild, config) => {
  const sassLoaderOptions = (loaderOptions = {}) => ({
    sourceMap: isDevBuild,
    implementation: require("sass"),
    ...loaderOptions,
  });

  return {
    // if any postcss error happens
    // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
    postCss: () => ({
      loader: "postcss-loader",
      options: {
        sourceMap: isDevBuild,
        implementation: require("postcss"),
        postcssOptions: {
          plugins: [["postcss-preset-env", { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
        },
      },
    }),
    sass: () => ({
      loader: "sass-loader",
      options: sassLoaderOptions({
        sassOptions: {
          indentedSyntax: true,
          style: config.__DEV__ ? "expanded" : "compressed",
        },
      }),
    }),
    scss: () => ({
      loader: "sass-loader",
      options: sassLoaderOptions({
        additionalData: `
          $font-path: "${config.resourcesPaths.fontsPath}";
          $image-path: "${config.resourcesPaths.imagePath}";
          $svg-path: "${config.resourcesPaths.svgPath}";
          @import "src/assets/styles/abstracts/_index.scss";`,
        sassOptions: {
          indentedSyntax: false,
          style: config.__DEV__ ? "expanded" : "compressed",
          includePaths: [path.join(config.APP_SRC, "assets/styles/abstracts/**/*.scss")],
        },
      }),
    }),
    css: (importLoaders: number = 2) => ({
      loader: "css-loader",
      options: {
        sourceMap: isDevBuild,
        url: false,
        importLoaders,
      },
    }),
    cssModules: (importLoaders: number = 2) => ({
      loader: "css-loader",
      options: {
        importLoaders,
        url: false,
        esModule: true,
        modules: {
          localIdentName: isDevBuild ? "[local]--[folder]--[hash:base64:3]" : "[hash:base64:6]",
        },
        sourceMap: isDevBuild,
      },
    }),
    styleOrExtractCss: () => (config.isServerRunning ? { loader: "style-loader" } : MiniCssExtractPlugin.loader),
  };
};

type TGetRulesReturn<TRuleSetRule = RuleSetRule> = {
  css: TRuleSetRule;
  sass: TRuleSetRule;
  scss: TRuleSetRule;
  cssModules: TRuleSetRule;
  sassModules: TRuleSetRule;
  scssModules: TRuleSetRule;
};
const getRules = (loaders: TGetLoadersReturn): TGetRulesReturn => {
  return {
    css: {
      test: /\.css$/i,
      exclude: /\.modules?\.css$/i,
      use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss()],
    },
    sass: {
      test: /\.sass$/i,
      exclude: /\.modules?\.s(a|c)ss$/i,
      use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss(), loaders.sass()],
    },
    scss: {
      test: /\.scss$/i,
      exclude: /\.modules?\.s(a|c)ss$/i,
      use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss(), loaders.scss()],
    },
    cssModules: {
      test: /\.modules?\.css$/i,
      use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss()],
    },
    sassModules: {
      test: /\.modules?\.sass$/i,
      exclude: /\.modules?\.scss$/i,
      use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss(), loaders.sass()],
    },
    scssModules: {
      test: /\.modules?\.scss$/i,
      exclude: /\.modules?\.sass$/i,
      use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss(), loaders.scss()],
    },
  };
};

export default { relativePathToAbsolute, getLoaders, getRules, configurePath, resolvePath };

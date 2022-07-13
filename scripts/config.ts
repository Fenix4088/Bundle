import path from "path";
import sharedConfig from "./config.shared";
import utils from "./config.utils";

const MODE = sharedConfig.MODE as TMode;
const __PROD__ = sharedConfig.__PROD__;
const __DEV__ = sharedConfig.__DEV__;
const isServerRunning: boolean = sharedConfig.isServerRunning;

const APP_ROOT: string = utils.resolvePath({
  folderToLookup: "scripts",
  onLookupFailed: () => {
    throw new Error('"APP_ROOT" can not be resolved');
  },
  lookupMaxLevel: 3,
});
const PROJECT_ROOT: string = utils.resolvePath({
  folderToLookup: "application",
  onLookupFailed: () => APP_ROOT,
});
const APP_SRC: string = path.resolve(APP_ROOT, "src");
const APP_PUBLIC: string = path.join(APP_ROOT, "public");

const shouldAnalyzeBuild: boolean = process.env.ANALYZE_BUILD === "true";
const shouldBuildToLocalPublic: boolean = PROJECT_ROOT === APP_ROOT || isServerRunning;

// path example for SeaRates app
const appFolder = "myApp";
const paths = utils.configurePath<"js" | "css" | "images" | "svg">(
  {
    js: path.join(PROJECT_ROOT, `public/js/apps/${appFolder}`),
    css: `../../../design/css/apps/${appFolder}`, // relative to paths.js
    images: `../../../design/images/apps/${appFolder}`, // relative to paths.js
    svg: `../../../design/images/apps/${appFolder}/icons`, // relative to paths.js
  },
  {
    shouldBuildToLocalPublic: shouldBuildToLocalPublic,
    pathToLocalAppPublic: APP_PUBLIC,
  }
);

const resourcesPaths = {
  fontsPath: `/design/fonts`,
  imagePath: `/design/images/apps/${appFolder}`,
  svgPath: `/design/images/apps/${appFolder}/icons`, // paths.svg
} as const;

const publicPathOrUrl = "/";
const port = 3333;

// change here + tsconfig.json
const alias = {
  "@": APP_SRC,
  "@UI": path.resolve(APP_SRC, "components/UI"),
  "@images": path.resolve(APP_SRC, "assets/images"),
  "@styles": path.resolve(APP_SRC, "assets/styles"),
} as const;

const configuration = {
  // paths
  publicPathOrUrl,
  port,
  paths,
  resourcesPaths,
  APP_ROOT,
  APP_SRC,

  // webpack configs
  alias,

  // build mode
  MODE,
  __PROD__,
  __DEV__,

  // other
  isServerRunning,
  shouldAnalyzeBuild,
} as const;

console.log({ PROJECT_ROOT }, { sharedConfig }, configuration);

export type TMode = "production" | "development";
export type TConfiguration = typeof configuration;
export default configuration;

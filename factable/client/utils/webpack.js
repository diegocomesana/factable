const nodeExternals = require("webpack-node-externals");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const DEV = process.env.NODE_ENV !== "production";
// const TEST_MODE = process.env.TEST_MODE;
// const DEV_MODE = process.env.DEV_MODE;
// const resolvePath = (p) => path.resolve(__dirname, p);
// const PATH_SRC = resolvePath("../../../src/");
// const PATH_PACKAGES = resolvePath("../../../src/packages/");
// const PATH_BUILD = resolvePath("../../");
// console.log("PATH_BUILD: ", PATH_BUILD);

const babelConfigOptions = (target, isWebpack = true) => {
  const isWeb = target === "web";
  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          useBuiltIns: isWeb ? "entry" : undefined,
          corejs: isWeb ? "core-js@3" : false,
          targets: isWeb ? undefined : { node: "current" },
          modules: isWebpack ? false : "commonjs",
        },
      ],
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import"],
  };
};

const buildConfig = ({ name, target, entryPath, outputPath, publicPath }) => {
  return {
    name,
    mode: DEV ? "development" : "production",
    target,
    entry: entryPath,
    devtool: DEV ? "cheap-module-eval-source-map" : false,
    // resolve: {
    //   extensions: [".js", ".jsx"],
    //   alias: {
    //     "@src": PATH_SRC,
    //     "@packages": PATH_PACKAGES,
    //     "@build": PATH_BUILD,
    //   },
    // },
    externals: target === "node" ? [nodeExternals()] : undefined,
    output: {
      path: outputPath,
      filename: DEV ? "[name].js" : "[name]-[chunkhash:8].js",
      publicPath,
      libraryTarget: target === "node" ? "commonjs2" : undefined,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              caller: { target },
              ...babelConfigOptions(target, true),
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
    optimization: {
      namedChunks: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};

module.exports = { buildConfig };

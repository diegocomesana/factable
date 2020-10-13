const nodeExternals = require("webpack-node-externals");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const DEV = process.env.NODE_ENV !== "production";

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
    externals: target === "node" ? [nodeExternals()] : undefined,
    output: {
      path: outputPath,
      filename: "[name].js",
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

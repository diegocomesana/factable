// REFERENCIA:
//github.com/babel/babel/blob/master/babel.config.js

const plugin = require("./src/plugin/src");

function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === "babel-loader");
}

module.exports = (api) => {
  const ignore = [];
  const plugins = [];
  const presets = [];

  const env = api.env();
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  const TEST_MODE = process.env.TEST_MODE;
  const FACTABLE_TRANSPILE = process.env.FACTABLE_TRANSPILE;

  if (FACTABLE_TRANSPILE === "on") {
    plugins.push(plugin);
  } else {
    presets.push("@babel/preset-react");
    presets.push([
      "@babel/preset-env",
      {
        useBuiltIns: web ? "entry" : undefined,
        corejs: web ? "core-js@3" : false,
        targets: !web ? { node: "current" } : undefined,
        modules: webpack ? false : "commonjs",
      },
    ]);
  }

  console.log("BABEL ENV: ", env);

  return {
    comments: false,
    inputSourceMap: false,
    presets,
    plugins,
    ignore,
  };
};

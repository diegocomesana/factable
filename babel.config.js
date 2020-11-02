const { isValidPortNumber } = require("./src/plugin/common/utils");

// REFERENCIA:
//github.com/babel/babel/blob/master/babel.config.js

const plugin = require("./src/plugin");

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

  presets.push([
    "@babel/preset-env",
    {
      useBuiltIns: web ? "entry" : undefined,
      corejs: "core-js@3",
      targets: !web ? { node: 10 } : undefined,
      modules: webpack ? false : "commonjs",
    },
    // {
    //   useBuiltIns: web ? "entry" : undefined,
    //   corejs: web ? "core-js@3" : false,
    //   targets: !web ? { node: "current" } : undefined,
    //   modules: webpack ? false : "commonjs",
    // },
  ]);

  const FACTABLE_TRANSPILE = process.env.FACTABLE_TRANSPILE;
  const isValidPort = isValidPortNumber(FACTABLE_TRANSPILE);
  if (isValidPort) {
    plugins.push(plugin);
  } else {
    presets.push("@babel/preset-react");
  }

  // console.log("BABEL ENV: ", env);
  // console.log("PRESETS: ", presets);
  // console.log("PLUGINS: ", plugins);

  return {
    comments: false,
    inputSourceMap: false,
    presets,
    plugins,
    ignore,
  };
};

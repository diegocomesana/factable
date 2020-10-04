// REFERENCIA:
//github.com/babel/babel/blob/master/babel.config.js

const plugin = require("./factable/plugin/src");

module.exports = (api) => {
  const env = api.env();
  const TEST_MODE = process.env.TEST_MODE;
  let ignore = [];
  console.log("BABEL ENV: ", env);

  const presets = [];
  const plugins = [plugin];

  return {
    comments: false,
    inputSourceMap: false,
    presets,
    plugins,
    ignore,
  };
};

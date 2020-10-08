const path = require("path");
const { buildConfig } = require("./utils/webpack");

const resolvePath = (p) => path.resolve(__dirname, p);

const clientConfig = buildConfig({
  name: "factable-client",
  target: "web",
  entryPath: resolvePath("./index.js"),
  outputPath: resolvePath("../build/client"),
  publicPath: "/dist",
});

module.exports = [clientConfig];

const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const cardinal = require("cardinal");
const plugin = require(".");

// read the filename from the command line arguments
// var fileName = process.argv[2];
const resolvePath = (p) => path.resolve(__dirname, p);

// @TODO: REPLACE WITH UTILS FUNCTIONS
// read the code from this file
fs.readFile(resolvePath("./tests/fixtures/full-on/code.js"), function (
  err,
  data
) {
  if (err) throw err;

  // convert from a buffer to a string
  const src = data.toString();
  const out = babel.transform(src, {
    sourceType: "module", // default: "script"
    plugins: [plugin], // default: []
    presets: [
      [
        "@babel/preset-env",
        {
          targets: { node: "current" },
          modules: "commonjs",
        },
      ],
    ],
  });

  console.log("--------- INPUT -----------");
  console.log();
  console.log(cardinal.highlight(src));
  console.log();
  console.log("--------- OUTPUT -----------");
  console.log();
  console.log(cardinal.highlight(out.code));
});

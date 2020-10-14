const path = require("path");

const cardinal = require("cardinal");
const plugin = require(".");

const {
  getFileSrc,
  transformSrc,
  generateExpected,
} = require("./common/test-utils");

const resolvePath = (p) => path.resolve(__dirname, p);

const run = async () => {
  const code = await getFileSrc(
    resolvePath("./tests/fixtures/full-off/code.js")
  );

  const output = transformSrc(code, plugin);

  console.log("--------- INPUT -----------");
  console.log();
  console.log(cardinal.highlight(code));
  console.log();
  console.log("--------- OUTPUT -----------");
  console.log();
  console.log(cardinal.highlight(output));
};

run();

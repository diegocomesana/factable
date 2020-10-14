const path = require("path");

const {
  getFileSrc,
  transformSrc,
  generateExpected,
} = require("../common/test-utils");
const plugin = require("../");

const resolvePath = (p) => path.resolve(__dirname, p);

describe("test pligin", () => {
  test("it should transform ok", async (done) => {
    const code = await getFileSrc(resolvePath("./fixtures/full-on/code.js"));

    const expectedOutput = await getFileSrc(
      resolvePath("./fixtures/full-on/expected.js")
    );

    const output = transformSrc(code, plugin);

    await generateExpected(resolvePath("."), "it should transform ok", output); // NICE TRICK: use it to regenerate expectation

    expect(output).toEqual(expectedOutput);

    done();
  });

  test("it should not transform", async (done) => {
    const code = await getFileSrc(resolvePath("./fixtures/full-off/code.js"));

    const expectedOutput = await getFileSrc(
      resolvePath("./fixtures/full-off/expected.js")
    );

    const output = transformSrc(code, plugin);

    await generateExpected(resolvePath("."), "it should not transform", output); // NICE TRICK: use it to regenerate expectation

    expect(output).toEqual(expectedOutput);

    done();
  });
});

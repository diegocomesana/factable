const fs = require("fs");
const babel = require("@babel/core");

const getFileSrc = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data.toString());
    });
  });
};

const transformSrc = (src, plugin) => {
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
  return out.code;
};

const ensureDirExists = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        if (err.code == "EEXIST") resolve("existed");
        // ignore the error if the folder already exists
        else reject(err); // something else went wrong
      } else resolve(path); // successfully created folder
    });
  });
};

const createFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve(path);
    });
  });
};

const generateExpected = (basePath, caseString, content) => {
  return ensureDirExists(basePath)
    .then((path) => {
      const fileName = caseString.toLowerCase().replace(/ /g, "-");
      return createFile(`${path}/${fileName}.js`, content);
    })
    .then((path) => {
      console.log(
        `----- ${caseString} test-case expected output writen in ${path}`
      );
    })
    .catch((err) => console.log(err));
};

const camelToDash = (str) =>
  str.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase());

module.exports = {
  getFileSrc,
  transformSrc,
  ensureDirExists,
  createFile,
  camelToDash,
  generateExpected,
};

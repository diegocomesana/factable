import fs from "fs";
import path from "path";
import crypto from "crypto";
import prettier from "prettier";

export const prettyJson = (obj) => JSON.stringify(obj, null, 2);

export const safeJsonStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        return cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value; // Store value in our collection
      }
      if (typeof value === "function" && value !== null) {
        return value.toString();
      }
      return value;
    },
    indent
  );
  cache = null;
  return retVal;
};

export const jsonParse = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.parse(
    obj,
    (key, value) => {
      if (typeof value === "string" && value !== null) {
        return value;
      }
      return value;
    },
    indent
  );
  cache = null;
  return retVal;
};

export const camelToDash = (str) =>
  str.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase());

export const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};

export const msgWrapper = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getCallUniqueId = (functionName, args, millis) =>
  crypto
    .createHash("md5")
    .update(`${functionName}${safeJsonStringify(args)}${millis}`)
    .digest("hex");

export const getHash = (input) =>
  crypto
    .createHash("md5")
    .update(`${safeJsonStringify(input)}`)
    .digest("hex");

export const fileExists = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        resolve({ exists: false, path, isDir: false });
        return;
      }
      const isDir = fs.statSync(path).isDirectory();
      resolve({ exists: true, path, isDir });
    });
  });
};

export const ensureDirExists = (path) => {
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

export const createFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve(path);
    });
  });
};

export const getFileContent = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err || !data) {
        reject(err);
        return;
      }
      resolve(data.toString());
    });
  });
};

export const getRelativeFilePath = (root, filename) =>
  filename.substring(root.length + 1);

export const prettyFormatString = (str) => {
  let code = false;
  let error = false;
  try {
    code = prettier.format(str, { semi: true, parser: "babel" });
  } catch (err) {
    error = err;
  }

  return {
    error,
    code,
  };
};

export const resolvePathCWD = (p) => path.resolve(process.cwd(), p);

export const saveFile = (basePath, fileName, content) => {
  return ensureDirExists(basePath)
    .then((path) => {
      return createFile(`${path}/${fileName}`, content);
    })
    .then((path) => {
      console.log(`----- ${path} writen`);
    })
    .catch((err) => console.log(err));
};

export const saveState = (state) =>
  saveFile(
    resolvePathCWD("./"),
    "factable.json",
    safeJsonStringify({
      tests: state.tests,
    })
  );

const trim = (str, length) => {
  return str.length > length ? str.substring(0, length - 3) + "..." : str;
};

export const getCaseString = (paramNames, args) => {
  return paramNames
    .flat()
    .map((name, i) => {
      return trim(`${name}: ${args[i].valueString}`, 50);
    })
    .join(" | ");
};

export const buildInputData = (paramNames, args) => {
  return paramNames.flat().map((name, i) => {
    return {
      name,
      type: args[i].type,
      value: args[i].valueString,
    };
  });
};

export const getFilenameForImportFromPath = (pathStr) =>
  path.basename(pathStr).replace(/\.[^/.]+$/, "");

export const getTestFileImports = (data, tests_import_style) => {
  return Object.keys(data).map((key) =>
    tests_import_style === "es6"
      ? `
            import { ${data[key].join(", ")} } from '../${key}';`
      : `
            const { ${data[key].join(", ")} } = require('../${key}');`
  );
};

export const getTestFileTestBlock = ({
  functionName,
  params,
  inputData,
  expectedOutputString,
}) => {
  return `
            test("it should not transform", (done) => {
              ${getInputDeclarations(inputData)}
              ${getExpectedOutputDeclaration(expectedOutputString)}
              ${getFunctionCallDeclaration(functionName, params)}
              expect(output).toEqual(expectedOutput);
              done();
            });
          `;
};

export const getFunctionDescribeBlock = (functionName, innerStr) => `
          describe("${functionName}", () => {
            ${innerStr}
          });
          `;

export const getTestFileDescribes = (functionName, allTestsArr) => {
  return getFunctionDescribeBlock(
    functionName,
    allTestsArr.map(getTestFileTestBlock).join("")
  );
};

export const getInputDeclarations = (inputData) =>
  inputData.map(({ name, value }) => `const ${name} = ${value};`).join("\n");

export const getExpectedOutputDeclaration = (valueString) =>
  `const expectedOutput = ${valueString};`;

export const getFunctionCallDeclaration = (functionName, params) =>
  `const output = ${functionName}${params
    .map((call) => `(${call.join(", ")})`)
    .join("")};`;

const allTestArrToFileImport = (allTestsArr) =>
  allTestsArr.reduce((acc, curr) => {
    const key = getFilenameForImportFromPath(curr.relativeFilePath);
    const currFileContent = acc[key] || [];
    if (currFileContent.includes(curr.functionName)) {
      return acc;
    }
    return {
      ...acc,
      [key]: [...currFileContent, curr.functionName],
    };
  }, {});

export const getTestFileSrc = (
  functionName,
  allTestsForFile,
  { tests_import_style }
) => {
  const allTestsArr = Object.keys(allTestsForFile).map(
    (key) => allTestsForFile[key]
  );

  return `
      ${getTestFileImports(
        allTestArrToFileImport(allTestsArr),
        tests_import_style
      )}
      ${getTestFileDescribes(functionName, allTestsArr)}
    `;
};

export const callInfoToTestInfo = (callInfo) => {
  const functionName = callInfo.metadata.name;
  const params = callInfo.metadata.params;
  const args = callInfo.args;
  const inputData = buildInputData(params, args);
  const expectedOutputString = callInfo.output.valueString;
  const relativeFilePath = callInfo.relativeFilePath;
  const ioHash = callInfo.ioHash;

  return {
    relativeFilePath,
    functionName,
    ioHash,
    params,
    args,
    inputData,
    expectedOutputString,
  };
};

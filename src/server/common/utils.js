import fs from "fs";
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
      if (err) reject(err);
      resolve(data.toString());
    });
  });
};

export const getRelativeFilePath = (root, filename) =>
  filename.substring(root.length + 1);

export const prettyPrintString = (str) =>
  prettier.format(str, { semi: true, parser: "babel" });

const trim = (str, length) => {
  return str.length > length ? str.substring(0, length - 3) + "..." : str;
};

export const getCaseString = (paramNames, args) => {
  return paramNames
    .map((name, i) => {
      return trim(`${name}: ${args[i].valueString}`, 50);
    })
    .join(" | ");
};

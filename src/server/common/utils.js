import fs from "fs";
import crypto from "crypto";

export const prettyJson = (obj) => JSON.stringify(obj, null, 2);

export const safeJsonStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
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

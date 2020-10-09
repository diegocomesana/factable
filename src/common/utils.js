const prettyJson = (obj) => JSON.stringify(obj, null, 2);

const safeJsonStringify = (obj, indent = 2) => {
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

const camelToDash = (str) =>
  str.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase());

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};

const msgWrapper = (type, payload) => {
  return {
    type,
    payload,
  };
};

module.exports = {
  prettyJson,
  safeJsonStringify,
  camelToDash,
  parseJson,
  msgWrapper,
};

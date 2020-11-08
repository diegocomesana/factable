export const msgWrapper = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};

export const prettyJson = (obj) => JSON.stringify(obj, null, 2);

export const buildInputData = (paramNames, args) => {
  return paramNames.flat().map((name, i) => {
    return {
      name,
      type: args[i].type,
      value: args[i].valueString,
    };
  });
};

export const getCaseDescriptionsFromOutputs = (outputs, tests) =>
  Object.keys(outputs)
    .map((outputHash) => tests[outputs[outputHash].ioHash])
    .filter((elem) => elem)
    .map((elem) => elem.caseDescription)
    .join(" | ");

export const getTestFromOutput = (
  tests,
  relativeFilePath,
  functionName,
  ioHash
) => {
  if (
    tests[relativeFilePath] &&
    tests[relativeFilePath][functionName] &&
    tests[relativeFilePath][functionName][ioHash]
  ) {
    return tests[relativeFilePath][functionName][ioHash];
  }
  return false;
};

const { default: template } = require("@babel/template");
const types = require("@babel/types");

const wrapperOutputName = "output";
const excludedFunctionNames = [wrapperOutputName];

const isValidPortNumber = (portStr) => {
  return /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/.test(
    portStr
  );
};

const safeJsonStringify = (obj, indent = 2) => {
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

const isFactableOn = (path) => {
  const commentLineTokens = path.parent.comments.filter(
    (token) => token.type === "CommentLine"
  );

  if (!commentLineTokens.length) return false;

  const factableConfigLine = commentLineTokens
    .filter((line) => line.value.trim() === "FACTABLE" && line.start === 0)
    .shift();

  return !!factableConfigLine;
};

const getParentStatement = (path) => {
  return path.getStatementParent();
};

const excludeThisFunctionNode = (path, state) => {
  const isAnonim = !path.node.id;
  const parentPath = getParentStatement(path);

  // DONT PROCESS CURRIED CHAIN: WE ARE ONLY INSTERESTED IN WRAPPING FIRST INNER BLOCK
  if (path.node.body.type !== "BlockStatement") {
    return true;
  }

  if (isAnonim) {
    // ONLY ALLOW ANONIMOUS FUNCTIONS WHOSE PARENT IS A VariableDeclaration AND IS NOT THE WRAPPER
    if (
      (parentPath.node.type !== "VariableDeclaration" &&
        parentPath.node.type !== "ExportNamedDeclaration") ||
      (parentPath.node.type === "VariableDeclaration" &&
        excludedFunctionNames.includes(parentPath.node.declarations[0].id.name))
    ) {
      return true;
    }
  }

  return false;
};

const getFunctionName = (path) => {
  const isAnonim = !path.node.id;
  const parentPath = getParentStatement(path);
  if (isAnonim) {
    if (parentPath.node.type === "VariableDeclaration") {
      return parentPath.node.declarations[0].id.name;
    }

    if (parentPath.node.type === "ExportNamedDeclaration") {
      return parentPath.node.declaration.declarations[0].id.name;
    }
    return "";
  }
  return path.node.id.name;
};

const getParamNameFromParamNode = (node) => {
  if (node.type == "AssignmentPattern") {
    // If param has default value
    return node.left.name;
  }
  if (node.type == "ObjectPattern") {
    // If param is a destructured object
    return `{${node.properties.map((node) => node.key.name).join(", ")}}`;
  }
  return node.name;
};

const getFunctionParams = (path) => {
  let params = [];
  path.find((interPath) => {
    if (interPath.isArrowFunctionExpression() || interPath.isFunction()) {
      const currentPathParams = interPath.node.params.map(
        getParamNameFromParamNode
      );
      params = params.concat([currentPathParams.flat()]);
      return false;
    }
    return true;
  });
  return params.reverse();
};

const getFunctionData = (path) => {
  const name = getFunctionName(path);
  const params = getFunctionParams(path);
  return { name, params };
};

const getFunctionCallExpression = (functionData, filename, root) => {
  const buildExpression = template(`
  FactableEvidencer.registerFunctionCall(ARGUMENTS_ARRAY_EXPRESSION, output, {
    name: NAME_STRING_LITERAL,
    params: ${safeJsonStringify(functionData.params)},
    filename: '${filename}',
    root: '${root}',
  });
`);
  return buildExpression({
    ARGUMENTS_ARRAY_EXPRESSION: types.arrayExpression(
      functionData.params.flat().map((param) => types.identifier(param))
    ),
    NAME_STRING_LITERAL: types.stringLiteral(functionData.name),
  });
};

const getRequireExpression = (port) => template.ast`
  const Evid = require("factable").evidencer;
  const FactableEvidencer = new Evid({ port: ${port} }).getInstance();
`;

const getReturnExpression = () => template.ast`
  return output;
`;

const getAlowedNames = (path) => {
  return path.node.body
    .map((child) => {
      if (child.type === "FunctionDeclaration") {
        return child.id && child.id.name;
      }
      if (child.type === "VariableDeclaration") {
        const hasName =
          child.declarations[0].id && child.declarations[0].id.name;
        if (child.declarations[0].init.type === "ArrowFunctionExpression") {
          return hasName;
        }
        return false;
      }
    })
    .filter((child) => !!child);
};

module.exports = {
  excludeThisFunctionNode,
  wrapperOutputName,
  getAlowedNames,
  isFactableOn,
  getFunctionData,
  getRequireExpression,
  getFunctionCallExpression,
  getReturnExpression,
  isValidPortNumber,
};

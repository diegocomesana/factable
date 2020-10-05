const template = require("babel-template");

const parentIsWrapper = (path) => {
  const parentPath = getParentStatement(path);
  //return parentPath.node.id.name === "wrapper";
  return true;
  return (
    parentPath.isVariableDeclarator() && parentPath.node.id.name === "wrapper"
  );
  //return false;
};

const debugParent = (path) => {
  const parentPath = getParentStatement(path);
  console.log("parentDebug", parentPath.node);
};

const functionEnterDebug = (path) => {
  const isAnonim = !path.node.id;
  const parentPath = getParentStatement(path);
  console.log();
  console.log("FUNCTION: ", path.node.id ? path.node.id.name : "ANONIMA!!");
  if (isAnonim && parentPath.node.type === "VariableDeclaration") {
    console.log("parent: ", parentPath.node.declarations[0].id.name);
  }
  console.log();
};

const wrapperOutputName = "output";
const excludedFunctionNames = [wrapperOutputName];

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
      parentPath.node.type !== "VariableDeclaration" ||
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
    if (parentPath.node.type == "VariableDeclaration") {
      return parentPath.node.declarations[0].id.name;
    }
    return "";
  }
  return path.node.id.name;
};

const getFunctionParams = (path) => {
  let params = [];
  path.find((interPath) => {
    if (interPath.isArrowFunctionExpression() || interPath.isFunction()) {
      const currentPathParams = interPath.node.params.map((node) => node.name);
      params = params.concat([currentPathParams]);
      return false;
    }
    return true;
  });
  return params.reverse().flat();
};

const getFunctionData = (path) => {
  const name = getFunctionName(path);
  const params = getFunctionParams(path);
  return { name, params };
};

const buildAutotrackExpression = template(`
  const Heap = require('@babel-plugin-test-case-gen/TestCaseGenerator').default;  
  Heap.captureTouchablePress(THIS_EXPRESSION, e);
  TestCaseGenerator.registerFunctionCall(arguments, output, {
    name: "originalFunc",
    params: ["param1", "param2"],
  });
`);

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
};

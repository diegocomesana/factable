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

const getParentStatement = (path) => {
  return path.getStatementParent();
};

const excludeThisFunctionNode = (path) => {
  const isAnonim = !path.node.id;
  const parentPath = getParentStatement(path);

  if (isAnonim) {
    if (
      parentPath.node.type === "VariableDeclaration" &&
      excludedFunctionNames.includes(parentPath.node.declarations[0].id.name)
    ) {
      return true;
    }
  } else {
    if (excludedFunctionNames.includes(path.node.id.name)) {
      return true;
    }
  }

  return false;
};

const buildAutotrackExpression = template(`
  const Heap = require('@babel-plugin-test-case-gen/TestCaseGenerator').default;  
  Heap.captureTouchablePress(THIS_EXPRESSION, e);
  TestCaseGenerator.registerFunctionCall(arguments, output, {
    name: "originalFunc",
    params: ["param1", "param2"],
  });
`);

module.exports = {
  excludeThisFunctionNode,
  wrapperOutputName,
};

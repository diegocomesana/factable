const { default: template } = require("@babel/template");
const types = require("@babel/types");

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
      (parentPath.node.type !== "VariableDeclaration" &&
        parentPath.node.type !== "ExportNamedDeclaration") ||
      (parentPath.node.type === "VariableDeclaration" &&
        excludedFunctionNames.includes(parentPath.node.declarations[0].id.name))
    ) {
      console.log("devuelvo TRUE!!");
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

const getParamNameFromParamNode = (node) => {
  if (node.type == "AssignmentPattern") {
    // If param has default value
    return node.left.name;
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

const getFunctionCallExpression = (functionData) => {
  const buildExpression = template(`
  FactableEvidencer.registerFunctionCall(ARGUMENTS_ARRAY_EXPRESSION, output, {
    name: NAME_STRING_LITERAL,
    params: PARAMS_ARRAY_EXPRESSION,
  });
`);
  return buildExpression({
    ARGUMENTS_ARRAY_EXPRESSION: types.arrayExpression(
      functionData.params.map((param) => types.identifier(param))
    ),
    NAME_STRING_LITERAL: types.stringLiteral(functionData.name),
    PARAMS_ARRAY_EXPRESSION: types.arrayExpression(
      functionData.params.map((param) => types.stringLiteral(param))
    ),
  });
};

const getRequireExpression = () => template.ast`
  //const FactableEvidencer = require('factable').evidencer;
  const FactableEvidencer = new require("factable").evidencer().getInstance();
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
};

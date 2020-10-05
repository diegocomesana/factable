const {
  excludeThisFunctionNode,
  wrapperOutputName,
  getAlowedNames,
  isFactableOn,
  getFunctionData,
  getRequireExpression,
} = require("./common/utils");

module.exports = function ({ types: t }) {
  const FACTABLE_TRANSPILE = process.env.FACTABLE_TRANSPILE;
  console.log(("FACTABLE_TRANSPILE:", FACTABLE_TRANSPILE));
  if (FACTABLE_TRANSPILE !== "on") {
    return {};
  }

  const Visitor = {
    Function: {
      enter(path, state) {
        if (excludeThisFunctionNode(path, state)) {
          return;
        }

        console.log("FUNCTION DATA: ", getFunctionData(path));

        const functionExpression = t.functionExpression(
          null,
          [],
          path.node.body,
          false,
          false
        );

        const wrapperCallExpression = t.callExpression(functionExpression, []);

        const newBodyBlock = t.blockStatement([
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier(wrapperOutputName),
              wrapperCallExpression
            ),
          ]),
        ]);

        path.node.body = newBodyBlock;
      },
    },
  };

  const VisitorInitiator = {
    Program: {
      enter: (path) => {
        if (!isFactableOn(path)) return;

        const allowedNames = getAlowedNames(path);

        path.unshiftContainer("body", getRequireExpression());

        path.traverse(Visitor, {
          allowedNames,
        });
      },
    },
  };

  return {
    name: "babel-plugin-factable",
    visitor: VisitorInitiator,
  };
};

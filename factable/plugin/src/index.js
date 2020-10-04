const {
  excludeThisFunctionNode,
  wrapperOutputName,
} = require("./common/utils");

module.exports = function ({ types: t }) {
  return {
    name: "babel-plugin-factable",
    visitor: {
      Identifier() {
        // console.log("Called!");
      },
      Function: {
        enter(path) {
          if (excludeThisFunctionNode(path)) {
            return;
          }

          const functionExpression = t.functionExpression(
            null,
            [],
            path.node.body,
            false,
            false
          );

          const wrapperCallExpression = t.callExpression(
            functionExpression,
            []
          );

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
    },
  };
};

const {
  excludeThisFunctionNode,
  wrapperOutputName,
  getAlowedNames,
  isFactableOn,
  getFunctionData,
  getRequireExpression,
  getFunctionCallExpression,
  getReturnExpression,
  isValidPortNumber,
} = require("./common/utils");

module.exports = function ({ types: t }) {
  const FACTABLE_TRANSPILE = process.env.FACTABLE_TRANSPILE;
  const isValidPort = isValidPortNumber(FACTABLE_TRANSPILE);
  const PORT = FACTABLE_TRANSPILE;
  if (!isValidPort) {
    return {};
  }

  const Visitor = {
    Function: {
      enter(path, state) {
        if (excludeThisFunctionNode(path, state)) {
          return;
        }

        const functionExpression = t.functionExpression(
          null,
          [],
          path.node.body,
          false,
          false
        );

        const wrapperCallExpression = t.callExpression(functionExpression, []);

        const filename =
          state.file && state.file.opts && state.file.opts.filename
            ? state.file.opts.filename
            : "";

        const root =
          state.file && state.file.opts && state.file.opts.root
            ? state.file.opts.root
            : "";

        const newBodyBlock = t.blockStatement([
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier(wrapperOutputName),
              wrapperCallExpression
            ),
          ]),
          getFunctionCallExpression(getFunctionData(path), filename, root),
          getReturnExpression(),
        ]);

        path.node.body = newBodyBlock;
      },
    },
  };

  const VisitorInitiator = {
    Program: {
      enter: (path, state) => {
        if (!isFactableOn(path)) return;

        const allowedNames = getAlowedNames(path);
        const customState = {
          ...state,
          allowedNames,
        };

        path.unshiftContainer("body", getRequireExpression(PORT));

        path.traverse(Visitor, customState);
      },
    },
  };

  return {
    name: "babel-plugin-factable",
    visitor: VisitorInitiator,
  };
};

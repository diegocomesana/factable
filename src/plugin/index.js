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

        // const functionFilename =
        //   state.file && state.file.opts && state.file.opts.filename
        //     ? state.file.opts.filename
        //     : "";

        console.log("functionFilename: ", state);

        const newBodyBlock = t.blockStatement([
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier(wrapperOutputName),
              wrapperCallExpression
            ),
          ]),
          getFunctionCallExpression(getFunctionData(path), " "),
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

        // filename: undefined,
        // auxiliaryCommentBefore: undefined,
        // auxiliaryCommentAfter: undefined,
        // retainLines: undefined,
        // comments: false,
        // shouldPrintComment: undefined,
        // compact: 'auto',
        // minified: undefined,
        // sourceMaps: false,
        // sourceRoot: undefined,
        // sourceFileName: 'unknown'

        // console.log("JAJAJA: ", state.file.opts);

        // const sourceRoot = state.file.opts.sourceRoot || " ";
        const sourceRoot = " ";

        const allowedNames = getAlowedNames(path);
        const customState = {
          ...state,
          allowedNames,
        };

        path.unshiftContainer("body", getRequireExpression(PORT, sourceRoot));

        path.traverse(Visitor, customState);
      },
    },
  };

  return {
    name: "babel-plugin-factable",
    visitor: VisitorInitiator,
  };
};

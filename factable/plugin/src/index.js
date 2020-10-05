const {
  excludeThisFunctionNode,
  wrapperOutputName,
  getAlowedNames,
  isFactableOn,
  getFunctionData,
} = require("./common/utils");

module.exports = function ({ types: t }) {
  const Visitor = {
    //   StringLiteral(path, state) {
    //     if (path.node.value === "👵") {
    //       const recipeRef = state.grandmasRecipes[path.node.loc.start.line];
    //       const recipeMatches = recipeRef && recipeRef.start > path.node.start;
    //       if (recipeMatches) {
    //         const recipe = recipeRef.value;
    //         const domStruc = cookRecipe(recipe, state.grandmasReference);

    //         const typeExpression = genTypeExpression(domStruc);

    //         path.replaceWith(typeExpression);
    //       }
    //     }
    //   },
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
    Program(path) {
      if (!isFactableOn(path)) return;

      const allowedNames = getAlowedNames(path);

      path.traverse(Visitor, {
        allowedNames,
      });
    },
  };

  return {
    name: "babel-plugin-factable",
    visitor: VisitorInitiator,
  };
};

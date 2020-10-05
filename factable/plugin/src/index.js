const {
  excludeThisFunctionNode,
  wrapperOutputName,
  getAlowedNames,
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
      // console.log("DIEGO ----- File Comments: ", path.parent.comments);

      const commentLineTokens = path.parent.comments.filter(
        (token) => token.type === "CommentLine"
      );
      // const commentBlockTokens = path.parent.comments.filter(
      //   (token) => token.type === "CommentBlock"
      // );

      if (!commentLineTokens.length) return;

      const factableConfigLine = commentLineTokens
        .filter((line) => line.value.trim() === "FACTABLE" && line.start === 0)
        .shift();

      const isFactableOn = !!factableConfigLine;
      // console.log("isFactableOn:", isFactableOn);
      if (!isFactableOn) return;

      // const grandmasReference = buildGrandmasReference(commentLineTokens);
      // const grandmasRecipes = buildGrandmasRecipe(commentBlockTokens);

      const allowedNames = getAlowedNames(path);

      console.log("allowedNames: ", allowedNames);

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

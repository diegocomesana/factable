export default function (babel) {
  const { types: t } = babel;

  const getParentStatement = (path) => {
    return path.getStatementParent();
  };

  const borrame = (path) =>
    path.findParent((path) => {
      return path.isVariableDeclarator() && path.node.id.name === "wrapper";
    });

  const parentIsWrapper = (path) => {
    const parentPath = getParentStatement(path);
    //return parentPath.node.id.name === "wrapper";
    return true;
    return (
      parentPath.isVariableDeclarator() && parentPath.node.id.name === "wrapper"
    );
    //return false;
  };

  return {
    name: "ast-transform", // not required
    visitor: {
      /*
      Identifier(path) {
        path.node.name = path.node.name.split('').reverse().join('');
      },
      */
      Function: (path) => {
        //path.node.id.name = "lalala";

        if (parentIsWrapper(path)) {
          return;
        }

        /*
        if (path.node.type == "FunctionExpression") {
          return;
        }
        */

        /*
        if (!path.node.id) {
          return;
        }
        */

        if (
          path.node.id.name == "funcDeclarada" ||
          path.node.id.name == "funcExpresada"
        ) {
          return;
        }

        const functionExpression = t.functionExpression(
          null,
          [],
          path.node.body,
          false,
          false
        );

        const functionDeclaration = t.functionDeclaration(
          t.identifier("funcDeclarada"),
          [],
          t.blockStatement([]),
          false,
          false
        );

        const newBodyBlock = t.blockStatement([
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier("var1"),
              t.stringLiteral("pijaaa")
            ),
          ]),
          t.variableDeclaration("const", [
            t.variableDeclarator(
              t.identifier("var1"),
              t.stringLiteral("pissstola")
            ),
          ]),
          functionDeclaration,

          t.variableDeclaration("const", [
            t.variableDeclarator(t.identifier("wrapper"), functionExpression),
          ]),
        ]);

        const originalBody = path.node.body;

        //path.node.body = originalBody;
        path.node.body = newBodyBlock;

        //path.replaceWith(originalBody);
      },
    },
  };
}

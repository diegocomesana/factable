// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
// https://astexplorer.net/#/Z1exs6BWMq
// https://itnext.io/introduction-to-custom-babel-plugins-98a62dad16ee
// DOCU DE LOS BABEL TYPES: https://babeljs.io/docs/en/next/babel-types.html
// EL MEJOR TUTO: https://heap.io/blog/engineering/how-we-leveraged-asts-and-babel-to-capture-everything-on-react-native-apps
// OTRO BUENO: https://www.sitepoint.com/understanding-asts-building-babel-plugin/

const template = require("babel-template");

module.exports = function testCaseGenerator({ types: t }) {
  return {
    name: "test-case-generator",
    visitor: {
      Identifier() {
        // console.log("Called!");
      },
      Function: {
        enter(path) {
          // path.get("body").unshiftContainer("body", t.variableDeclaration());
          // const functionBody = path.get("body");
          // const newFunctionWrapper = t.variableDeclaration("const", [
          //   t.variableDeclarator(
          //     t.identifier("output"),
          //     t.callExpression(
          //       t.functionExpression(null, [], functionBody, false, false),
          //       []
          //     )
          //   ),
          // ]);

          // const newFunctionBodyBlock = t.blockStatement([
          //   t.variableDeclaration("const", [
          //     t.variableDeclarator(
          //       t.identifier("output"),
          //       t.callExpression(
          //         t.memberExpression(
          //           t.identifier("console"),
          //           t.identifier("time")
          //         ),
          //         [t.stringLiteral(path.node.id.name)]
          //       )
          //     ),
          //   ]),
          // ]);

          const functionExpressionAA = t.functionExpression(
            null,
            [],
            t.blockStatement([]),
            false,
            false
          ); // ESTO NO FUNCA

          const lachotaValue = t.stringLiteral("LACHOTA");

          const newFunctionBodyBlock = t.blockStatement([
            t.variableDeclaration("const", [
              t.variableDeclarator(t.identifier("output"), lachotaValue),
            ]),
          ]);

          const functionExpression = t.functionExpression(
            path.node.id.name,
            [],
            path.node.body,
            false,
            false
          );

          path.replaceWith(functionExpression);
        },
        // exit(path) {
        // check last expression from BlockStatement
        // const blockStatement = path.get("body");
        // const lastExpression = blockStatement.get("body").pop();
        // const timeEndStatement = t.callExpression(
        //   t.memberExpression(
        //     t.identifier("console"),
        //     t.identifier("timeEnd")
        //   ),
        //   [t.stringLiteral(path.node.id.name)]
        // );
        // if (lastExpression.type !== "ReturnStatement") {
        //   lastExpression.insertAfter(timeEndStatement);
        // } else {
        //   lastExpression.insertBefore(timeEndStatement);
        // }
        // },
      },
    },
  };
};

/*
const output = 1;





VALOR_DE_LA_VAR:
()
t.callExpression(VA_LA_FUCTION_EXPRESION, [])

VA_LA_FUCTION_EXPRESION:
t.functionExpression(null, [], body, false, false)


t.variableDeclaration("output")







*/

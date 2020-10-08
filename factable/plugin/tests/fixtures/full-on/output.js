const FactableEvidencer = new require("factable").evidencer().getInstance();

// FACTABLE
const johndoe = "yeahhh";

function originalFunc(param1, param2) {
  const output = (function () {
    console.log("originalFunc called! ", param1, param2);
    return param1 + param2;
  })();

  FactableEvidencer.registerFunctionCall([param1, param2], output, {
    name: "originalFunc",
    params: ["param1", "param2"],
  });
}

const originalFuncExpresada = (param1, param2) => (param3) => {
  const output = (function () {
    console.log("originalFuncExpresada called! ", param1, param2);
    return param1 + param2;
  })();

  FactableEvidencer.registerFunctionCall([param1, param2, param3], output, {
    name: "originalFuncExpresada",
    params: ["param1", "param2", "param3"],
  });
};

const originalFuncExpresada2 = (param1, param2) => {
  const output = (function () {
    return (lala) => (otra) => (diego) => {
      return lala;
    };
  })();

  FactableEvidencer.registerFunctionCall([param1, param2], output, {
    name: "originalFuncExpresada2",
    params: ["param1", "param2"],
  });
};

const exprCurriada = (lala) => () => {
  const output = (function () {
    return lala;
  })();

  FactableEvidencer.registerFunctionCall([lala], output, {
    name: "exprCurriada",
    params: ["lala"],
  });
};

const exprCurriada2 = (lala) => (otra) => (diego) => {
  const output = (function () {
    return lala;
  })();

  FactableEvidencer.registerFunctionCall([lala, otra, diego], output, {
    name: "exprCurriada2",
    params: ["lala", "otra", "diego"],
  });
};

const exprEnroscada = (lala) => {
  const output = (function () {
    return () => {
      return lala;
    };
  })();

  FactableEvidencer.registerFunctionCall([lala], output, {
    name: "exprEnroscada",
    params: ["lala"],
  });
};

const resultDeAnonimQueSeAutoEjecuta = (function () {
  const output = (function () {
    return true;
  })();

  FactableEvidencer.registerFunctionCall([], output, {
    name: "resultDeAnonimQueSeAutoEjecuta",
    params: [],
  });
})();

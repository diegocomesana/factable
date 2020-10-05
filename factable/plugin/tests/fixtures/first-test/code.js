// FACTABLE

function originalFunc(param1, param2) {
  console.log("originalFunc called! ", param1, param2);
  return param1 + param2;
}

const originalFuncExpresada = (param1, param2) => {
  console.log("originalFuncExpresada called! ", param1, param2);
  return param1 + param2;
};

const originalFuncExpresada2 = (param1, param2) => {
  return (lala) => (otra) => (diego) => {
    return lala;
  };
};

const exprCurriada = (lala) => () => {
  return lala;
};

const exprCurriada2 = (lala) => (otra) => (diego) => {
  return lala;
};

const exprEnroscada = (lala) => {
  return () => {
    return lala;
  };
};

const resultDeAnonimQueSeAutoEjecuta = (function () {
  return true;
})();

const johndoe = "yeahhh";

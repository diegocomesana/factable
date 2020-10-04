function originalFunc(param1, param2) {
  const output = (function () {
    console.log("originalFunc called! ", param1, param2);
    return param1 + param2;
  })();
}

const originalFuncExpresada = (param1, param2) => {
  const output = (function () {
    console.log("originalFuncExpresada called! ", param1, param2);
    return param1 + param2;
  })();
};

const exprEnroscada = (lala) => {
  const output = (function () {
    return () => {
      const output = (function () {
        return lala;
      })();
    };
  })();
};
//# sourceMappingURL=code.js.map

// FACTABLE

function originalFunc(param1, param2) {
  console.log("originalFunc called! ", param1, param2);
  return param1 + param2;
}

const originalFuncExpresada = (param1, param2) => {
  console.log("originalFuncExpresada called! ", param1, param2);
  return param1 + param2;
};

// const exprEnroscada = (lala) => () => {
//   return lala;
// };

const exprEnroscada = (lala) => {
  return () => {
    return lala;
  };
};

const lachota = "yeahhh";

function originalFunc(param1, param2) {
  console.log("originalFunc called! param1: ", param1, param2);
  return param1 + param2;
}

const originalArrowFunc = (param1) => {
  console.log("originalArrowFunc called! param1: ", param1);
  return param1;
};

// console.log("ejecutando funciones originales:");

const registerFunctionCall = (input, output, metadata) => {
  console.log("registerFunctionCall------------");
  console.log("------- intput: ", JSON.stringify(input, null, 2));
  console.log("------- output: ", output);
  console.log("------- metadata: ", metadata);
  console.log("------------------------------");
};

// originalFunc("lalala1");
// originalArrowFunc("lalala2");

// console.log("------------------------------------------");

function originalFunc2(param1, param2) {
  // AGREGADO
  const output = (function () {
    // AGREGADO
    // ORIGINAL BODY
    console.log("originalFunc called! ", param1, param2);
    return param1 + param2;
    // ORIGINAL BODY
    // AGREGADO
  })();
  registerFunctionCall(arguments, output, {
    name: "originalFunc",
    params: ["param1", "param2"],
  });
  // AGREGADO
}

originalFunc2("trulutrulu", "yeahhh");

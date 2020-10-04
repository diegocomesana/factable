function originalFunc(param1, param2) {
  const output = (function () {
    console.log("originalFunc called! ", param1, param2);
    return param1 + param2;
  })();
  registerFunctionCall(arguments, output, {
    name: "originalFunc",
    params: ["param1", "param2"],
  });
  return output;
}

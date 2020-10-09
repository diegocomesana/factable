// const FactableEvidencer = new require("factable").evidencer().getInstance();

const Evid = require(".");
const FactableEvidencer = new Evid().getInstance();

FactableEvidencer.registerFunctionCall(
  [],
  { test_salida: "yeahh" },
  {
    name: "originalFuncExpresada",
    params: ["param1", "param2", "param3"],
  }
);

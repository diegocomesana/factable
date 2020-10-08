"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevMode = exports.RunMode = void 0;
const RunMode = {
  DEV: "dev",
  TEST: "test",
  PROD: "production",
  TEST_CASE_GENERATOR: "test-case-generator"
};
exports.RunMode = RunMode;
const DevMode = {
  REGULAR: "regular",
  TEST_CASE_GENERATOR: "test-case-generator"
};
exports.DevMode = DevMode;
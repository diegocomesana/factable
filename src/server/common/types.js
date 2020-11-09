export const RunMode = {
  DEV: "dev",
  TEST: "test",
  PROD: "production",
};

export const DevMode = {
  REGULAR: "regular",
};

export const SocketMessageType = {
  REGISTER_FUNCTION_CALL: "registerFunctionCall",
  ON_CASE_CLICKED: "onCaseClicked",
  ON_BUILD_TEST: "onBuildTest",
  ON_EDIT_TEST: "onEdigTest",
  ON_DISCARD_TEST: "onDiscardTest",
  ON_BUILD_TEST_CONFIRMED: "onBuildTestConfirmed",
  ON_DISCARD_TEST_CONFIRMED: "onDiscardTestConfirmed",
  CASE_VIEW: "caseView",
  INIT: "init",
};

export const LayoutView = {
  CASES: "cases",
  CASE_VIEW: "caseView",
};

export const TestAction = {
  BUILD: "build",
  DISCARD: "discard",
  EDIT: "edit",
  EJECT: "eject",
};

export const AllowedActions = {
  TESTED: [TestAction.EDIT, TestAction.DISCARD],
  UNTESTED: [TestAction.BUILD],
};

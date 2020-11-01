import { LayoutView } from "../common/types";

const getCurrentFileValue = (state, key, def = {}) => {
  return state[key] || def;
};

const getCurrentFunctionValue = (file, key, def = { calls: {} }) => {
  return file[key] || def;
};

const getCurrentInputValue = (
  func,
  key,
  def = {
    outputs: {},
  }
) => {
  return func[key] || def;
};

// SERVER
export const onSaveTest = (prevState) => (testInfo) => {
  const currentFileValue = getCurrentFileValue(
    prevState.tests,
    testInfo.relativeFilePath
  );
  const currentFunctionValue = getCurrentFunctionValue(
    currentFileValue,
    testInfo.functionName,
    {}
  );

  return {
    ...prevState,
    tests: {
      ...prevState.tests,
      [testInfo.relativeFilePath]: {
        ...currentFileValue,
        [testInfo.functionName]: {
          ...currentFunctionValue,
          [testInfo.ioHash]: {
            ...testInfo,
          },
        },
      },
    },
  };
};

// SERVER AND CLIENT
export const onRegisterFunctionCall = (prevState) => (callInfo) => {
  const currentFileValue = getCurrentFileValue(
    prevState.cases,
    callInfo.relativeFilePath
  );
  const currentFunctionValue = getCurrentFunctionValue(
    currentFileValue,
    callInfo.metadata.name
  );

  const currentIntputValue = getCurrentInputValue(
    currentFunctionValue.calls,
    callInfo.inputHash
  );

  return {
    ...prevState,
    cases: {
      ...prevState.cases,
      [callInfo.relativeFilePath]: {
        ...currentFileValue,
        [callInfo.metadata.name]: {
          ...currentFunctionValue,
          calls: {
            ...currentFunctionValue.calls,
            [callInfo.inputHash]: {
              ...currentIntputValue,
              caseString: callInfo.caseString,
              outputs: {
                ...currentIntputValue.outputs,
                [callInfo.outputHash]: {
                  ioHash: callInfo.ioHash,
                  // tested: "src/ladlla/lalal.spec.js",
                  // tested: false,
                  // tested: testedState ? testedState.relativeFilePath : false,
                },
              },
            },
          },
        },
      },
    },
  };
};

// CLIENT
export const onCaseView = (prevState) => (caseInfo) => {
  console.log("caseInfo: ", caseInfo);
  return {
    ...prevState,
    caseInfo,
    layoutState: {
      ...prevState.layoutState,
      currentView: LayoutView.CASE_VIEW,
    },
  };
};

// CLIENT
export const onBack = (prevState) => () => {
  return {
    ...prevState,
    layoutState: {
      ...prevState.layoutState,
      currentView: LayoutView.CASES,
    },
  };
};

// CLIENT
export const onBuildTestConfirmed = (prevState) => (testInfo) => {
  console.log("onBuildTestConfirmed", testInfo);
  const currentFileValue = getCurrentFileValue(
    prevState.tests,
    testInfo.relativeFilePath
  );
  const currentFunctionValue = getCurrentFunctionValue(
    currentFileValue,
    testInfo.functionName,
    {}
  );

  return {
    ...prevState,
    tests: {
      ...prevState.tests,
      [testInfo.relativeFilePath]: {
        ...currentFileValue,
        [testInfo.functionName]: {
          ...currentFunctionValue,
          [testInfo.ioHash]: {
            ...testInfo,
          },
        },
      },
    },
  };
};

// const getTestedState = (state, relativeFilePath, functionName, ioHash) => {
//   return (
//     state.tests[relativeFilePath] &&
//     state.tests[relativeFilePath][functionName] &&
//     state.tests[relativeFilePath][functionName][ioHash]
//   );
// };

export default {
  onRegisterFunctionCall,
  onCaseView,
  onBack,
  onSaveTest,
  onBuildTestConfirmed,
};

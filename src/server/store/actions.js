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

export const onRegisterFunctionCall = (prevState) => (callInfo) => {
  // console.log("prevState:", prevState);
  // console.log("callInfo:", callInfo);
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

  // console.log("currentIntputValue:", currentIntputValue);

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
                  tested: false,
                },
              },
            },
          },
        },
      },
    },
  };
};

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

export const onBack = (prevState) => () => {
  return {
    ...prevState,
    layoutState: {
      ...prevState.layoutState,
      currentView: LayoutView.CASES,
    },
  };
};

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

export default {
  onRegisterFunctionCall,
  onCaseView,
  onBack,
  onSaveTest,
};

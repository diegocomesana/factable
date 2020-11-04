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
  // console.log("caseInfo: ", caseInfo);
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
  // console.log("onBuildTestConfirmed", testInfo);
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
    testCaseModal: {
      ...prevState.testCaseModal,
      visible: false,
    },
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

export const onTestCaseModalShow = (prevState) => ({ type, ioHash }) => {
  return {
    ...prevState,
    testCaseModal: {
      ...prevState.testCaseModal,
      visible: true,
      ioHash,
      type,
      inputs: {
        description: "",
      },
    },
  };
};

export const onTestCaseModalDismiss = (prevState) => () => {
  return {
    ...prevState,
    testCaseModal: {
      ...prevState.testCaseModal,
      visible: false,
    },
  };
};

export const onTestCaseModalDescriptionChange = (prevState) => ({ value }) => {
  return {
    ...prevState,
    testCaseModal: {
      ...prevState.testCaseModal,
      inputs: {
        ...prevState.testCaseModal.inputs,
        description: value,
      },
    },
  };
};

export const onTestCaseModalConfirmed = (prevState) => ({ type, ioHash }) => {
  return {
    ...prevState,
    testCaseModal: {
      ...prevState.testCaseModal,
      visible: false,
    },
  };
};

export default {
  onRegisterFunctionCall,
  onCaseView,
  onBack,
  onSaveTest,
  onBuildTestConfirmed,
  onTestCaseModalShow,
  onTestCaseModalDismiss,
  onTestCaseModalConfirmed,
  onTestCaseModalDescriptionChange,
};

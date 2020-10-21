import { LayoutView } from "../common/types";

const getCurrentFileValue = (state, key) => {
  return state[key] || {};
};

const getCurrentFunctionValue = (file, key) => {
  return file[key] || { calls: {} };
};

const getCurrentInputValue = (func, key) => {
  return (
    func[key] || {
      outputs: {},
    }
  );
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

  console.log("currentIntputValue:", currentIntputValue);

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

export default {
  onRegisterFunctionCall,
  onCaseView,
  onBack,
};

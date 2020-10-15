import { LayoutView } from "../common/types";

const getCurrentFileValue = (state, key) => {
  return state[key] || {};
};

const getCurrentFunctionValue = (file, key) => {
  return (
    file[key] || {
      calls: [],
    }
  );
};

export const onRegisterFunctionCall = (prevState) => (callInfo) => {
  console.log("lalalla:", prevState);
  const currentFileValue = getCurrentFileValue(
    prevState.cases,
    callInfo.relativeFilePath
  );
  const currentFunctionValue = getCurrentFunctionValue(
    currentFileValue,
    callInfo.metadata.name
  );

  return {
    ...prevState,
    cases: {
      ...prevState.cases,
      [callInfo.relativeFilePath]: {
        ...currentFileValue,
        [callInfo.metadata.name]: {
          ...currentFunctionValue,
          calls: [...currentFunctionValue.calls, callInfo.hash],
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

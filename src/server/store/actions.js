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

export const onMessage = (prevState) => (callInfo) => {
  const currentFileValue = getCurrentFileValue(
    prevState,
    callInfo.relativeFilePath
  );
  const currentFunctionValue = getCurrentFunctionValue(
    currentFileValue,
    callInfo.metadata.name
  );

  return {
    ...prevState,
    [callInfo.relativeFilePath]: {
      ...currentFileValue,
      [callInfo.metadata.name]: {
        ...currentFunctionValue,
        calls: [...currentFunctionValue.calls, callInfo.hash],
      },
    },
  };
};

export const onCaseView = (prevState) => (payload) => {
  console.log("onCaseView:", payload);
  return {
    ...prevState,
  };
};

export default {
  onMessage,
  onCaseView,
};

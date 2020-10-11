const getCurrentValue = (state, key) => {
  return (
    state[key] || {
      calls: [],
    }
  );
};

const onMessage = (prevState) => (callInfo) => {
  const currentValue = getCurrentValue(prevState, callInfo.metadata.name);

  return {
    ...prevState,
    [callInfo.metadata.name]: {
      ...currentValue,
      calls: [...currentValue.calls, callInfo.hash],
    },
  };
};

export const storeFactory = (initialState) => {
  let state = initialState;
  const applyState = (newState) => {
    state = newState;
    return state;
  };

  return {
    getState: () => state,
    onMessage: (callInfo) => applyState(onMessage(state)(callInfo)),
  };
};

export default storeFactory;

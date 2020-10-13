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

let stateDefault = {};

const onStateChangeDefault = (newState) => {
  stateDefault = newState;
};

const onStateGetDefault = () => stateDefault;

const defaultObj = {
  onStateChange: onStateChangeDefault,
  onStateGet: onStateGetDefault,
};

export const storeFactory = ({ onStateChange, onStateGet } = defaultObj) => {
  const applyState = (newState) => {
    onStateChange(newState);
    return onStateGet();
  };

  return {
    getState: () => onStateGet(),
    initState: (initialState) => applyState(initialState),
    onMessage: (callInfo) => applyState(onMessage(onStateGet())(callInfo)),
  };
};

export default storeFactory;

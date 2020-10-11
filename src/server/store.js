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
  console.log("onStateChangeDefault: ", newState);
  stateDefault = newState;
};

const onStateGetDefault = () => {
  console.log("onStateGetDefault", stateDefault);
  console.log("Clarksville state:", stateDefault["Clarksville"]);
  return stateDefault;
};

const defaultObj = {
  initialState: { algo: true, otracosa: "yeahh" },
  onStateChange: onStateChangeDefault,
  onStateGet: onStateGetDefault,
};

export const storeFactory = ({
  initialState,
  onStateChange,
  onStateGet,
} = defaultObj) => {
  onStateChange(initialState);
  const applyState = (newState) => {
    onStateChange(newState);
    return onStateGet();
  };

  return {
    getState: () => onStateGet(),
    onMessage: (callInfo) => applyState(onMessage(onStateGet())(callInfo)),
  };
};

export default storeFactory;

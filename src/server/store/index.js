let stateDefault = {};

const onStateChangeDefault = (newState) => {
  stateDefault = newState;
};

const onStateGetDefault = () => stateDefault;

const defaultObj = {
  onStateChange: onStateChangeDefault,
  onStateGet: onStateGetDefault,
  debug: true,
};

export const storeFactory = ({
  onStateChange,
  onStateGet,
  debug,
} = defaultObj) => {
  if (!onStateGet) onStateGet = onStateGetDefault;
  if (!onStateChange) onStateChange = onStateChangeDefault;
  const applyState = (newState) => {
    onStateChange(newState);
    // if (debug) console.log("NEW STATE: ", newState);
    // console.log("NEW STATE: ", newState);
    return onStateGet();
  };

  return {
    getState: () => onStateGet(),
    initState: (initialState) => applyState(initialState),
    dispatch: (action) => (payload) =>
      applyState(action(onStateGet())(payload)),
  };
};

export default storeFactory;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import { Button } from "reactstrap";
import storeFactory from "../server/store";
import actions from "../server/store/actions";
import {
  SocketMessageType,
  LayoutView,
  TestAction,
} from "../server/common/types";
import { msgWrapper, parseJson } from "./utils";
import Files from "./files";
import CaseView from "./case-view";
import TestCaseModal from "./test-case-modal";

const namespace = `ui-app`;
const nsClassName = (name) => `${namespace}__${name}`;

const AppPrestyled = ({ className }) => {
  const [stateInited, setInited] = useState(false);
  const [dataStore, setDataStore] = useState({});
  const ws = useRef(null);
  const reconect_timeout = useRef(null);

  const onStateChange = (newState) => {
    setDataStore(newState);
  };

  const onStateGet = () => dataStore;

  const store = storeFactory({ onStateChange, onStateGet, debug: true });

  const onSocketMessage = (e) => {
    const data = parseJson(e.data);

    if (!(data && data.type)) {
      return;
    }

    if (data.type === SocketMessageType.INIT && data.payload && !stateInited) {
      setInited(true);
      store.initState({
        layoutState: {
          currentView: "cases",
        },
        caseInfo: false,
        testCaseModal: {
          visible: false,
          type: TestAction.EDIT,
          inputs: {
            description: "",
          },
        },
        ...data.payload,
      });
    }

    if (
      data.type === SocketMessageType.REGISTER_FUNCTION_CALL &&
      data.payload &&
      data.payload.inputHash
    ) {
      store.dispatch(actions.onRegisterFunctionCall)(data.payload);
    }

    if (data.type === SocketMessageType.CASE_VIEW && data.payload) {
      store.dispatch(actions.onCaseView)(data.payload);
    }

    if (
      data.type === SocketMessageType.ON_BUILD_TEST_CONFIRMED &&
      data.payload
    ) {
      store.dispatch(actions.onBuildTestConfirmed)(data.payload);
    }
  };

  const connect = () => {
    const { port } = window.__FACTABLE_CLIENT_CONFIG__;
    ws.current = new WebSocket(`ws://localhost:${port}`);
    ws.current.onopen = () => {
      if (reconect_timeout.current) {
        clearTimeout(reconect_timeout.current);
      }
    };
    ws.current.oncerror = () => {
      reconect_timeout.current = setTimeout(() => {
        connect();
      }, 3000);
    };
    ws.current.onclose = () => {
      reconect_timeout.current = setTimeout(() => {
        connect();
      }, 3000);
    };
  };

  useEffect(() => {
    connect();
    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = onSocketMessage;
  }, [dataStore]);

  const socketSend = (type, payload) => {
    ws.current.send(JSON.stringify(msgWrapper(type, payload)));
  };

  const onCaseClick = ({ e, inputHash, fileName, functionName }) => {
    e.preventDefault();
    scrollTop();
    socketSend(SocketMessageType.ON_CASE_CLICKED, { inputHash });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  const onBack = () => {
    scrollTop();
    store.dispatch(actions.onBack)();
  };

  const onTestAction = ({ ioHash, relativeFilePath, functionName, type }) => {
    // console.log("onTestAction: ", ioHash, type);
    if (["build", "edit", "discard"].includes(type)) {
      store.dispatch(actions.onTestCaseModalShow)({
        type,
        ioHash,
        relativeFilePath,
        functionName,
      });

      // console.log("uuuuuueeeee");
      // if (modalInputRef.current) {
      //   console.log("existe hago focus");
      //   modalInputRef.current.focus();
      // }
    }
  };

  const onTestActionConfirmed = ({ ioHash, type }) => {
    // console.log("onTestActionConfirmed: ", ioHash, type);
    const {
      testCaseModal: {
        inputs: { description },
      },
    } = dataStore;
    if (description && description !== "") {
      onBuildTestCase({ ioHash, caseDescription: description });
    }
  };

  const onTestActionDismissed = ({ ioHash, type, payload }) => {
    store.dispatch(actions.onTestCaseModalDismiss)();
  };

  const onTestActionDescriptionChange = (e) => {
    store.dispatch(actions.onTestCaseModalDescriptionChange)({
      value: e.target.value,
    });
  };

  const onEditTestCase = ({ ioHash, caseDescription }) => {
    socketSend(SocketMessageType.ON_EDIT_TEST, {
      ioHash,
      caseDescription,
    });
  };
  const onDiscardTestCase = ({ ioHash }) => {
    socketSend(SocketMessageType.ON_DISCARD_TEST, {
      ioHash,
    });
  };

  const onBuildTestCase = ({ ioHash, caseDescription }) => {
    socketSend(SocketMessageType.ON_BUILD_TEST, {
      ioHash,
      caseDescription,
    });
  };

  const { cases, tests, caseInfo, layoutState, testCaseModal } = dataStore;

  const isCaseView =
    layoutState && layoutState.currentView === LayoutView.CASE_VIEW && caseInfo;

  const hasCases = !!cases && Object.keys(cases).length;

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <div className={nsClassName(`top`)}>
          <div className={nsClassName(`wrapper-header`)}>
            <div className={nsClassName(`header-content`)}>
              <div className={nsClassName(`header`)}>
                <h2>Factable</h2>
                <a
                  className={`buy-me-a-coffee`}
                  href="https://www.buymeacoffee.com/diegocomesana"
                  target="_blank"
                >
                  <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png"
                    alt="Buy Me A Coffee"
                    height="139"
                    width="39"
                  />
                </a>
              </div>
            </div>
          </div>
          {isCaseView && (
            <div className={nsClassName(`wrapper-submenu`)}>
              <div className={nsClassName(`submenu-content`)}>
                <Button
                  className={`inverted`}
                  color="primary"
                  onClick={(e) => onBack()}
                >
                  {"< Back"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          className={classNames(nsClassName(`layout`), {
            ["empty"]: !hasCases,
          })}
        >
          <div className={classNames(nsClassName(`main-content`))}>
            <TestCaseModal
              {...{
                ...testCaseModal,
                caseInfo,
                onConfirm: onTestActionConfirmed,
                onDismiss: onTestActionDismissed,
                onDescriptionChange: onTestActionDescriptionChange,
              }}
            />
            {isCaseView ? (
              <CaseView {...{ ...caseInfo, tests, onBack, onTestAction }} />
            ) : hasCases ? (
              <Files {...{ cases, tests, onCaseClick }} />
            ) : (
              <div className={nsClassName(`empty`)}>
                <p>
                  There are no cases yet detected. <br />
                  Please run your application to get some calls feedback!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Style>
  );
};

export const App = styled(AppPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;

  .${nsClassName(`empty`)} {
    text-align: center;
    font-size: 18px;
    font-style: italic;
    font-weight: 200;
    color: grey;
  }

  .buy-me-a-coffee {
    img {
      height: 39px;
      width: 139px;
    }
  }

  .${nsClassName(`top`)} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid magenta;
    position: fixed;
    flex-direction: column;
    width: 100%;
  }

  .${nsClassName(`wrapper-header`)} {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${nsClassName(`header-content`)} {
    max-width: 1100px;
    overflow: hidden;
    flex-grow: 1;
    padding: 10px 20px;
  }

  .${nsClassName(`wrapper-submenu`)} {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${nsClassName(`header`)} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Righteous;
    padding: 0;
    color: magenta;

    h2 {
      font-size: 24px;
    }
  }

  .${nsClassName(`layout`)} {
    display: flex;
    align-items: center;
    justify-content: center;

    &.empty {
      height: 100%;
    }
  }

  .${nsClassName(`main-content`)} {
    max-width: 1100px;
    overflow: hidden;
    flex-grow: 1;
    padding: 70px 20px 20px 20px;
  }

  .${nsClassName(`submenu-content`)} {
    max-width: 1100px;
    overflow: hidden;
    flex-grow: 1;
    padding: 8px 20px;
  }
`;

export default App;

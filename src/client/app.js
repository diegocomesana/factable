import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import storeFactory from "../server/store";
import actions from "../server/store/actions";
import { SocketMessageType, LayoutView } from "../server/common/types";
import { msgWrapper, parseJson } from "./utils";
import Files from "./files";
import CaseView from "./case-view";

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
      // console.log();
      store.initState({
        layoutState: {
          currentView: "cases",
        },
        caseInfo: false,
        ...data.payload,
      });
    }

    if (
      data.type === SocketMessageType.REGISTER_FUNCTION_CALL &&
      data.payload &&
      data.payload.hash
    ) {
      store.dispatch(actions.onRegisterFunctionCall)(data.payload);
    }

    if (data.type === SocketMessageType.CASE_VIEW && data.payload) {
      store.dispatch(actions.onCaseView)(data.payload);
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

  const onCaseClick = ({ e, hash, fileName, functionName }) => {
    e.preventDefault();
    ws.current.send(
      JSON.stringify(msgWrapper(SocketMessageType.ON_CASE_CLICKED, { hash }))
    );
  };

  const onBack = () => {
    store.dispatch(actions.onBack)();
  };

  const { cases, caseInfo, layoutState } = dataStore;

  const isCaseView =
    layoutState && layoutState.currentView === LayoutView.CASE_VIEW && caseInfo;

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <div className={nsClassName(`top`)}>
          <div className={nsClassName(`wrapper-header`)}>
            <div className={nsClassName(`header-content`)}>
              <div className={nsClassName(`header`)}>
                <h2>Factable</h2>
              </div>
            </div>
          </div>
          {isCaseView && (
            <div className={nsClassName(`wrapper-submenu`)}>
              <div className={nsClassName(`submenu-content`)}>
                <button className={`main-btn`} onClick={(e) => onBack()}>
                  {"< Back"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={nsClassName(`layout`)}>
          <div className={classNames(nsClassName(`main-content`))}>
            {isCaseView ? (
              <CaseView {...{ ...caseInfo, onBack }} />
            ) : (
              <Files {...{ cases, onCaseClick }} />
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

  .main-btn {
    border: 2px solid white;
    border-radius: 8px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: white;
    text-align: center;
    font-size: 12px;
    outline: none;
    padding: 4px 8px;
    background-color: transparent;

    &:hover {
      /* border-color: magenta; */
      cursor: pointer;
    }
  }

  .${nsClassName(`top`)} {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    border-bottom: 3px solid magenta;
    position: fixed;
    flex-direction: column;
    width: 100%;
  }

  .${nsClassName(`wrapper-header`)} {
    width: 100%;
    background-color: #222222;
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
    background-color: #555555;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${nsClassName(`header`)} {
    font-family: Righteous;
    padding: 0;
    color: magenta;
    background-color: #222222;
  }

  .${nsClassName(`layout`)} {
    display: flex;
    align-items: center;
    justify-content: center;
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

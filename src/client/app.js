import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import storeFactory from "../server/store";
import actions from "../server/store/actions";
import { SocketMessageType, LayoutView } from "../server/common/types";
import { msgWrapper, parseJson } from "./utils";
import Cases from "./cases";
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
    // console.log("onSocketMessage:", e.data);
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
    const { port } = window.__LOADABLE_CLIENT_CONFIG__;
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

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <div className={nsClassName(`header`)}>
          <h2>Factable</h2>
        </div>
        {layoutState &&
        layoutState.currentView === LayoutView.CASE_VIEW &&
        caseInfo ? (
          <CaseView {...{ ...caseInfo, onBack }} />
        ) : (
          <Cases {...{ cases, onCaseClick }} />
        )}
      </div>
    </Style>
  );
};

export const App = styled(AppPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;

  .${nsClassName(`header`)} {
    font-family: Righteous;
    padding: 8px 12px;
    color: magenta;
    border-bottom: 2px solid magenta;
    background-color: #222222;
  }
`;

export default App;

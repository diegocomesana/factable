import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import storeFactory from "../server/store";
import actions from "../server/store/actions";
import { SocketMessageType } from "../server/common/types";
import { msgWrapper, parseJson } from "./utils";
import File from "./file";

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
    console.log("onSocketMessage:", e.data);
    const data = parseJson(e.data);

    if (!(data && data.type)) {
      return;
    }

    if (
      data.type === SocketMessageType.REGISTER_FUNCTION_CALL &&
      data.payload &&
      data.payload.hash
    ) {
      store.dispatch(actions.onMessage)(data.payload);
    }

    if (data.type === SocketMessageType.INIT && data.payload && !stateInited) {
      setInited(true);
      console.log(data.payload);
      store.initState(data.payload);
    }

    if (data.type === SocketMessageType.CASE_VIEW && data.payload) {
      console.log(data.payload);
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

    console.log("onCaseClick: ", fileName, functionName, hash);
    // console.log("onCaseClick: ", dataStore[fileName][functionName]);
    // console.log("onCaseClick: ", dataStore[fileName][functionName]);
    ws.current.send(
      JSON.stringify(msgWrapper(SocketMessageType.ON_CASE_CLICKED, { hash }))
    );
  };

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <div className={nsClassName(`header`)}>
          <h2>Factable</h2>
        </div>
        <ul className={nsClassName(`list`)}>
          {Object.keys(dataStore).map((key) => (
            <li key={`${key}`} className={nsClassName(`list-item`)}>
              <File
                {...{
                  key,
                  name: key,
                  data: dataStore[key],
                  onCaseClick,
                }}
              />
            </li>
          ))}
        </ul>
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
    padding: 12px 12px 0;
    color: #ad1457;
  }

  .${nsClassName(`list`)} {
    color: #1890ff;
    font-size: 14px;
    margin: 0 8px 8px;
    padding: 10px;
    font-weight: bold;

    list-style: none;
  }

  .${nsClassName(`list-item`)} {
    padding: 0;

    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

export default App;

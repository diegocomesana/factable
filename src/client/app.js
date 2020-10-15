import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import storeFactory from "../server/store";
import actions from "../server/store/actions";
import { SocketMessageType } from "../server/common/types";
import File from "./file";

const namespace = `ui-app`;
const nsClassName = (name) => `${namespace}__${name}`;

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};

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
    if (
      data &&
      data.type &&
      data.type === SocketMessageType.REGISTER_FUNCTION_CALL &&
      data.payload &&
      data.payload.hash
    ) {
      store.dispatch(actions.onMessage)(data.payload);
    }

    if (
      data &&
      data.type &&
      data.type === SocketMessageType.INIT &&
      data.payload &&
      !stateInited
    ) {
      setInited(true);
      store.initState(data.payload);
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

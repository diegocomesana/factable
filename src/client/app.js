import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";
import storeFactory from "../server/store";

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

  const onStateChange = (newState) => {
    setDataStore(newState);
  };

  const onStateGet = () => dataStore;

  const store = storeFactory({ onStateChange, onStateGet });

  const socket = new WebSocket("ws://localhost:8888");

  const onSocketOpen = (e) => {
    console.log("onSocketOpen");
    socket.send("Hello Server!", e.data);
  };

  const onSocketMessage = (e) => {
    const data = parseJson(e.data);
    if (
      data &&
      data.type &&
      data.type === "registerFunctionCall" &&
      data.payload &&
      data.payload.hash
    ) {
      store.onMessage(data.payload);
    }

    if (
      data &&
      data.type &&
      data.type === "init" &&
      data.payload &&
      !stateInited
    ) {
      setInited(true);
      store.initState(data.payload);
    }
  };

  useEffect(() => {
    // Connection opened
    socket.addEventListener("open", onSocketOpen);

    // Listen for messages
    socket.addEventListener("message", onSocketMessage);

    return () => {
      socket.removeEventListener("open", onSocketOpen);
      socket.removeEventListener("message", onSocketMessage);
    };
  }, [dataStore, stateInited]);

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <h1>VAAAAMOS!!</h1>
        <p>Cuenta</p>
        <ul className={nsClassName(`list`)}>
          {Object.keys(dataStore).map((key, i) => {
            return <li key={`${key}`}>{key}</li>;
          })}
        </ul>
      </div>
    </Style>
  );
};

export const App = styled(AppPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;
  /* background-color: orange; */

  .${nsClassName(`list`)} {
    color: #1890ff;
    font-size: 12px;
    margin-right: 10px;
    font-weight: bold;

    list-style: none;

    li {
      background-color: pink;
    }
  }
`;

export default App;

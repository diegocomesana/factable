import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Style from "./style";
import classNames from "classnames";

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
  const [dataStore, setDataStore] = useState({});

  const socket = new WebSocket("ws://localhost:8888");

  const onSocketOpen = (e) => {
    socket.send("Hello Server!");
  };
  const onSocketMessage = (e) => {
    // console.log("Message from server ", e.data);
    const data = parseJson(e.data);
    if (
      data &&
      data.type &&
      data.type === "registerFunctionCall" &&
      data.payload &&
      data.payload.paramsHash
    ) {
      console.log("Message from server ", data.payload);

      const current = dataStore[data.payload.metadata.name] || [];

      setDataStore({
        ...dataStore,
        [data.payload.metadata.name]: [...current, data.payload],
      });

      console.log("dataStore:", dataStore);
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
  }, [dataStore]);

  return (
    <Style>
      <div className={classNames(namespace, className)}>
        <h1>VAAAAMOS!!</h1>
        <p>Cuenta: {dataStore.length}</p>
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

import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-menu`;

const AppPrestyled = ({ className }) => (
  <div className={classNames(namespace, className)}>
    <h1>HOLA!!</h1>
  </div>
);

export const App = styled(AppPrestyled)`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  justify-content: flex-start;
`;

export default App;

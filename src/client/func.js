import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-func`;
const nsClassName = (name) => `${namespace}__${name}`;

const FuncPrestyled = ({ className, name, calls }) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`name`)}>{name}</div>
      <ul className={nsClassName(`calls`)}>
        {calls.map((callHash) => (
          <li key={`${callHash}`}>{callHash}</li>
        ))}
      </ul>
    </div>
  );
};

export const Func = styled(FuncPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;

  .${nsClassName(`name`)} {
    color: #8e44ad;
  }

  .${nsClassName(`calls`)} {
    color: #1890ff;
    font-size: 12px;
    margin: 4px;
    padding: 0;
    font-weight: bold;

    list-style: none;

    li {
      border: solid rgba(215, 40, 40, 0.2) 1px;
      padding: 5px;

      &:not(:last-child) {
        border-bottom: none;
      }
    }
  }
`;

export default Func;

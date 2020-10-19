import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Case from "./case";

const namespace = `ui-func`;
const nsClassName = (name) => `${namespace}__${name}`;

const FuncPrestyled = ({ className, name, calls, fileName, onCaseClick }) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`name`)}>{name}</div>
      <ul className={nsClassName(`calls`)}>
        {calls.map((callHash) => (
          <li key={`${callHash}`} className={nsClassName(`list-item`)}>
            <Case
              {...{
                key: callHash,
                name: callHash,
                hash: callHash,
                fileName,
                functionName: name,
                onCaseClick,
              }}
            />
          </li>
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
    color: black;
    font-weight: bold;
    padding: 5px;
    text-transform: capitalize;
  }

  .${nsClassName(`calls`)} {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .${nsClassName(`list-item`)} {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: stretch;
    border-top: 1px solid magenta;
    background-color: #333333;
    color: white;
  }
`;

export default Func;

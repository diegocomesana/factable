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
    color: #8e44ad;
    padding: 8px 0 0 8px;
  }

  .${nsClassName(`calls`)} {
    color: #1890ff;
    font-size: 12px;
    margin: 4px 4px 4px 4px;
    padding: 0;
    font-weight: bold;

    list-style: none;
  }

  .${nsClassName(`list-item`)} {
    /* border: solid rgba(215, 40, 40, 0.2) 1px; */
    padding: 0;

    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

export default Func;

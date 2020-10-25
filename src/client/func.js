import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Case from "./case";

const namespace = `ui-func`;
const nsClassName = (name) => `${namespace}__${name}`;

const FuncPrestyled = ({
  className,
  name,
  calls,
  tests,
  fileName,
  onCaseClick,
}) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`name`)}>{name}</div>
      <ul className={nsClassName(`calls`)}>
        {Object.keys(calls).map((inputHash) => {
          return (
            <li key={`${inputHash}`} className={nsClassName(`list-item`)}>
              <Case
                {...{
                  inputHash: inputHash,
                  ioHash: inputHash,
                  caseString: calls[inputHash].caseString,
                  outputs: calls[inputHash].outputs,
                  tests,
                  fileName,
                  functionName: name,
                  onCaseClick,
                }}
              />
            </li>
          );
        })}
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
    border-top: 2px solid magenta;
    background-color: #333333;
    color: white;
  }
`;

export default Func;

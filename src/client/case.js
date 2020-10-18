import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-case`;
const nsClassName = (name) => `${namespace}__${name}`;

const CasePrestyled = ({
  className,
  name,
  hash,
  fileName,
  functionName,
  onCaseClick,
}) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`name`)}>{name}</div>
      <div className={nsClassName(`menu`)}>
        <button
          className={nsClassName(`view-btn`)}
          onClick={(e) => onCaseClick({ e, hash, fileName, functionName })}
        >
          view case details
        </button>
      </div>
    </div>
  );
};

export const Case = styled(CasePrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px 4px 6px;
  border: 1px solid transparent;

  &:hover {
    /* border: 1px solid magenta; */

    .${nsClassName(`name`)} {
      /* font-style: bold; */
    }
  }

  .${nsClassName(`name`)} {
    color: #1890ff;
    font-weight: 300;
    font-size: 11px;
    font-style: italic;
  }

  .${nsClassName(`menu`)} {
  }

  .${nsClassName(`view-btn`)} {
    border: 2px solid grey;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: grey;
    text-align: center;
    font-size: 12px;
    outline: none;
    padding: 4px 8px;
    background-color: transparent;
    &:hover {
      border-color: magenta;
      color: magenta;
    }
  }
`;

export default Case;

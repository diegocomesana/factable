import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-case`;
const nsClassName = (name) => `${namespace}__${name}`;

const CasePrestyled = ({ className, name }) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`name`)}>{name}</div>
      <div className={nsClassName(`menu`)}>
        <button className={nsClassName(`view-btn`)}>view case details</button>
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
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: rgba(50, 50, 50, 0.1);
  }

  .${nsClassName(`name`)} {
    color: #1890ff;
    font-weight: 400;
    font-size: 12px;
  }

  .${nsClassName(`menu`)} {
  }

  .${nsClassName(`view-btn`)} {
    box-shadow: inset 0px 1px 0px 0px #ffffff;
    background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-size: 11px;

    padding: 4px 8px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;

    &:hover {
      background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
      background-color: #f6f6f6;
      color: #1890ff;
    }

    &:active {
      position: relative;
      top: 1px;
    }
  }
`;

export default Case;

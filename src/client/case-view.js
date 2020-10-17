import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-case-view`;
const nsClassName = (name) => `${namespace}__${name}`;

const buildInputData = (paramNames, args) => {
  return paramNames.map((name, i) => {
    return {
      name,
      type: args[i].type,
      value: args[i].valueString,
    };
  });
};

const CaseViewPrestyled = ({
  className,
  onBack,
  metadata,
  relativeFilePath,
  args,
}) => {
  const inputData = buildInputData(metadata.params, args);
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`top`)}>
        <button className={nsClassName(`back-btn`)} onClick={(e) => onBack()}>
          {"< Back"}
        </button>
      </div>
      <div className={nsClassName(`name`)}>
        <span className={nsClassName(`function-name`)}>{metadata.name}</span>
        <span className={nsClassName(`relative-file-path`)}>
          {`(${relativeFilePath})`}
        </span>
      </div>
      <ul className={nsClassName(`input`)}>
        {inputData.map(({ name, type, value }) => (
          <li key={`${name}`} className={nsClassName(`input-list-item`)}>
            <div className={nsClassName(`input-names`)}>
              <span className={nsClassName(`input-name`)}>{name}</span>
              <span className={nsClassName(`input-type`)}>{`(${type})`}</span>
            </div>
            <div className={nsClassName(`input-value`)}>{value}</div>
          </li>
        ))}
      </ul>
      {/* <div className={nsClassName(`menu`)}>
        <button
          className={nsClassName(`view-btn`)}
          onClick={(e) => onCaseClick({ e, hash, fileName, functionName })}
        >
          view case details
        </button>
      </div> */}
    </div>
  );
};

export const CaseView = styled(CaseViewPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px 4px 6px;
  /* transition: background-color 0.1s ease-in; */

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    .${nsClassName(`name`)} {
      color: white;
      font-style: bold;
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
    border: 2px solid magenta;
    /* border: none; */
    margin: 0 0.3em 0.3em 0;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: magenta;
    text-align: center;
    /* transition: all 0.2s; */

    font-size: 11px;
    outline: none;
    padding: 4px 8px;
    background-color: transparent;

    &:hover {
      /* background-color: #f6f6f6; */
      border-color: white;
      color: white;
    }
  }
`;

export default CaseView;

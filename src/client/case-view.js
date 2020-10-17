import React from "react";
import styled from "styled-components";
import classNames from "classnames";
// import { prettyPrintString } from "./utils";

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
  output,
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
      <div className={nsClassName(`input`)}>
        <div className={nsClassName(`input-title`)}>{"input"}</div>
        <ul className={nsClassName(`input-value`)}>
          {inputData.map(({ name, type, value }) => (
            <li key={`${name}`} className={nsClassName(`input-list-item`)}>
              <div className={nsClassName(`input-names`)}>
                <span className={nsClassName(`input-name`)}>{name}</span>
                <span className={nsClassName(`input-type`)}>{`(${type})`}</span>
              </div>
              <div className={nsClassName(`input-item-value`)}>
                <pre>
                  <code>{value}</code>
                </pre>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={nsClassName(`output`)}>
        <div className={nsClassName(`output-title`)}>
          {"output"}
          <span
            className={nsClassName(`output-type`)}
          >{`(${output.type})`}</span>
        </div>
        <div className={nsClassName(`output-value`)}>
          <pre>
            <code>{output.valueString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export const CaseView = styled(CaseViewPrestyled)`
  margin: 30px;
  padding: 0;
  display: flex;
  flex-direction: column;

  .${nsClassName(`top`)} {
    padding: 5px 0;
  }

  .${nsClassName(`name`)} {
    padding: 5px 0;
  }

  .${nsClassName(`function-name`)} {
    color: magenta;
  }
  .${nsClassName(`relative-file-path`)} {
    margin-left: 10px;
    font-weight: 400;
    font-style: italic;
    font-size: 12px;
  }

  .${nsClassName(`input`)} {
    border: 2px solid magenta;
    border-radius: 5px;
  }

  .${nsClassName(`input-title`)} {
    font-weight: bold;
    padding: 5px;
    text-transform: capitalize;
  }

  .${nsClassName(`output-title`)} {
    text-transform: capitalize;
  }
  .${nsClassName(`input-value`)} {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .${nsClassName(`input-list-item`)} {
    display: flex;
    align-items: stretch;
    border-top: 2px solid magenta;
  }

  .${nsClassName(`input-names`)} {
    font-size: 13px;
    min-width: 200px;
    max-width: 300px;
    overflow-wrap: break-word;
    text-align: right;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .${nsClassName(`input-name`)} {
    font-size: 14px;
    font-weight: bold;
  }

  .${nsClassName(`input-type`)} {
    margin-left: 6px;
    font-style: italic;
    color: magenta;
  }

  .${nsClassName(`input-item-value`)} {
    background-color: #333333;
    margin: 0;
    font-size: 12px;
    color: white;
    min-height: 30px;
    text-align: left;
    padding: 10px;
    flex-grow: 1;

    code,
    pre {
      margin: 0;
      padding: 0;
    }
  }

  .${nsClassName(`output`)} {
    margin-top: 20px;
    border: 2px solid magenta;
    border-radius: 5px;
  }

  .${nsClassName(`output-title`)} {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 5px;
    text-transform: capitalize;
  }

  .${nsClassName(`output-type`)} {
    margin-left: 6px;
    font-size: 13px;
    font-style: italic;
    font-weight: normal;
    color: magenta;
  }

  .${nsClassName(`output-value`)} {
    border-top: 2px solid magenta;
    background-color: #333333;
    margin: 0;
    font-size: 12px;
    color: white;
    min-height: 30px;
    text-align: left;
    padding: 10px;
    flex-grow: 1;

    code,
    pre {
      margin: 0;
      padding: 0;
    }
  }

  .${nsClassName(`back-btn`)} {
    border: 1px solid magenta;
    margin: 0 0.3em 0.3em 0;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    color: magenta;
    text-align: center;

    font-size: 11px;
    outline: none;
    padding: 4px 8px;
    background-color: transparent;
  }
`;

export default CaseView;

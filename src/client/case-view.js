import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { buildInputData } from "./utils";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ActionsDropdown from "./actions-dropdown";

const namespace = `ui-case-view`;
const nsClassName = (name) => `${namespace}__${name}`;

const getOutputTest = (tests, relativeFilePath, functionName, ioHash) => {
  if (
    tests[relativeFilePath] &&
    tests[relativeFilePath][functionName] &&
    tests[relativeFilePath][functionName][ioHash]
  ) {
    return tests[relativeFilePath][functionName][ioHash];
  }
  return false;
};

const CaseViewPrestyled = ({
  className,
  onTestAction,
  inputInfo: { metadata, relativeFilePath, args },
  outputs,
  tests,
}) => {
  const inputData = buildInputData(metadata.params, args);

  return (
    <div className={classNames(namespace, className)}>
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
      {outputs.length > 1 && (
        <div className={nsClassName(`warning`)}>
          This function registers different outputs from the same input. This
          could mean your function is not pure.
          <br />
          If you have changed the source code recently, discard this warning.
          <br />
          Also, please be aware that factable serializes inputs so complex
          states in inputs are not being taken into account.
        </div>
      )}
      <ul className={nsClassName(`outputs`)}>
        {outputs.map(({ ioHash, output }) => {
          const tested = getOutputTest(
            tests,
            relativeFilePath,
            metadata.name,
            ioHash
          );

          return (
            <li className={nsClassName(`output-list-item`)} key={ioHash}>
              <div className={nsClassName(`output-header`)}>
                <div className={nsClassName(`output-title`)}>
                  {"output"}
                  <span
                    className={nsClassName(`output-type`)}
                  >{`(${output.type})`}</span>
                </div>
                <div className={nsClassName(`test-info`)}>
                  {tested && (
                    <p className={nsClassName(`tested-tag`)}>
                      {"Tested"}
                      <span className={nsClassName(`tested-path`)}>
                        ({tested.testRelativeFilePath})
                      </span>
                    </p>
                  )}
                  <ActionsDropdown
                    onTestAction={({ type, e }) =>
                      onTestAction({ ioHash, type, e })
                    }
                  />
                </div>
              </div>
              <div className={nsClassName(`output-value`)}>
                <pre>
                  <code>{output.valueString}</code>
                </pre>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const CaseView = styled(CaseViewPrestyled)`
  padding-top: 50px;
  margin: 0;
  display: flex;
  flex-direction: column;

  .${nsClassName(`build-test-case-btn`)}.${nsClassName(`build-test-case-btn`)} {
    color: #ff005e;
    border-color: #ff005e;
  }

  .${nsClassName(`tested-tag`)} {
    border: 2px solid #07de5d;
    font-size: 13px;
    color: #04a042;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    line-height: 1.2;
    margin-right: 6px;
  }

  .${nsClassName(`tested-path`)} {
    font-size: 11px;
    margin-left: 5px;
    font-weight: 400;
    font-style: italic;
    display: inline-block;
    padding: 0;
    line-height: 1.2;
  }

  .${nsClassName(`top`)} {
    padding: 5px 0;
    margin-bottom: 10px;
  }

  .${nsClassName(`name`)} {
    font-size: 16px;
    padding: 4px;
    margin-bottom: 10px;
  }

  .${nsClassName(`function-name`)} {
    color: black;
    font-weight: bold;
  }

  .${nsClassName(`relative-file-path`)} {
    margin-left: 10px;
    font-weight: 400;
    font-style: italic;
    font-size: 12px;
    color: magenta;
  }

  .${nsClassName(`input`)} {
    border: 2px solid magenta;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .${nsClassName(`input-title`)} {
    font-weight: bold;
    padding: 5px;
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
    align-items: flex-start;
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
    overflow: auto;
    max-height: 400px;
    code,
    pre {
      font-family: monospace;
      color: white;
      font-size: 11px;
      margin: 0;
      padding: 0;
    }
  }

  .${nsClassName(`outputs`)} {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .${nsClassName(`output-list-item`)} {
    margin-bottom: 15px;
    border: 2px solid magenta;
    border-radius: 5px;
  }

  .${nsClassName(`output-header`)} {
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: space-between;
    padding: 5px;
  }

  .${nsClassName(`output-title`)} {
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
    overflow: auto;
    code,
    pre {
      font-family: monospace;
      color: white;
      font-size: 11px;
      margin: 0;
      padding: 0;
    }
  }

  .${nsClassName(`warning`)} {
    background-color: #ff005e;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    color: white;
    font-size: 13px;
    font-weight: 300;
    text-align: center;
  }

  .${nsClassName(`test-info`)} {
    display: flex;
    align-items: center;
  }
`;

export default CaseView;

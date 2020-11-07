import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const namespace = `ui-case`;
const nsClassName = (name) => `${namespace}__${name}`;

// const getTestedFromOutputs = (outputs, tests) =>
//   Object.keys(outputs)
//     .map((outputHash) => !!tests[outputs[outputHash].ioHash])
//     .find((elem) => elem);

const getCaseDescriptionsFromOutputs = (outputs, tests) =>
  Object.keys(outputs)
    .map((outputHash) => tests[outputs[outputHash].ioHash])
    .filter((elem) => elem)
    .map((elem) => elem.caseDescription)
    .join(" | ");

const CasePrestyled = ({
  className,
  caseString,
  inputHash,
  fileName,
  functionName,
  outputs,
  onCaseClick,
  tests,
}) => {
  const caseDescriptionsFromOutputs = getCaseDescriptionsFromOutputs(
    outputs,
    tests
  );
  const finalCaseString = caseDescriptionsFromOutputs || caseString;
  return (
    <div
      className={classNames(namespace, className)}
      onClick={(e) => onCaseClick({ e, inputHash, fileName, functionName })}
    >
      <div className={nsClassName(`caseString`)}>{finalCaseString}</div>
      {caseDescriptionsFromOutputs && (
        <div className={nsClassName(`tested-tag`)}>tested</div>
      )}
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
  cursor: pointer;

  &:hover {
    border: 1px solid magenta;

    .${nsClassName(`caseString`)} {
    }
  }

  .${nsClassName(`caseString`)} {
    font-weight: 300;
    font-size: 11px;
    padding: 6px;
    font-family: monospace;
  }

  .${nsClassName(`tested-tag`)} {
    border: 2px solid #07de5d;
    font-size: 11px;
    color: #07de5d;
    border-radius: 4px;
    padding: 4px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
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

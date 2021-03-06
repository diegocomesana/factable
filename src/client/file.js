import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Func from "./func";

const namespace = `ui-file`;
const nsClassName = (name) => `${namespace}__${name}`;

const FilePrestyled = ({ className, name, data, tests, onCaseClick }) => {
  return (
    <div className={classNames(namespace, className)}>
      <div className={nsClassName(`filename`)}>{name}</div>
      <ul className={nsClassName(`functions`)}>
        {Object.keys(data).map((key) => (
          <li key={`${key}`} className={nsClassName(`list-item`)}>
            <Func
              {...{
                key,
                name: key,
                calls: data[key].calls,
                tests: tests[key] || {},
                onCaseClick,
                fileName: name,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const File = styled(FilePrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;

  .${nsClassName(`filename`)} {
    margin: 6px 0 2px 6px;
    font-weight: 400;
    /* font-style: italic; */
    font-size: 12px;
    color: magenta;
    font-size: 14px;
  }

  .${nsClassName(`functions`)} {
    list-style: none;
    border: 2px solid magenta;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 0;
    margin: 0;
  }

  .${nsClassName(`list-item`)} {
    border-bottom: 2px solid magenta;
    &:last-child {
      border-bottom: none;
    }
  }
`;

export default File;

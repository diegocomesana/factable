import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Func from "./func";

const namespace = `ui-file`;
const nsClassName = (name) => `${namespace}__${name}`;

const FilePrestyled = ({ className, name, data }) => {
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
    color: magenta;
    margin-left: 4px;
    font-style: italic;
  }

  .${nsClassName(`functions`)} {
    color: #1890ff;
    font-size: 12px;
    margin: 4px;
    padding: 0;
    font-weight: bold;
    list-style: none;
  }

  .${nsClassName(`list-item`)} {
    border: solid rgba(0, 0, 0, 0.15) 1px;
    padding: 12px 6px 1px 12px;

    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

export default File;

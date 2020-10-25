import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import File from "./file";

const namespace = `ui-files`;
const nsClassName = (name) => `${namespace}__${name}`;

const FilesPrestyled = ({ className, cases, tests, onCaseClick }) => {
  return (
    <div className={classNames(namespace, className)}>
      <ul className={nsClassName(`list`)}>
        {cases &&
          Object.keys(cases).map((key) => (
            <li key={`${key}`} className={nsClassName(`list-item`)}>
              <File
                {...{
                  key,
                  name: key,
                  data: cases[key],
                  tests: tests[key] || {},
                  onCaseClick,
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export const Files = styled(FilesPrestyled)`
  width: 100%;
  margin: 0;
  padding: 0;

  .${nsClassName(`list`)} {
    color: #1890ff;
    font-size: 14px;
    padding: 0;
    margin: 0;
    font-weight: bold;

    list-style: none;
  }

  .${nsClassName(`list-item`)} {
    padding: 0;

    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

export default Files;

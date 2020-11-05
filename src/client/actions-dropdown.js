import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { TestAction } from "../server/common/types";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const namespace = `ui-dropdown`;
const nsClassName = (name) => `${namespace}__${name}`;

const ActionsDropdownPrestyled = ({ className, onTestAction }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropDown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={classNames(namespace, className)}>
      <Dropdown isOpen={dropdownOpen} toggle={dropDown}>
        <DropdownToggle className={nsClassName(`toggle`)} caret>
          Test File Actions
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            {...{
              className: nsClassName(`item`),
              onClick: (e) => onTestAction({ e, type: TestAction.BUILD }),
            }}
          >
            Build Test File
          </DropdownItem>
          <DropdownItem
            {...{
              className: nsClassName(`item`),
              onClick: (e) => onTestAction({ e, type: TestAction.DISCARD }),
            }}
          >
            Discard Test File
          </DropdownItem>
          <DropdownItem
            {...{
              className: nsClassName(`item`),
              onClick: (e) => onTestAction({ e, type: TestAction.EDIT }),
            }}
          >
            Edit Test File
          </DropdownItem>
          <DropdownItem
            {...{
              className: nsClassName(`item`),
              onClick: (e) => onTestAction({ e, type: TestAction.EJECT }),
            }}
          >
            Eject Test File
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const ActionsDropdown = styled(ActionsDropdownPrestyled)`
  /* padding-top: 50px;
  margin: 0;
  display: flex;
  flex-direction: column; */

  .${nsClassName(`toggle`)} {
    padding: 3px 8px;
    font-size: 12px;
  }
  .${nsClassName(`item`)} {
    padding: 3px 8px;
    font-size: 12px;
  }
`;

export default ActionsDropdown;

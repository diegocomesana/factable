import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { TestAction } from "../server/common/types";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const namespace = `ui-test-case-modal`;
const nsClassName = (name) => `${namespace}__${name}`;

const TestCaseModalPrestyled = ({
  className,
  visible = false,
  caseInfo,
  ioHash,
  type,
  onConfirm,
  onDismiss,
  inputs,
  onDescriptionChange,
}) => {
  const hasData = Boolean(ioHash && caseInfo && inputs);
  if (!hasData) {
    return null;
  }

  const isOpen = visible && hasData;

  const { description } = inputs;

  const getContentByType = (type) => {
    const obj = {
      [TestAction.BUILD]: {
        headerText: `Create test for ${caseInfo.inputInfo.metadata.name}`,
        confirmText: `Build test`,
        dismissText: `Cancel`,
        body: (
          <Input
            type="text"
            placeholder="Write the test description"
            value={description}
            onChange={onDescriptionChange}
          />
        ),
      },
      [TestAction.EDIT]: {
        headerText: `Edit test for ${caseInfo.inputInfo.metadata.name}`,
        confirmText: `Edit test`,
        dismissText: `Cancel`,
        body: (
          <Input
            type="text"
            placeholder="Write the test description"
            value={description}
            onChange={onDescriptionChange}
          />
        ),
      },
      [TestAction.DISCARD]: {
        headerText: `Discard test for ${caseInfo.inputInfo.metadata.name}`,
        confirmText: `Discard test`,
        dismissText: `Cancel`,
        body: <p>{`Are you sure you want to discard the test?`}</p>,
      },
    };

    return obj[type];
  };

  const content = getContentByType(type);

  return (
    <div className={classNames(namespace, className)}>
      <Modal
        {...{
          className: nsClassName(`modal`),
          backdrop: true,
          keyboard: true,
          isOpen,
          fade: false,
        }}
      >
        <ModalHeader className={nsClassName(`header`)}>
          {content.headerText}
        </ModalHeader>
        <ModalBody>{content.body}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onConfirm({ ioHash, type })}>
            {content.confirmText}
          </Button>
          <Button color="secondary" onClick={() => onDismiss({ ioHash, type })}>
            {content.dismissText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const TestCaseModal = styled(TestCaseModalPrestyled)`
  .${nsClassName(`header`)} {
    background-color: pink;
    /* .modal-title.modal-title {
      font-size: 18px;
      color: orange;
    } */
  }
`;

export default TestCaseModal;

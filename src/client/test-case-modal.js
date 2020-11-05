import React from "react";
import styled from "styled-components";
import classNames from "classnames";
// import { buildInputData } from "./utils";

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
  // const inputData = buildInputData(metadata.params, args);
  const hasData = Boolean(ioHash && caseInfo && inputs);
  if (!hasData) {
    return null;
  }

  const isOpen = visible && hasData;

  const { description } = inputs;

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
        <ModalHeader
          className={nsClassName(`header`)}
        >{`Create teset for ${caseInfo.inputInfo.metadata.name}`}</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Write the test description"
            value={description}
            onChange={onDescriptionChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onConfirm({ ioHash, type })}>
            {"Build Test"}
          </Button>
          <Button color="secondary" onClick={() => onDismiss({ ioHash, type })}>
            {"Cancel"}
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

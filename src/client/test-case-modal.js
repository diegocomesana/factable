import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { buildInputData } from "./utils";

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

  console.log("MODAL: ", ioHash, caseInfo);
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
          fade: true,
        }}
      >
        <ModalHeader>{`Create teset for ${caseInfo.inputInfo.metadata.name}`}</ModalHeader>
        <ModalBody>
          <Input
            type="textarea"
            placeholder="Write the test description"
            rows={5}
            value={description}
            onChange={onDescriptionChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onConfirm({ ioHash, type })}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={() => onDismiss({ ioHash, type })}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const TestCaseModal = styled(TestCaseModalPrestyled)`
  /* padding-top: 50px;
  margin: 0;
  display: flex;
  flex-direction: column;

  .${nsClassName(`input-type`)} {
    margin-left: 6px;
    font-style: italic;
    color: magenta;
  } */
`;

export default TestCaseModal;

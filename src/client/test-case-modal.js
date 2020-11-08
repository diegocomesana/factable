import React, { useEffect, createRef } from "react";
// import styled from "styled-components";
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

const TestCaseModal = ({
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

  const modalRef = createRef(null);

  const onRefCallback = (el) => {
    if (el) {
      el.focus();
    }
  };

  const isOpen = visible && hasData;

  const { description } = inputs;

  const getContentByType = (type, onRefCallback) => {
    const obj = {
      [TestAction.BUILD]: {
        headerText: `Create test for ${caseInfo.inputInfo.metadata.name}`,
        confirmText: `Build test`,
        dismissText: `Cancel`,
        body: (
          <Input
            innerRef={onRefCallback}
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
            innerRef={onRefCallback}
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

  const content = getContentByType(type, onRefCallback);

  return (
    <>
      <div className={nsClassName(`modal`)} ref={modalRef}></div>
      <Modal
        {...{
          className: nsClassName(`modal`),
          backdrop: true,
          keyboard: false,
          isOpen,
          fade: false,
          centered: true,
          autoFocus: false,
          unmountOnClose: true,
          zIndex: 9999,
          container: modalRef,
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
    </>
  );
};

export default TestCaseModal;

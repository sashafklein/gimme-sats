import React, { useState } from "react";
import styled from "styled-components";

import API from "../../../api";
import { Context, Actions } from "../../../types";

import {
  ModalActions,
  ModalBody,
  ModalContent,
  NumberInput,
  TextArea,
  H2,
  ActionButton,
  ModalHeader,
  H1,
  P,
} from "./ModalContent";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

/**
 *
 * Takes user input, and creates invoice.
 */
const InputModalContent = (props: { context: Context; actions: Actions }) => {
  const { context, actions } = props;
  const {
    fixedAmount,
    fixedNote,
    defaultAmount,
    defaultNote,
    to,
    note,
    amount,
  } = context;
  const [amountApproved, setAmountApproved] = useState(!!fixedAmount);
  const [noteApproved, setNoteApproved] = useState(!!fixedNote);
  const [amountString, setAmountString] = useState(
    (fixedAmount || defaultAmount)?.toFixed(2) || "0.00"
  );

  const api = new API(context, actions);

  const reg = new RegExp(/^\d*\.{0,1}\d{0,2}$/);
  const handleNumInput = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { value } = event.target as HTMLInputElement;

    // Only change text if it matches basic numerical regex w two decimals
    if (reg.test(value)) {
      // Get rid of any extra leading zeros
      const newAmountStr = value.replace(/^0+\d+/, (match: string) =>
        match.slice(1)
      );

      // Update internal number-string to maintain text consistency
      if (newAmountStr !== amountString) {
        setAmountString(newAmountStr);
      }

      // Also update the numerical value if it changed
      if (parseFloat(newAmountStr) !== amount) {
        actions.update({
          amount: parseFloat(newAmountStr),
        });
      }
    }
  };

  const PrimaryButton = () => {
    if (!amountApproved) {
      return (
        <ActionButton
          tone="med"
          onClick={() => setAmountApproved(true)}
          disabled={!amount}
        >
          Next
        </ActionButton>
      );
    } else if (!noteApproved) {
      return (
        <ActionButton
          tone="med"
          onClick={() => setNoteApproved(true)}
          disabled={!note?.length}
        >
          Next
        </ActionButton>
      );
    } else {
      return (
        <ActionButton tone="med" onClick={api.getInvoiceAndUpdateApp}>
          Get invoice
        </ActionButton>
      );
    }
  };

  return (
    <ModalContent>
      <ModalHeader>
        <H1>Pay {to}</H1>
      </ModalHeader>
      <ModalBody>
        {fixedAmount || amountApproved ? (
          <>
            <H2>${amountString}</H2>
          </>
        ) : (
          <>
            <H2>Enter an amount</H2>
            <Row style={{ marginLeft: -20 }}>
              <H2 style={{ marginRight: "10px" }}>$</H2>
              <NumberInput
                value={amountString}
                onChange={handleNumInput}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && amount !== 0) {
                    setAmountApproved(true);
                  }
                }}
              />
            </Row>
          </>
        )}
        {amountApproved ? (
          noteApproved ? (
            <P>{note}</P>
          ) : (
            <>
              <H2>Add a note</H2>
              <TextArea
                value={note || defaultNote}
                onChange={({ target }) =>
                  actions.update({ note: target.value })
                }
              />
            </>
          )
        ) : null}
      </ModalBody>
      <ModalActions>
        <PrimaryButton />
        <ActionButton tone="light" onClick={actions.reset}>
          Cancel
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default InputModalContent;

import React, { useState } from "react";
import styled from "styled-components";

import API from "../../../api";
import { Context, Actions } from "../../../types";
import { getSettings } from "../../../utils";

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
  const settings = getSettings(context);
  const { to, displayName, note, amount, amountIsFixed, noteIsFixed } =
    settings;

  const [flowStep, setFlowStep] = useState(
    [amount, note].findIndex((el) => !el)
  );

  if (noteIsFixed && !note?.length) {
    throw new Error(
      "Bad settings: 'noteIsFixed' was set to true with empty note."
    );
  }

  if (amountIsFixed && !amount) {
    throw new Error(
      "Bad settings: 'amountIsFixed' was set to true with empty amount."
    );
  }

  const regressFlow = () => setFlowStep(flowStep - 1);
  const progressFlow = () => setFlowStep(flowStep + 1);

  const [amountString, setAmountString] = useState((amount || 0).toFixed(2));

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
        actions.updateSettings({
          amount: parseFloat(newAmountStr),
        });
      }
    }
  };

  const PrimaryButton = () => {
    const options = { children: "Next", disabled: false, onClick: () => {} };

    if (flowStep === 0) {
      options.disabled = !amount;
      options.onClick = progressFlow;
    } else if (flowStep === 1) {
      options.disabled = !note?.length;
      options.onClick = noteIsFixed ? api.getInvoiceAndUpdateApp : progressFlow;
      options.children = noteIsFixed ? "Get invoice" : "Next";
    } else {
      options.children = "Get invoice";
      options.onClick = api.getInvoiceAndUpdateApp;
    }

    return <ActionButton tone="med" {...options} />;
  };

  const BackButton = () => {
    const options = {
      children: "Back",
      onClick: regressFlow,
    };

    if (flowStep === 0) {
      options.onClick = actions.reset;
      options.children = "Cancel";
    }

    return <ActionButton tone="light" {...options} />;
  };

  const amountInput = amountIsFixed ? (
    <H2>${amountString}</H2>
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
              progressFlow();
            }
          }}
        />
      </Row>
    </>
  );

  const noteInput =
    noteIsFixed || flowStep === 2 ? (
      <>
        <H2>${amountString}</H2>
        <P>{note}</P>
      </>
    ) : (
      <>
        <H2>${amountString}</H2>
        <H2>Add a note</H2>
        <TextArea
          value={note}
          onChange={({ target }) =>
            actions.updateSettings({ note: target.value })
          }
        />
      </>
    );

  return (
    <ModalContent>
      <ModalHeader>
        <H1>Pay {displayName || to}</H1>
      </ModalHeader>
      <ModalBody>{flowStep === 0 ? amountInput : noteInput}</ModalBody>
      <ModalActions>
        <PrimaryButton />
        <BackButton />
      </ModalActions>
    </ModalContent>
  );
};

export default InputModalContent;

import React, { useState } from "react";

import { NOTE_INPUT } from "../../../const";
import { Context, Actions } from "../../../types";
import { getSettings } from "../../../utils";

import {
  ModalActions,
  ModalBody,
  ModalContent,
  NumberInput,
  H2,
  ActionButton,
  ModalHeader,
  H1,
  Row,
} from "./ModalContent";

/**
 *
 * First modal stage - enter an input
 */
const AmountInputModal = (props: { context: Context; actions: Actions }) => {
  const { context, actions } = props;
  const settings = getSettings(context);
  const { to, displayName, amount, amountIsFixed } = settings;

  if (amountIsFixed && !amount) {
    throw new Error(
      "Bad settings: 'amountIsFixed' was set to true with empty amount."
    );
  }

  const [amountString, setAmountString] = useState((amount || 0).toFixed(2));

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

  return (
    <ModalContent>
      <ModalHeader>
        <H1>Pay {displayName || to}</H1>
      </ModalHeader>
      <ModalBody>
        <>
          <H2>{amountIsFixed ? `$${amountString}` : "Enter an amount"}</H2>
          {amountIsFixed ? null : (
            <Row style={{ marginLeft: -20 }}>
              <H2 style={{ marginRight: "10px" }}>$</H2>
              <NumberInput
                value={amountString}
                onChange={handleNumInput}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && amount !== 0) {
                    actions.updateSettings({ stage: NOTE_INPUT });
                  }
                }}
              />
            </Row>
          )}
        </>
      </ModalBody>
      <ModalActions>
        <ActionButton
          tone="med"
          disabled={!amount}
          onClick={() => actions.updateSettings({ stage: NOTE_INPUT })}
        >
          Next
        </ActionButton>
        <ActionButton tone="light" onClick={actions.reset}>
          Cancel
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default AmountInputModal;

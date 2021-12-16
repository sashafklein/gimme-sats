import API from "../../../api";
import { AMOUNT_INPUT } from "../../../const";
import { Context, Actions } from "../../../types";
import { getSettings } from "../../../utils";

import {
  ModalActions,
  ModalBody,
  ModalContent,
  TextArea,
  H2,
  ActionButton,
  ModalHeader,
  H1,
  P,
  Row,
  LargeText,
} from "./ModalContent";

/**
 *
 * Second modal stage - enter a note
 */
const NoteInputModal = (props: { context: Context; actions: Actions }) => {
  const { context, actions } = props;
  const settings = getSettings(context);
  const { to, displayName, note, amount, amountIsFixed, noteIsFixed } =
    settings;

  if (noteIsFixed && !note?.length) {
    throw new Error(
      "Bad settings: 'noteIsFixed' was set to true with empty note."
    );
  }

  const api = new API(context, actions);

  return (
    <ModalContent>
      <ModalHeader>
        <H1>Pay {displayName || to}</H1>
      </ModalHeader>
      <ModalBody>
        {noteIsFixed ? (
          <>
            <H2>${(amount || 0).toFixed(2)}</H2>
            <P>{note}</P>
          </>
        ) : (
          <>
            <Row>
              <H2 style={{ marginRight: "10px" }}>$</H2>
              <LargeText>{(amount || 0).toFixed(2)}</LargeText>
            </Row>
            <H2>Add a note</H2>
            <TextArea
              value={note}
              onChange={({ target }) =>
                actions.updateSettings({ note: target.value })
              }
            />
          </>
        )}
      </ModalBody>
      <ModalActions>
        <ActionButton
          tone="dark"
          disabled={!note?.length}
          onClick={api.getInvoiceAndUpdateApp}
        >
          Get invoice
        </ActionButton>
        <ActionButton
          tone="light"
          onClick={
            amountIsFixed
              ? actions.reset
              : () => actions.updateSettings({ stage: AMOUNT_INPUT })
          }
        >
          {amountIsFixed ? "Cancel" : "Back"}
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default NoteInputModal;

import { Context, Actions } from "../../../types";
import { getSettings } from "../../../utils";
import Checkmark from "./Checkmark";

import {
  ModalActions,
  ModalContent,
  ModalBody,
  ActionButton,
  ModalHeader,
  H1,
  H3,
} from "./ModalContent";

const PaidModal = (props: { context: Context; actions: Actions }) => {
  const { context, actions } = props;
  const settings = getSettings(context);
  const { amount } = settings;
  return (
    <ModalContent>
      <ModalHeader>
        <H1>Invoice paid!</H1>
        <H3>${amount}</H3>
      </ModalHeader>
      <ModalBody>
        <Checkmark />
      </ModalBody>

      <ModalActions>
        <ActionButton tone="light" onClick={actions.reset}>
          Done
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default PaidModal;

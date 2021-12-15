import { Actions } from "../../../types";
import {
  ModalContent,
  ModalBody,
  ModalActions,
  ModalHeader,
  H1,
  H3,
  P,
  ActionButton,
} from "./ModalContent";

const ErrorModal = (props: { actions: Actions }) => {
  const { actions } = props;
  return (
    <ModalContent>
      <ModalHeader>
        <H1>Uh oh</H1>
      </ModalHeader>
      <ModalBody>
        <H3>Something went wrong!</H3>
        <P>See the console for details.</P>
      </ModalBody>
      <ModalActions>
        <ActionButton tone="light" onClick={actions.reset}>
          Cancel
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default ErrorModal;

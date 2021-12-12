import React, { ReactChild } from "react";

import { INPUT, INVOICE, EXPIRED, PAID, LOADING } from "../../const";
import GMSContext from "../GMSContext";
import { Actions, Context } from "../../types";

import InputModal from "./content/InputModal";
import InvoiceModal from "./content/InvoiceModal";
import { ModalScreen, ModalWindow, ModalCard } from "./content/ModalContent";
import LoadingModal from "./content/LoadingModal";
import ErrorModal from "./content/ErrorModal";
import PaidModal from "./content/PaidModal";

const isDescendant = (child: HTMLElement, parentClass: string) => {
  let node = child.parentNode as HTMLElement | null;
  while (node != null) {
    if (node.classList && node.classList.contains(parentClass)) {
      return true;
    }
    node = node.parentNode as HTMLElement;
  }
  return false;
};

const ModalContainer = (props: { children: ReactChild }) => {
  return (
    <GMSContext.Consumer>
      {(queryProps) => {
        const { context, actions }: { context: Context; actions: Actions } =
          queryProps;
        const { children } = props;

        const stage = context.stage as string;
        const show = !!stage;
        console.log(stage, context);

        const Content =
          {
            [INPUT]: InputModal,
            [LOADING]: LoadingModal,
            [INVOICE]: InvoiceModal,
            [EXPIRED]: InvoiceModal,
            [PAID]: PaidModal,
          }[stage] || (() => null);

        const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
          // If the click was not within the card, close the modal.
          if (!isDescendant(event.target as HTMLElement, "gms__card")) {
            actions.reset();
          }
        };

        return (
          <>
            <ModalWindow show={show} className="gms__window">
              <ModalScreen
                show={show}
                onClick={closeModal}
                className="gms__screen"
              >
                <ModalCard show={show} className="gms__card">
                  <Content context={context} actions={actions} />
                </ModalCard>
              </ModalScreen>
            </ModalWindow>
            {children}
          </>
        );
      }}
    </GMSContext.Consumer>
  );
};

export default ModalContainer;

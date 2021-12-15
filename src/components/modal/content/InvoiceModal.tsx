import { useEffect } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";

import API from "../../../api";
import { EXPIRED } from "../../../const";
import { Context, Actions, Invoice } from "../../../types";
import { getSettings } from "../../../utils";

import {
  ModalActions,
  ModalContent,
  ModalBody,
  ActionButton,
  ModalHeader,
  H1,
  P,
} from "./ModalContent";

const QRWrap = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? "white" : "white")};
  padding: 20px;
  border-radius: 10px;
`;

const Expired = styled.div`
  width: 180px;
  height: 180px;
  background-color: black;
  border-radius: 5px;
`;

const InvoiceModal = (props: { context: Context; actions: Actions }) => {
  const { context, actions } = props;
  const settings = getSettings(context);
  const { amount, note, stage } = settings;
  const { invoice } = context;
  const api = new API(context, actions);

  const { secondsLeft, lnInvoice } = invoice as Invoice;

  // TODO: Toggle to Onchain
  const invoiceString = lnInvoice;

  useEffect(() => {
    let timerInterval: NodeJS.Timer;

    if (stage === EXPIRED) {
      // @ts-ignore
      clearInterval(timerInterval);
    } else {
      timerInterval = setInterval(() => {
        api.checkForPaymentAndUpdateApp();
      }, 1000);
    }

    // Clean up interval timer on unmount
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <ModalContent>
      <ModalHeader>
        <H1>${amount}</H1>
        <P>{note}</P>
      </ModalHeader>
      <ModalBody>
        <QRWrap>
          {stage === EXPIRED ? (
            <Expired />
          ) : (
            <QRCode value={invoiceString} size={180} />
          )}
        </QRWrap>
        <P>{stage === EXPIRED ? "Expired" : `Expires in ${secondsLeft}`}</P>
      </ModalBody>

      <ModalActions>
        <ActionButton
          tone="med"
          onClick={
            stage === EXPIRED
              ? api.getInvoiceAndUpdateApp
              : () => navigator.clipboard.writeText(invoiceString)
          }
        >
          {stage === EXPIRED ? "Refresh" : "Copy"}
        </ActionButton>
        <ActionButton tone="light" onClick={actions.reset}>
          Cancel
        </ActionButton>
      </ModalActions>
    </ModalContent>
  );
};

export default InvoiceModal;

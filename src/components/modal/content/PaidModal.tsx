import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";

import API from "../../../api";
import { EXPIRED } from "../../../const";
import { Context, Actions, ColorTheme, Invoice } from "../../../types";
import Checkmark from "./Checkmark";

import {
  ModalActions,
  ModalContent,
  ModalBody,
  ActionButton,
  ModalHeader,
  H1,
  P,
  H3,
  H2,
} from "./ModalContent";

const PaidModal = (props: { context: Context, actions: Actions }) => {
  const { context, actions } = props;
  const {
    amount,
    note,
  } = context;
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

import axios from "axios";
import { EXPIRED, INVOICE, LOADING, PAID } from "./const";
import { Invoice, Context, Actions } from "./types";

import { STRIKE } from "./const";

interface ApiInterface {
  getInvoice(): Promise<Invoice>;
  checkForPayment(): Promise<Invoice>;
}

const secondsToExpireEarly = 2;

class Strike implements ApiInterface {
  static path = (subpath: string) =>
    `https://api.zaphq.io/api/v0.4/public/${subpath}`;
  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  _invoice() {
    return this.context.invoice as Invoice;
  }

  getInvoice = async () => {
    const { to, note } = this.context;
    const amount = this.context.amount as number;
    const includeOnchainAddress = amount >= 10;
    const body = {
      note,
      includeOnchainAddress,
      amount: {
        currency: "USD",
        amount: amount.toFixed(2),
      },
    };

    const { data } = await axios.post(Strike.path(`users/${to}/pay`), body);
    return Promise.resolve({
      lnInvoice: data.lnInvoice,
      secondsLeft: data.expirySecond - secondsToExpireEarly,
      btcInvoice: data.onchainAddress,
      invoiceId: data.quoteId,
    });
  };

  checkForPayment = async () => {
    const { data } = await axios.get(
      Strike.path(`receive/${this._invoice().invoiceId}`)
    );

    return Promise.resolve({
      ...this._invoice(),
      secondsLeft: data.expirySecond - secondsToExpireEarly,
      status: data.result === "PAID" ? PAID : undefined,
    });
  };
}

const APIs = {
  [STRIKE]: Strike,
};

class API {
  api: ApiInterface;
  actions: Actions;
  context: Context;

  constructor(context: Context, actions: Actions) {
    this.api = API.getInstance(context);
    this.actions = actions;
    this.context = context;
  }

  getInvoiceAndUpdateApp = () => {
    this.actions.update({ stage: LOADING });
    return this.api.getInvoice().then((invoice: Invoice) => {
      this.actions.update({ invoice, stage: INVOICE });
    });
  };

  checkForPaymentAndUpdateApp = () => {
    this.api.checkForPayment().then((invoice: Invoice) => {
      const newContext = {
        ...this.context,
        invoice,
      };

      if (invoice.secondsLeft <= 0) {
        newContext.stage = EXPIRED;
      }

      if (invoice.status === PAID) {
        newContext.stage = PAID;
      }

      this.actions.update(newContext);
    });
  };

  static getInstance = (context: Context) => {
    const { service } = context;

    // @ts-ignore
    const ApiClass = APIs[service];

    if (!ApiClass) {
      throw new Error(`No such API service: ${service}`);
    }

    const api: ApiInterface = new ApiClass(context);

    return api;
  };
}
export default API;

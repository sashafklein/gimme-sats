import axios from "axios";
import { EXPIRED, INVOICE, LOADING, PAID } from "./const";
import { Invoice, Context, Actions } from "./types";

import { STRIKE } from "./const";
import { getSettings } from "./utils";

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
    const settings = getSettings(this.context);
    const { to, note } = settings;
    const amount = settings.amount as number;
    const includeOnchainAddress = amount >= 10;
    const body = {
      description: note,
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
    this.actions.updateSettings({ stage: LOADING });
    return this.api.getInvoice().then((invoice: Invoice) => {
      this.actions.update({
        invoice,
        settings: { ...this.context.settings, stage: INVOICE },
        globalSettings: this.context.globalSettings,
      });
    });
  };

  checkForPaymentAndUpdateApp = () => {
    this.api.checkForPayment().then((invoice: Invoice) => {
      let stage = this.context.settings.stage;
      if (invoice.secondsLeft <= 0) {
        stage = EXPIRED;
      }

      if (invoice.status === PAID) {
        stage = PAID;
      }

      const newContext = {
        invoice,
        settings: {
          ...this.context.settings,
          stage,
        },
        globalSettings: this.context.globalSettings,
      };

      this.actions.update(newContext);
      this.actions.onPayment(newContext);
    });
  };

  static getInstance = (context: Context) => {
    const settings = getSettings(context);
    const { service } = settings;

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

import { EXPIRED, INVOICE, LOADING, PAID } from "../const";
import { Invoice, Context, Actions } from "../types";

import { STRIKE } from "../const";
import { getSettings } from "../utils";

// import Strike from "./Strike";
import BaseApi from "./base";
import Mock from "./Mock";

const APIs = {
  [STRIKE]: Mock, // Strike,
};

class API {
  api: BaseApi;
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

    const api: BaseApi = new ApiClass(context);

    return api;
  };
}

export default API;

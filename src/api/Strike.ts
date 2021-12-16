import axios from "axios";
import BaseApi from "./base";
import { PAID } from "../const";

export default class Strike extends BaseApi {
  _basePath = () => "https://api.zaphq.io/api/v0.4/public";

  getInvoice = async () => {
    const settings = this._settings();
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

    const { data } = await axios.post(this._path(`users/${to}/pay`), body);
    return Promise.resolve({
      lnInvoice: data.lnInvoice,
      secondsLeft: data.expirySecond - BaseApi.secondsToExpireEarly,
      btcInvoice: data.onchainAddress,
      invoiceId: data.quoteId,
    });
  };

  checkForPayment = async () => {
    const { data } = await axios.get(
      this._path(`receive/${this._invoice().invoiceId}`)
    );

    return Promise.resolve({
      ...this._invoice(),
      secondsLeft: data.expirySecond - BaseApi.secondsToExpireEarly,
      status: data.result === "PAID" ? PAID : undefined,
    });
  };
}

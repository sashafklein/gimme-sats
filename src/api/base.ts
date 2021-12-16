import { Context, Invoice, Settings } from "../types";
import { getSettings } from "../utils";

export default class BaseApi {
  static secondsToExpireEarly = 2;
  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  _path = (subpath: string): string => [this._basePath(), subpath].join("/");

  _invoice = (): Invoice => {
    return this.context.invoice as Invoice;
  };

  _settings = (): Settings => {
    return getSettings(this.context);
  };

  _basePath = (): string => {
    this._implementError("getInvoice");
    return "";
  };

  _implementError = (methodName: string) => {
    throw new Error(
      `Not Implemented: ${methodName} method must be defined in BaseApi subclasses.`
    );
  };

  getInvoice = (overload?: any): Promise<Invoice> => {
    this._implementError("getInvoice");
    return Promise.resolve(this._invoice());
  };

  checkForPayment = (overload?: any): Promise<Invoice> => {
    this._implementError("checkForPayment");
    return Promise.resolve(this._invoice());
  };
}

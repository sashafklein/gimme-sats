export interface Invoice {
  /** Lightning invoice string. */
  lnInvoice: string;
  /** Onchain Bitcoin invoice string (if given). */
  btcInvoice?: string;
  /** Seconds until the invoice will be considered expired. */
  secondsLeft: number;
  /** Unique API identifier for the invoice. API-specific. */
  invoiceId: string;
  /** Status of the invoice. Usually undefined or 'PAID' */
  status?: string;
}

export interface Settings {
  /** Amount to charge. If pre-set, can be 'fixed' or malleable. */
  amount?: number;
  /** If true, amount is not changeable by user. */
  amountIsFixed?: Boolean;
  /** Charge note. Can be 'fixed' or malleable. */
  note?: string;
  /** If true, note is not alterable by user. */
  noteIsFixed?: Boolean;
  /** Identifier of payment recipient. Varies based on service. */
  to?: string;
  /** Name to show in place of 'to' value. */
  displayName?: string;
  /** Service. API service for generating invoice and receiving payment. Default: STRIKE. */
  service?: string;
  /** Color theme for the button and modal. */
  theme?: ColorTheme;
  /** Stage of the purchase flow. Must be one of the constants included in this repository. */
  stage?: string;
}

export interface Context {
  /** A settings object defining most features of the payment interface. */
  settings: Settings;
  /** Optional callback run on successful payment. Given context and actions as arguments. */
  onPayment?(context: Context, actions: Actions): Function;
  /** An invoice object received from the API. */
  invoice?: Invoice;
  /** Any setting can be applied globally, and overwritten by the triggering button. */
  globalSettings: Settings;
}

export type Actions = {
  reset: () => void;
  updateSettings(settings: Settings): () => void;
  updateInvoice(invoice: Invoice): () => void;
  onPayment(context: Context): () => any;
  update(context: Context): () => any;
};

export interface ColorTheme {
  dark: string;
  light: string;
  med: string;
  accent: string;
  isDark: Boolean;
}

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

export interface IncompleteContext {
  /** Amount set prior to button click, which user cannot override. */
  fixedAmount?: number;
  /** Note set prior to button click, which user cannot override. */
  fixedNote?: string;
  /** Amount populating the numerical input when the modal opens. Can be overriden */
  defaultAmount?: number;
  /** Note populating the text input when the modal opens. Can be overriden. */
  defaultNote?: string;
  /** The active amount the user will pay (or has paid), in dollars. */
  amount?: number;
  /** The current payment note. */
  note?: string;
  /** Identifying string for recipient. Varies by API service. */
  to?: string;
  /** API service name. Must be one of the constants included in this repository. */
  service?: string,
  /** Optional callback run on successful payment. Given context and actions as arguments. */
  onPayment?(context: Context, actions: Actions): Function;
  /** Stage of the purchase flow. Must be one of the constants included in this repository. */
  stage?: string;
  /** Color theme for the button and modal. */
  theme?: ColorTheme;
  /** An invoice object received from the API. */
  invoice?: Invoice
}

export interface Context extends IncompleteContext {
  /** Identifying string for recipient. Varies by API service. */
  to: string;
  /** API service name. Must be one of the constants included in this repository. */
  service: string,
}

export type Actions = {
  reset: () => {};
  update(arg0?: object): () => {};
}

export interface ColorTheme {
  dark: string;
  light: string;
  med: string;
  accent: string;
  isDark: Boolean;
}
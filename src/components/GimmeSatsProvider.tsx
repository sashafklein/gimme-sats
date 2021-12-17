import { ReactChild, useState } from "react";
import { ThemeProvider } from "styled-components";

import { log } from "../utils";
import { DARK_BLUE, STRIKE, THEME_REQUIREMENTS, THEMES } from "../const";
import { Actions, Context, Invoice, Settings } from "../types";

import GMSContext from "./GMSContext";
import ModalContainer from "./modal/ModalContainer";

interface Props {
  /** The single React component to render within this context. (Your app) */
  children: ReactChild;
  settings?: Settings;
  onPayment?: Function;
}

const GimmeSatsProvider = (props: Props) => {
  const { children, settings = {}, onPayment = () => {} } = props;
  const globalSettings = {
    theme: THEMES[DARK_BLUE],
    service: STRIKE,
    note: "",
    amount: 0,
    // Override these defaults with explicit global settings
    ...settings,
  };

  const [context, setContext] = useState({
    globalSettings,
    settings: {},
  } as Context);

  // try {
  const theme = context.settings.theme || context.globalSettings.theme;
  const missingReqs = THEME_REQUIREMENTS.filter(
    // @ts-ignore
    (key) => theme[key] === undefined
  );
  if (!theme || missingReqs.length) {
    throw new Error(
      `Bad GimmeSats Theme. Does not include all requirements.
          Missing: ${missingReqs.join(" ")}`
    );
  }

  const updateSettings = (changes = {}) => {
    log("ACTION - updateSettings");
    setContext({
      ...context,
      settings: {
        ...context.settings,
        ...changes,
      },
    });
  };

  const updateInvoice = (changes = {} as Invoice) => {
    const newContext = {
      ...context,
      invoice: {
        ...(context.invoice || {}),
        ...changes,
      },
    };
    log("ACTION - updateInvoice");
    setContext(newContext);
  };

  const reset = () => {
    log("ACTION - reset");
    setContext({
      globalSettings: context.globalSettings,
      settings: {},
    });
  };

  const update = (context: Context) => {
    log("ACTION - update");
    setContext(context);
  };

  const actions = {
    updateSettings,
    updateInvoice,
    reset,
    onPayment,
    update,
  } as Actions;

  const value = {
    context,
    actions,
  };

  return (
    <GMSContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <ModalContainer>{children}</ModalContainer>
      </ThemeProvider>
    </GMSContext.Provider>
  );
  // } catch (err) {
  //   console.log(
  //     "Error in GimmeSatsProvider",
  //     err,
  //     `Settings: ${JSON.stringify(settings, null, 2)}`
  //   );
  //   return <>{children}</>;
  // }
};

export default GimmeSatsProvider;

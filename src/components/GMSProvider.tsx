import { ReactChild, useState } from "react";
import { ThemeProvider } from "styled-components";

import { DARK_BLUE, STRIKE, THEME_REQUIREMENTS, THEMES } from "../const";
import { Actions, ColorTheme, Context } from "../types";

import GMSContext from "./GMSContext";
import ModalContainer from "./modal/ModalContainer";

const validateAndDefault = (context: Context) => {
  context.service = context.service || STRIKE;
  context.note = context.note || "";

  if (context.fixedAmount && !context.amount) {
    context.amount = context.fixedAmount;
  }

  if (context.defaultAmount && !context.amount) {
    context.amount = context.defaultAmount;
  }

  if (context.fixedNote && !context.note) {
    context.note = context.fixedNote;
  }

  if (context.defaultNote && !context.note) {
    context.note = context.defaultNote;
  }

  return context;
};

interface Props {
  /** The single React component to render within this context. (Your app) */
  children: ReactChild;
  /** An object of type ColorTheme. Either a provided theme or a custom object of identical shape. */
  theme?: ColorTheme;
  /** One of the acceptable API Service types. (Currently, just Strike). */
  service?: string;
  /** The unique identifier of the payee in the given service. */
  to: string;
  /** Any additional global defaults for a GimmeSats button. */
  defaults?: Context;
}

const GMSProvider = (props: Props) => {
  const {
    children,
    theme = THEMES[DARK_BLUE],
    service = STRIKE,
    defaults,
    to,
  } = props;
  const fullDefaults = {
    ...(defaults || {}),
    service,
    to,
    theme,
  };
  const missingReqs = THEME_REQUIREMENTS.filter(
    // @ts-ignore
    (key) => theme[key] === undefined
  );
  if (!theme || missingReqs.length) {
    throw new Error(
      `Bad GMS Theme. Does not include all requirements.
        Missing: ${missingReqs.join(" ")}`
    );
  }

  const [context, setContext] = useState(fullDefaults as Context);

  const update = (changes = {}) => {
    setContext(
      validateAndDefault({
        ...context,
        ...changes,
      })
    );
  };

  const reset = () => setContext({ service: context.service, to: context.to });

  const actions = {
    update,
    reset,
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
};

export default GMSProvider;

import { ReactChild, useState } from "react";
import { ThemeProvider } from "styled-components";

import { DARK_BLUE, STRIKE, THEME_REQUIREMENTS } from "../const";
import { Actions, ColorTheme, Context } from "../types";

import GMSContext from "./GMSContext";
import ModalContainer from "./modal/ModalContainer";

const validateAndDefault = (context: Context) => {
  context.service = context.service || STRIKE;
  context.note = context.note || "";

  if (context.fixedAmount && !context.amount) {
    context.amount = context.fixedAmount;
  }

  if (context.fixedNote && !context.note) {
    context.note = context.fixedNote;
  }

  return context;
};

interface Props {
  children: ReactChild;
  theme?: ColorTheme;
  service: string;
  to: string;
  defaults?: Context;
}

const themes = {
  [DARK_BLUE]: {
    dark: "#050c3e",
    med: "#040e5c",
    light: "#326fbb",
    isDark: true,
  },
};

const GMSProvider = (props: Props) => {
  const {
  children,
  theme = themes[DARK_BLUE],
  service,
  defaults,
  to,
} = props;
  const fullDefaults = {
    ...(defaults || {}),
    service,
    to,
  };
  // @ts-ignore
  const missingReqs = THEME_REQUIREMENTS.filter((key) => !theme[key]);
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

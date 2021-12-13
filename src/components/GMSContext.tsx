import React from "react";
import { Actions, Context } from "../types";

export const GMSContext = React.createContext({
  context: {} as Context,
  actions: {
    update: (arg1?: object) => {},
    reset: () => {},
  } as Actions,
});

export default GMSContext;

import { Context, Settings } from "./types";

export const getSettings = (context: Context) => {
  return {
    ...context.globalSettings,
    ...context.settings,
  } as Settings;
};

export const log = (...messages: any[]) => {
  if (window.location.href.includes("localhost")) {
    console.log(...messages);
  }
};

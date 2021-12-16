import { ColorTheme } from "./types";

// Stages of payment
export const AMOUNT_INPUT = "AMOUNT_INPUT";
export const NOTE_INPUT = "NOTE_INPUT";
export const LOADING = "LOADING";
export const INVOICE = "INVOICE";
export const EXPIRED = "EXPIRED";
export const PAID = "PAID";

export const STAGES = {
  AMOUNT_INPUT,
  NOTE_INPUT,
  LOADING,
  INVOICE,
  EXPIRED,
  PAID,
};

// Color Themes
export const DARK_BLUE = "dark-blue";
export const WHITE = "white";

export const THEMES = {
  [DARK_BLUE]: {
    dark: "#050c3e",
    med: "#021281",
    light: "#5ca0f5",
    accent: "#fed954",
    isDark: true,
    name: DARK_BLUE,
  } as ColorTheme,
  [WHITE]: {
    dark: "#181818",
    med: "#5e5e74",
    light: "white",
    accent: "#ff1a40",
    isDark: false,
    name: WHITE,
  } as ColorTheme,
};

export const THEME_NAMES = Object.keys(THEMES);

export const THEME_REQUIREMENTS = ["light", "med", "dark", "accent", "isDark"];

// API Services
export const STRIKE = "STRIKE";

export const SERVICES = {
  STRIKE,
};

import * as constants from "./const";
import { default as Provider } from "./components/GMSProvider";
import {
  GimmeSatsJustBolt as GMSSmall,
  default as GMS,
} from "./components/GimmeSats";

import Bolt from "./components/icons/Bolt";

export const ICONS = {
  Bolt,
};

export const THEMES = constants.THEMES;
export const SERVICES = constants.SERVICES;
export const STAGES = constants.STAGES;
export const GimmeSatsJustBolt = GMSSmall;
export const GimmeSats = GMS;
export const GMSPRovider = Provider;

import * as constants from "./const";
import { default as Provider } from "./components/GMSProvider";
import {
  GimmeSatsWithBolt as GMSWithBolt,
  GimmeSatsSmall as GMSSmall,
  default as GMS,
} from "./components/GimmeSats";

import Bolt from "./components/icons/Bolt";

export const ICONS = {
  Bolt,
};

export const THEMES = constants.THEMES;
export const SERVICES = constants.SERVICES;
export const STAGES = constants.STAGES;
export const GimmeSatsWithBolt = GMSWithBolt;
export const GimmeSatsSmall = GMSSmall;
export const GimmeSats = GMS;
export const GMSPRovider = Provider;

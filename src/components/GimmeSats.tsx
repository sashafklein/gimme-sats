import { ReactChild, ReactElement } from "react";
import styled, { StyledComponent } from "styled-components";

import { INPUT } from "../const";
import { ColorTheme, Settings } from "../types";

import GMSContext from "./GMSContext";
import Button from "./Button";
import Bolt from "./icons/Bolt";

const SvgButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends Settings {
  children?: ReactChild;
  /** Whether the button should be light dark or mid of the given theme. */
  tone?: string;
  /** Styles the button alone, not the triggered modal. */
  buttonTheme?: ColorTheme;
  /** Settings to launch with, overrides global settings. */
  settings?: Settings;
  /** Whether to show a lightning bolt icon. */
  icon?: ReactElement;
  /** Component to render, which triggers on click. */
  ButtonEl?: StyledComponent<any, any>;
}

/**
 * This component renders a button, which, on click, generates a payment "modal" in a "lightbox".
 * This payment modal allows for user interaction, shows a QR code for lightning payment,
 * and confirms payment automatically.
 */
const GimmeSats = (props: Props) => {
  const {
    tone,
    settings,
    buttonTheme,
    children = "Gimme Sats",
    icon = <Bolt width={10} style={{ marginLeft: 15 }} fill="#ffe37c" />,
    ButtonEl = Button,
  } = props;

  return (
    <GMSContext.Consumer>
      {({ actions, context }) => {
        const finalSettings = {
          ...context.globalSettings,
          ...(settings || {}),
        };

        return (
          <ButtonEl
            tone={tone || "dark"}
            theme={buttonTheme || finalSettings.theme}
            onClick={() => {
              actions.updateSettings({
                stage: INPUT,
                ...finalSettings,
              });
            }}
          >
            <SvgButtonContent>
              {children}
              {icon}
            </SvgButtonContent>
          </ButtonEl>
        );
      }}
    </GMSContext.Consumer>
  );
};

const SmallButton = styled(Button)`
  padding: 9px 12px;
  border-radius: 14px;
`;

export const GimmeSatsJustBolt = (props: Props) => (
  <GimmeSats
    {...props}
    children=""
    ButtonEl={SmallButton}
    icon={<Bolt width={12} fill="#ffe37c" />}
  />
);

export default GimmeSats;

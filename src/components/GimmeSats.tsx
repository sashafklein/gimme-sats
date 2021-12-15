import { ReactChild } from "react";
import styled from "styled-components";

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
  tone?: string;
  buttonTheme?: ColorTheme;
  settings?: Settings;
}

const DefaultChild = () => (
  <SvgButtonContent>
    Gimme Sats
    <Bolt width={10} style={{ marginLeft: 15 }} fill="#ffe37c" />
  </SvgButtonContent>
);

/**
 * This component renders a button, which, on click, generates a payment "modal" in a "lightbox".
 * This payment modal allows for user interaction, shows a QR code for lightning payment,
 * and confirms payment automatically.
 */
const GimmeSats = (props: Props) => {
  const { tone, settings, buttonTheme } = props;

  return (
    <GMSContext.Consumer>
      {({ actions, context }) => {
        const finalSettings = {
          ...context.globalSettings,
          ...(settings || {}),
        };

        return (
          <Button
            tone={tone || "dark"}
            isDark={tone !== "light"}
            theme={buttonTheme || finalSettings.theme}
            onClick={() => {
              actions.updateSettings({
                stage: INPUT,
                ...finalSettings,
              });
            }}
          >
            {props.children || <DefaultChild />}
          </Button>
        );
      }}
    </GMSContext.Consumer>
  );
};

export const GimmeSatsWithBolt = (props: Props) => (
  <GimmeSats {...props}>
    <SvgButtonContent>
      {props.children}
      <Bolt
        width={10}
        style={{ marginLeft: props.children ? 15 : 0 }}
        fill="#ffe37c"
      />
    </SvgButtonContent>
  </GimmeSats>
);

export const GimmeSatsSmall = styled(GimmeSats)`
  padding: 5px;
`;

export default GimmeSats;

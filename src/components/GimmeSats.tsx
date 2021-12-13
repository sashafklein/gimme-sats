import { ReactChild } from "react";
import styled from "styled-components";

import GMSContext from "./GMSContext";
import Button from "./Button";
import { INPUT } from "../const";
import { ColorTheme, IncompleteContext } from "../types";
import Bolt from "./icons/Bolt";

const SvgButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends IncompleteContext {
  children?: ReactChild;
  tone?: string;
  theme?: ColorTheme;
}

/**
 * This component renders a button, which, on click, generates a payment "modal" in a "lightbox".
 * This payment modal allows for user interaction, shows a QR code for lightning payment,
 * and confirms payment automatically.
 */
const GimmeSats = (props: Props) => {
  const { tone, theme } = props;
  const succinctProps = Object.keys(props).reduce(
    (obj, key) =>
      // @ts-ignore
      props[key] === undefined
        ? obj
        : // @ts-ignore
          { ...obj, [key]: props[key] },
    {}
  );

  return (
    <GMSContext.Consumer>
      {({ actions, context }) => {
        const DefaultChild = () => (
          <SvgButtonContent>
            Gimme Sats
            <Bolt
              width={10}
              style={{ marginLeft: 15 }}
              fill={context?.theme?.accent || "#ffe37c"}
            />
          </SvgButtonContent>
        );

        return (
          <Button
            tone={tone || "dark"}
            isDark={tone !== "light"}
            theme={theme}
            onClick={() => {
              actions.update({
                stage: INPUT,
                ...succinctProps,
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
        fill={"#ffe37c"}
      />
    </SvgButtonContent>
  </GimmeSats>
);

export const GimmeSatsSmall = styled(GimmeSats)`
  padding: 5px;
`;

export default GimmeSats;

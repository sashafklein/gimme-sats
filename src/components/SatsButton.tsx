import React from "react";
import { string, number, bool, oneOf, node, object, func } from "prop-types";
import GMSContext from "./GMSContext";
import Button from "./Button";
import { INPUT } from "../const";

/**
 * This component renders a button, which, on click, generates a payment "modal" in a "lightbox".
 * This payment modal allows for user interaction, shows a QR code for lightning payment,
 * and confirms payment automatically.
 */
const SatsButton = ({ children = "Gimme Sats", ...props }) => {
  return (
    <GMSContext.Consumer>
      {({ actions }) => {
        return (
          <Button
            tone="dark"
            isDark
            onClick={() => {
              actions.update({
                stage: INPUT,
                ...props,
              });
            }}
          >
            {children}
          </Button>
        );
      }}
    </GMSContext.Consumer>
  );
};

export default SatsButton;

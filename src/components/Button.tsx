import { darken, lighten, desaturate, complement } from "polished";
import styled from "styled-components";
import { ColorTheme } from "../types";

const Button = (props: any) => {
  const { tone, disabled } = props;

  const Btn = styled.button`
    width: 100%;
    max-width: 200px;
    padding: 15px 25px;
    border-radius: 10px;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s ease;
    ${({ theme }) => {
      const bg = theme[tone]
      const polarize = tone === 'light' ? lighten : darken;
      const disabledStart = tone === 'light' ? darken(0.2, bg) : lighten(0.2, bg);
      const disabledBg = desaturate(0.4, disabledStart);

      return `
        background-color: ${disabled ? disabledBg : bg};
        cursor: ${disabled ? "not-allowed" : "pointer"};

        &:hover {
          background-color: ${disabled ? disabledBg : polarize(0.03, bg)};
        }
      `
    }}
  `;

  // @ts-ignore
  return <Btn {...props} />;
};

export default Button;

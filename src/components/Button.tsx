import { darken, lighten, desaturate } from "polished";
import styled from "styled-components";

const Btn = styled.button`
  padding: 15px 25px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`;

const Button = styled(Btn)<{ tone: string; isDark: Boolean }>`
  ${(props) => {
    // @ts-ignore
    const { tone, disabled, theme } = props;

    const bg = theme[tone];
    const polarize = tone === "light" ? lighten : darken;
    const disabledStart = tone === "light" ? darken(0.2, bg) : lighten(0.2, bg);
    const disabledBg = desaturate(0.7, disabledStart);

    return `
      background-color: ${disabled ? disabledBg : bg};
      cursor: ${disabled ? "not-allowed" : "pointer"};
      color: ${tone === "light" ? "black" : "white"};

      &:hover {
        background-color: ${disabled ? disabledBg : polarize(0.02, bg)};
      }
    `;
  }}
`;

export default Button;

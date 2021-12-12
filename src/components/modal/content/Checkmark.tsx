import styled, { keyframes } from "styled-components";
import { ColorTheme } from "../../../types";

// Taken from https://stackoverflow.com/questions/41078478/css-animated-checkmark

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fill = (theme: ColorTheme) => keyframes`
  100% {
    box-shadow: inset 0px 0px 0px 80px ${theme.accent};
  }
`;

const CheckmarkCircle = styled.circle`
  stroke-dasharray: 216;
  stroke-dashoffset: 216;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: ${({ theme }) => theme.accent};
  fill: none;
  animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CheckmarkSvg = styled.svg`
  width: 106px;
  height: 106px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px ${({ theme }) => theme.accent};
  animation: ${({ theme }) => fill(theme)} 0.4s ease-in-out 0.4s forwards,
    ${scale} 0.3s ease-in-out 0.9s both;
`;

const CheckmarkCheck = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 98;
  stroke-dashoffset: 98;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;

const Checkmark = () => (
  <CheckmarkSvg
    className="gms__checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    <CheckmarkCircle
      className="checkmark__circle"
      cx="26"
      cy="26"
      r="25"
      fill="none"
    />
    <CheckmarkCheck
      className="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </CheckmarkSvg>
);

export default Checkmark;

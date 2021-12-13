import { lighten } from "polished";
import styled, { keyframes, StyledComponent } from "styled-components";
import Button from "../../Button";

// Adds a className to an element,
// To make it easier to debug and override styles
const namedEl =
  (className: string, StyledDiv: StyledComponent<any, any>) => (props: any) =>
    <StyledDiv className={`gms__${className}`} {...props} />;

export const ModalWindow = namedEl(
  "modal-window",
  styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    top: 0;
    left: 0;
    pointer-events: ${({ show }: { show: Boolean }) => (show ? "all" : "none")};
  `
);

export const ModalScreen = namedEl(
  "modal-screen",
  styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background-color 0.4s ease;
    position: absolute;
    background-color: rgba(
      0,
      0,
      0,
      ${({ show }: { show: Boolean }) => (show ? "0.8" : "0")}
    );
  `
);

export const ModalCard = namedEl(
  "modal-card",
  styled.div`
    width: 90%;
    height: 80%;
    max-width: 400px;
    min-height: 500px;
    border-radius: 20px;
    background-color: ${({ theme }) =>
      theme.isDark ? theme.dark : theme.light};
    padding: 20px;
    cursor: auto;
    transition: opacity 0.3s ease;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
    opacity: ${({ show }: { show: Boolean }) => (show ? 1 : 0)};
  `
);

export const ModalContent = namedEl(
  "modal-content",
  styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  `
);

export const ModalBody = namedEl(
  "modal-body",
  styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
);

export const ModalActions = namedEl(
  "modal-actions",
  styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  `
);

export const ModalHeader = namedEl(
  "modal-header",
  styled.div`
    height: 150px;
    text-align: center;
  `
);

export const NumberInput = styled.input`
  padding: 20px;
  border-radius: 10px;
  width: 150px;
  font-size: 50px;
  max-width: 100%;
  border: none;
  text-align: center;
  font-weight: bold;
  border: 6px solid transparent;
  border-color: ${({ theme }) => (theme.isDark ? "transparent" : "black")};
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;
  max-width: 100%;
  border: none;
  margin-top: 10px;
  border: 6px solid transparent;
  border-color: ${({ theme }) => (theme.isDark ? "transparent" : "black")};
`;

export const H1 = styled.h1`
  font-size: 38px;
  font-weight: bold;
  color: ${({ theme }) => (theme.isDark ? "white" : "black")};
`;

export const H2 = styled.h2`
  color: ${({ theme }) => (theme.isDark ? "white" : "black")};
`;

export const H3 = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => (theme.isDark ? "white" : "black")};
`;

export const P = styled.p`
  color: ${({ theme }) => (theme.isDark ? "white" : "black")};
  font-size: 18px;
`;

export const ActionButton = styled(Button)`
  margin: 10px 0;
  min-width: 200px;
  max-width: 100%;
` as StyledComponent<any, any>;

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

const SpinnerContainer = namedEl(
  "spinner-container",
  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `
);

export const Spinner = namedEl(
  "spinner",
  styled.div`
    width: 40px;
    height: 40px;
    border: 5px solid
      ${({ theme }) => (theme.isDark ? theme.light : theme.dark)};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
  `
);

export const Loader = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

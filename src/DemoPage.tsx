import { useState } from "react";
import styled from "styled-components";
import GimmeSats from "./components/GimmeSats";

import GMSProvider from "./components/GMSProvider";
import Bolt from "./components/icons/Bolt";
import Github from "./components/icons/Github";
import { DARK_BLUE, WHITE, THEMES } from "./const";
import { ColorTheme } from "./types";

const Section = styled.section`
  width: 100vw;
`;

const Container = styled.div`
  height: 100%;
  padding: 150px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-weight: bold;
  font-size: 60px;
`;

const Subtitle = styled.h2`
  font-size: 35px;
`;

const DarkSection = styled(Section)`
  background-color: #02021c;
`;

const LightSection = styled(Section)`
  background-color: white;
`;

const DarkTitle = styled(Title)`
  color: black;
`;

const LightTitle = styled(Title)`
  color: white;
`;

const DarkSubtitle = styled(Subtitle)`
  color: black;
`;

const LightSubtitle = styled(Subtitle)`
  color: white;
`;

const ContentDiv = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const Header = styled.header`
  height: 100px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #050c3e;
  color: white;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-style: italic;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: color 1s ease;

  &:hover {
    color: #fffbec;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: white;
  margin-bottom: 40px;
`;

const CheckboxDiv = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  border: 2px solid white;
  border-radius: 5px;

  &.ticked {
    background-color: white;
  }
`;

const Inline = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Checkbox = ({ ticked }: { ticked: Boolean }) => (
  <CheckboxDiv className={ticked ? "ticked" : ""} />
);

interface Options {
  fixedAmount: Boolean;
  fixedNote: Boolean;
  defaultAmount: Boolean;
  defaultNote: Boolean;
  theme: Boolean;
  to: Boolean;
}

const tickedOptionStart: Options = {
  fixedAmount: false,
  fixedNote: false,
  defaultAmount: false,
  defaultNote: false,
  theme: false,
  to: false,
};

const alternates = {
  fixedAmount: 20,
  fixedNote: "Fixed: You can't change me",
  defaultAmount: 5,
  defaultNote: "Default: Change away",
  theme: THEMES[WHITE],
  to: "niko",
};

const DemoPage = () => {
  // @ts-ignore
  const [tickedOptions, setTickedOptions] = useState(tickedOptionStart);
  const options = Object.keys(tickedOptions).reduce((obj, key) => {
    // @ts-ignore
    return { ...obj, [key]: tickedOptions[key] ? alternates[key] : undefined };
  }, {});

  // @ts-ignore
  const theme = options.theme || (THEMES[DARK_BLUE] as ColorTheme);

  return (
    <GMSProvider to="sasha" theme={theme}>
      <div>
        <Header>
          <LogoLink href="https://gimmesats.com">
            <h1>Gimme Sats</h1>
            <Bolt
              width={20}
              fill="#ffe37c"
              style={{ marginTop: 2, marginLeft: 15 }}
            />
          </LogoLink>
        </Header>

        <LightSection>
          <Container>
            <DarkTitle>Dead-simple Lighting payment</DarkTitle>
            <DarkSubtitle>
              A library for simply integrating Lightning payment into React
            </DarkSubtitle>
            <ContentDiv>
              <h2 style={{ marginBottom: 40 }}>Give it a try!</h2>
              <GimmeSats />
            </ContentDiv>
          </Container>
        </LightSection>

        <DarkSection>
          <Container>
            <LightTitle>Fully customizable</LightTitle>
            <LightSubtitle>
              Easily set defaults, themes, and fixed amounts or notes
            </LightSubtitle>
            <ContentDiv>
              <h2 style={{ marginBottom: 40, color: "white" }}>
                Tick the boxes to edit component options and customize the
                payment flow for the below GimmeSats button:
              </h2>
              <div style={{ padding: "20px 0", marginBottom: 20 }}>
                {Object.keys(tickedOptions).map((key) => (
                  <CheckboxContainer
                    onClick={() => {
                      setTickedOptions({
                        ...tickedOptions,
                        // @ts-ignore
                        [key]: !tickedOptions[key],
                      });
                    }}
                  >
                    {/* @ts-ignore */}
                    <Checkbox ticked={tickedOptions[key]} />
                    {key}
                  </CheckboxContainer>
                ))}
              </div>
              <GimmeSats tone="light" {...options} theme={THEMES[WHITE]} />
            </ContentDiv>
          </Container>
        </DarkSection>

        <LightSection>
          <Container>
            <DarkTitle>Open-source and service-agnostic</DarkTitle>
            <DarkSubtitle>
              Accepts payment from any Lightning wallet. Soon to invoice using the service of your choice
            </DarkSubtitle>
            <ContentDiv>
              <Inline style={{ marginBottom: 20 }}>
                <a
                  target="_blank"
                  href="https://github.com/sashafklein/gimme-sats"
                  style={{ color: "black" }}
                >
                  <h2>Check the project out on Github</h2>
                </a>
                <Github width={30} style={{ marginLeft: 10 }} />
              </Inline>
              <Inline>
                <h2 style={{ marginRight: 10 }}>
                  {" "}
                  Appreciate the work? You can always
                </h2>
                <GimmeSats />
              </Inline>
            </ContentDiv>
          </Container>
        </LightSection>
      </div>
    </GMSProvider>
  );
};

export default DemoPage;

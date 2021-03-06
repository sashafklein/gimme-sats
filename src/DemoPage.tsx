import { useState } from "react";
import styled from "styled-components";
import GimmeSats, { GimmeSatsJustBolt } from "./components/GimmeSats";

import GimmeSatsProvider from "./components/GimmeSatsProvider";
import Bolt from "./components/icons/Bolt";
import Github from "./components/icons/Github";
import { DARK_BLUE, WHITE, THEMES } from "./const";
import { Settings } from "./types";

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

const alternates = {
  amount: 5,
  note: "Prefilled note",
  amountIsFixed: true,
  noteIsFixed: true,
  theme: THEMES[WHITE],
  to: "niko",
  displayName: "my brother!",
} as Settings;

const DemoPage = () => {
  const [tickedOptions, setTickedOptions] = useState({});

  const options: Settings = Object.keys(tickedOptions)
    // @ts-ignore
    .filter((k) => tickedOptions[k])
    // @ts-ignore
    .reduce((o, k) => ({ ...o, [k]: alternates[k] }), {});

  const theme = THEMES[DARK_BLUE];

  return (
    <GimmeSatsProvider settings={{ to: "sasha", theme }}>
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
              A library for simply integrating Lightning payment into React apps
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
                {Object.keys(alternates).map((key) => (
                  <CheckboxContainer
                    key={key}
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
              <GimmeSats
                tone="light"
                settings={options}
                buttonTheme={options.theme}
              />
            </ContentDiv>
          </Container>
        </DarkSection>

        <LightSection>
          <Container>
            <DarkTitle>Open-source and service-agnostic</DarkTitle>
            <DarkSubtitle>
              Accepts payment from any Lightning wallet. Soon to invoice using
              the service of your choice
            </DarkSubtitle>
            <ContentDiv>
              <Inline style={{ marginBottom: 20 }}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/sashafklein/gimme-sats"
                  style={{ color: "black" }}
                >
                  <h2>Check the project out on Github</h2>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/sashafklein/gimme-sats"
                  style={{ color: "black" }}
                >
                  <Github width={30} style={{ marginLeft: 10 }} />
                </a>
              </Inline>
              <Inline>
                <h2 style={{ marginRight: 10 }}> Like this tool?</h2>
                <GimmeSatsJustBolt
                  children=""
                  settings={{ note: "Tip for GimmeSats!", amount: 5 }}
                />
              </Inline>
            </ContentDiv>
          </Container>
        </LightSection>
      </div>
    </GimmeSatsProvider>
  );
};

export default DemoPage;

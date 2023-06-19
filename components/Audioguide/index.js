import styled from "styled-components";

const flags = [
  {
    name: "deutsch",
    language: "de",
    icon: "🇩🇪",
  },
  {
    name: "english",
    language: "en",
    icon: "🇬🇧",
  },
  {
    name: "français",
    language: "fr",
    icon: "🇫🇷",
  },
  {
    name: "español",
    language: "es",
    icon: "🇪🇸",
  },
  {
    name: "portugués",
    language: "pt",
    icon: "🇵🇹",
  },
];

export default function Audioguide({ onClick }) {
  return (
    <>
      <StyledMainContainer>
        {flags.map((flag) => {
          return (
            <StyledDivContainer key={flag.language} onClick={onClick}>
              <StyledFlag>{flag.icon}</StyledFlag>
              <StyledName>{flag.name}</StyledName>
            </StyledDivContainer>
          );
        })}
      </StyledMainContainer>
    </>
  );
}

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDivContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
`;

const StyledFlag = styled.span`
  font-size: 5em;
  margin-bottom: -0.2em;
`;

const StyledName = styled.span`
  font-size: 1.5em;
`;

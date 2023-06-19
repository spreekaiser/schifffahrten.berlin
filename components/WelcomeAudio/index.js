import styled from "styled-components";
import Button from "../Button";

export default function WelcomeAudio({ audio, onClick }) {
  console.log("audio: ", audio.language);

  var headline = "";
  var buttonContent = "";

  switch (audio.language) {
    case "de":
      buttonContent = "zurück";
      headline = "Willkommen an Bord";
      break;
    case "en":
      buttonContent = "back";
      headline = "Welcome on board";
      break;
    case "fr":
      buttonContent = "retour";
      headline = "Bienvenue à bord";
      break;
    case "es":
      buttonContent = "atrás";
      headline = "Bienvenida a bordo";
      break;
    case "pt":
      buttonContent = "para trás";
      headline = "Bem-vindos a bordo";
      break;
  }

  return (
    <>
      <Button onClick={onClick}>{buttonContent}</Button>
      <StyledHeadline>{headline}</StyledHeadline>
    </>
  );
  s;
}

const StyledHeadline = styled.h3`
  text-align: center;
  margin: 1.5em 0;
`;

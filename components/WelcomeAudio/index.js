import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Image from "next/image";
import welcomeImage from "../../public/images/welcomeImage.jpeg";
import lang from "@/resources/data/language.json";
import locationPositioning from "../../public/getGeolocation.js";

export default function WelcomeAudio({ audio, onClick }) {
  // console.log("audio: ", audio.language);
  // console.log("lang: ", lang);

  locationPositioning();

  return (
    <>
      <StyledButton onClick={onClick}>
        {lang[audio.language].buttonContent}
      </StyledButton>
      <StyledHeadline>{lang[audio.language].headline}</StyledHeadline>
      <StyledImage
        // src="/images/welcomeImage.jpeg"
        src={welcomeImage}
        width={300}
        height={500}
        alt="Boat trip in Berlin"
      />
      <audio autoPlay src={`/audios/welcomeAudio_${audio.language}.m4a`} />
    </>
  );
}

const StyledHeadline = styled.h2`
  text-align: center;
  margin: 1.5em 0 0.8em 0;
`;

const StyledButton = styled(Button)`
  margin-left: 5%;
`;

const StyledImage = styled(Image)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

import Head from "next/head";
import Audioguide from "../components/Audioguide";
import WelcomeAudio from "@/components/WelcomeAudio";
import styled from "styled-components";
import { useState } from "react";

const StyledHeadline = styled.h1`
  text-align: center;
  margin: 1.5em 0;
`;

// const StyledHead = styled(Head)``;

export default function Tourguide() {
  const [language, setLanguage] = useState("");
  // console.log("Language: ", language);

  function handleLanguage(event) {
    // console.log(event.target.textContent);
    switch (event.target.textContent) {
      case "deutsch":
      case "🇩🇪":
        setLanguage("de");
        break;
      case "english":
      case "🇬🇧":
        setLanguage("en");
        break;
      case "français":
      case "🇫🇷":
        setLanguage("fr");
        break;
      case "polski":
      case "🇵🇱":
        setLanguage("pl");
        break;
      case "español":
      case "🇪🇸":
        setLanguage("es");
        break;
      case "portugués":
      case "🇵🇹":
        setLanguage("pt");
        break;
      case "portugués":
      case "🇧🇷":
        setLanguage("br");
        break;
      case "فارسی":
      case "🇮🇷":
        setLanguage("ir");
        break;
    }
  }

  function handleReturnClick() {
    // console.log("ReturnClick");
    setLanguage("");
  }

  return (
    <>
      <Head>
        <title>Audio Tourguide</title>
        <meta
          name="description"
          lang="en"
          content="Audio tourguide for boat trips in Berlin"
        />
        <meta
          name="description"
          lang="de"
          content="Audio tourguide für Schifffahrten in Berlin"
        />
      </Head>
      <main>
        <StyledHeadline>Audio Tourguide</StyledHeadline>
        {language === "" && <Audioguide onClick={handleLanguage} />}
        {language && (
          <WelcomeAudio
            audio={{ language: language }}
            onClick={handleReturnClick}
          />
        )}
      </main>
    </>
  );
}

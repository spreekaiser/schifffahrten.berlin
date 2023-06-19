import Head from "next/head";
import Audioguide from "../components/Audioguide";
import Button from "@/components/Button";
import WelcomeAudio from "@/components/WelcomeAudio";
import styled from "styled-components";
import { useState } from "react";

export default function Tourguide() {
  const [language, setLanguage] = useState("");
  const [buttonContent, setButtonContent] = useState("");

  function handleLanguage(event) {
    // console.log(event.target.textContent);
    switch (event.target.textContent) {
      case "deutsch":
      case "🇩🇪":
        setLanguage("de");
        setButtonContent("zurück");
        console.log("Language: ", language);
        break;
      case "english":
      case "🇬🇧":
        setLanguage("en");
        console.log("Language: ", language);
        setButtonContent("back");
        break;
      case "français":
      case "🇫🇷":
        setLanguage("fr");
        console.log("Language: ", language);
        setButtonContent("retour");
        break;
      case "español":
      case "🇪🇸":
        setLanguage("es");
        console.log("Language: ", language);
        setButtonContent("atrás");
        break;
      case "portugués":
      case "🇵🇹":
        setLanguage("pt");
        console.log("Language: ", language);
        setButtonContent("indietro");
        break;
    }
  }

  function handleReturnClick() {
    console.log("ReturnClick");
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

const StyledHeadline = styled.h1`
  text-align: center;
  margin: 1.5em 0;
`;
// const StyledHead = styled(Head)``;

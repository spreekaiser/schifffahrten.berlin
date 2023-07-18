import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Image from "next/image";
import welcomeImage from "../../public/images/welcomeImage.jpeg";
import lang from "@/resources/data/language.json";

export default function WelcomeAudio({ audio, onClick }) {
  // console.log("audio: ", audio.language);
  // console.log("lang: ", lang);

  const [location, setLocation] = useState("");

  useEffect(() => {
    // Aktualisierung der Geoposition
    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Koordinaten:", latitude, longitude);
      // Geoposition in geohash konvertieren
      var geohash = require("ngeohash");
      let hash = geohash.encode(latitude, longitude);
      setLocation(hash.substring(0, 7));
      console.log("GeoHash:", location);
    };

    // Abfragen der Geoposition
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, (error) => {
        console.error("Fehler bei der Geolokalisierung:", error);
      });
    } else {
      console.error("Geolokalisierung wird nicht unterstützt");
    }
  }, [location]);
  console.log("Log draußen - GeoHash: ", location);

  switch (location) {
    case "u33dbcj":
      var PlayWelcomeAudio = true;
      break;
  }

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
      {PlayWelcomeAudio && (
        <audio autoPlay src={`/audios/welcomeAudio_${audio.language}.m4a`} />
      )}
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

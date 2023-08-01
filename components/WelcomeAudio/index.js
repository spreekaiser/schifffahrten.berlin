import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import Image from "next/image";
import welcomeImage from "../../public/images/welcomeImage.jpeg";
import lang from "@/resources/data/language.json";
import { locationPositioning } from "../../public/getGeolocation.js";

export default function WelcomeAudio({ audio, onClick }) {
  // console.log("audio: ", audio.language);
  // console.log("lang: ", lang);

  useEffect(() => {
    import("../../public/getGeolocation.js").catch((error) => {
      console.error("Fehler bim Import der getGeolocation-Datei", error);
    });
  }, []);

  const [location, setLocation] = useState("");

  useEffect(() => {
    // Aktualisierung der Geoposition
    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Koordinaten:", latitude, longitude);
      // Geoposition in geohash konvertieren
      var geohash = require("ngeohash");
      let hash = geohash.encode(latitude, longitude);
      setLocation(hash.substring(0, 8));
      console.log("GeoHash:", hash.substring(0, 8));
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
  if (typeof window !== "undefined") {
    locationPositioning();
  }

  switch (location) {
    case "u33d9jtv":
      var PlayWelcomeAudio = true;
      break;
    case "u33d9jt6":
      var PlayWelcomeAudio1 = true;
      break;
    case "u33d9jtb":
      var PlayWelcomeAudio2 = true;
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
      {PlayWelcomeAudio1 && (
        <audio autoPlay src={`/audios/welcomeAudio_${audio.language}.m4a`} />
      )}
      {PlayWelcomeAudio2 && (
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

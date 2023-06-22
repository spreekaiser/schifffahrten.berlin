import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";
import Button from "@/components/Button";
import Image from "next/image";
import styled from "styled-components";
import BoatTripList from "@/components/BoatTripList";

const StyledHeadline = styled.h1`
  margin: 1em 0 0.5em 0;
  text-align: center;
`;
const StyledDiv = styled.div`
  margin-bottom: 3em;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 0 1%;
`;

const buttons = ["Spree", "Havel", "Dahme", "Charter", "privat"];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [river, setRiver] = useState("");
  // console.log(river);

  const { data, error, isLoading } = useSWR("/api/boattrip", fetcher);
  // console.log("boatTrips: ", data);
  if (error) return console.log("failed to load");
  if (isLoading) return console.log("loading...");

  function handleButtonClick(event) {
    // console.log(event.target.textContent);
    setRiver(event.target.textContent);
    console.log("River: ", river);
  }

  return (
    <>
      <Head>
        <title>Schifffahrten Berlin</title>
        <meta name="description" lang="en" content="All boat trips of Berlin" />
        <meta
          name="description"
          lang="de"
          content="Die Schifffahrten Berlins"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <StyledHeadline>Schifffahrten Berlin</StyledHeadline>
        <StyledDiv>
          {buttons.map((button) => (
            <StyledButton key={button} onClick={handleButtonClick}>
              {button}
            </StyledButton>
          ))}
        </StyledDiv>
        <BoatTripList data={data} river={river} onClick={handleButtonClick} />
      </main>
    </>
  );
}

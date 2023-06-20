// import useSWR from "swr";
import Head from "next/head";
import Button from "@/components/Button";
import Image from "next/image";
import styled from "styled-components";

const StyledHeadline = styled.h1`
  margin: 1em 0 0.5em 0;
  text-align: center;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 0 1%;
`;

function handleButtonClick(event) {
  console.log(event.target.textContent);
}

const buttons = ["Spree", "Havel", "Dahme", "Charter", "privat"];

export default function Home() {
  // const boatTrips = useSWR("/api/BoatTrips");

  // async function handleShowBoatTrips() {
  //   const response = await fetch("/api/boatTrips");
  // }

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
      </main>
    </>
  );
}

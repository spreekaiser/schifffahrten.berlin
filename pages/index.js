import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";
import Button from "@/components/elements/Button";
import Image from "next/image";
import styled from "styled-components";
import TripListAll from "@/components/TripListAll";
import TripListDetail from "@/components/TripListDetail";

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
  const [riverFilter, setRiverFilter] = useState([]);
  // console.log(filter);
  const [tagFilter, setTagFilter] = useState([]);

  const { data, error, isLoading } = useSWR("/api/boattrip", fetcher);
  // console.log("boatTrips: ", data);
  if (error) return console.log("failed to load");
  if (isLoading) return console.log("loading...");

  function handleRiverFilterClick(event) {
    console.log("event in handleRiverFilterClick: ", event.target.textContent);
    setRiverFilter([...riverFilter, event.target.textContent]);
    console.log("RiverFilter in handleButtonClick: ", riverFilter);
  }

  function handleTagFilterClick(event) {
    console.log("event in handleTagFilterClick: ", event.target.textContent);
    setTagFilter([...tagFilter, event.target.textContent]);
    console.log("TagFilter in handleButtonClick: ", tagFilter);
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
            <StyledButton key={button} onClick={handleRiverFilterClick}>
              {button}
            </StyledButton>
          ))}
        </StyledDiv>
        {/* {riverFilter.length === 0 && tagFilter.length === 0 && ( */}
        <TripListAll
          data={data}
          riverFilter={riverFilter}
          tagFilter={tagFilter}
          onClick={handleTagFilterClick}
        />
        {/* )} */}
        {/* {(riverFilter.length > 0 || tagFilter.length > 0) && (
          <TripListAll
            data={data}
            riverFilter={riverFilter}
            tagFilter={tagFilter}
            onClick={handleTagFilterClick}
          />
        )} */}
      </main>
    </>
  );
}

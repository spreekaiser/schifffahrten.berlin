import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";
import Button from "@/components/elements/Button";
import Image from "next/image";
import styled from "styled-components";
import TripListRow from "@/components/TripListRow";
import TripListColumn from "@/components/TripListColumn";
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

const buttons = ["Spree", "Havel", "Dahme", "Privat", "Charter"];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [menuTagFilter, setMenuTagFilter] = useState([]);
  const [listTagFilter, setListTagFilter] = useState("");

  const { data, error, isLoading } = useSWR("/api/boattrip", fetcher);
  // console.log("boatTrips: ", data);
  if (error) return console.log("failed to load");
  if (isLoading) return console.log("loading...");

  function handleMenuTagFilterClick(event) {
    // console.log("event in handleMenuTagFilterClick: ", event.target.textContent);
    setMenuTagFilter([...menuTagFilter, event.target.textContent]);
    // console.log("menuTagFilter in handleButtonClick: ", menuTagFilter);
  }
  function clearMenuTagFilter() {
    setMenuTagFilter([]);
    // console.log("Filter in ClearMenuTagFilter: ", menuTagFilter);
  }

  function handleListTagFilterClick(event) {
    console.log(
      "event in handleListTagFilterClick: ",
      event.target.textContent
    );
    setListTagFilter(event.target.textContent);
    console.log("listTagFilter in handleButtonClick: ", listTagFilter);
  }
  function clearListTagFilter() {
    setListTagFilter("");
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
            <StyledButton key={button} onClick={handleMenuTagFilterClick}>
              {button}
            </StyledButton>
          ))}
        </StyledDiv>

        {listTagFilter.length == 0 && (
          <TripListRow
            data={data}
            menuTagFilter={menuTagFilter}
            listTagFilter={listTagFilter}
            addListTagFilter={handleListTagFilterClick}
            clearMenuTagFilter={clearMenuTagFilter}
          />
        )}

        {listTagFilter.length > 0 && (
          <TripListColumn
            data={data}
            menuTagFilter={menuTagFilter}
            listTagFilter={listTagFilter}
            clearListTagFilter={clearListTagFilter}
          />
        )}
      </main>
    </>
  );
}

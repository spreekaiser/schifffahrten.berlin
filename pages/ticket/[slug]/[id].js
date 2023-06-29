import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/elements/Button";
import { InfoBox_Column } from "@/components/elements/InfoBox_Column/InfoBox_Column.styled";
import { InfoBox_Row } from "@/components/elements/InfoBox_Row/InfoBox_Row.styled";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TicketHead = styled.h2`
  margin: 1em 0 1em 1em;
`;

const InfoLine = styled.p`
  margin: 1em 0 0 1.5em;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const ChangeButton = styled(Button)`
  margin-top: 2em;
`;

export default function Ticket() {
  const router = useRouter();
  const { slug } = router.query;
  const { id } = router.query;
  console.log("###  Ticket id:  -> ", id);
  console.log("###  Ticket slug:  -> ", slug);
  const { data, isLoading } = useSWR(`/api/ticket/${slug}/${id}`, fetcher);
  console.log("## -- DATA from /api/slug/id -----> ", data);

  const [ticketValid, setTicketValid] = useState(true);
  let ticketStatus, now;

  if (!id) {
    return null;
  }

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }
  if (!data) {
    console.log("In components/BoatTrip is no data coming!");
    return;
  }

  function handleTripChange() {
    console.log("Fahrt wird umgebucht");
  }

  function handleBording() {
    console.log("Fahrgast geht an Bord");
    now = new Date();
    console.log("Ticket benutzt am: ", now);
    setTicketValid(false);
  }

  if (ticketValid) {
    ticketStatus = "gültig";
  } else {
    ticketStatus = `benutzt am ${now}`;
  }

  return (
    <>
      <TicketHead>Ticket {ticketStatus}</TicketHead>
      <InfoLine>
        für: <br />
        <Bold>{data.tripName}</Bold>
      </InfoLine>
      <InfoLine>
        bei: <br />
        <Bold>{data.company}</Bold>
      </InfoLine>
      <InfoLine>
        Fahrtdatum: <Bold>{data.dateOfTrip}</Bold>
      </InfoLine>
      <InfoLine>
        Fahrgast:
        <br />
        <Bold>
          {data.firstName} {data.lastName}
        </Bold>
      </InfoLine>
      <InfoLine>
        Tickets normal: {"  "}
        <Bold>{data.adultTickets}</Bold>
      </InfoLine>
      <InfoLine>
        Tickets ermäßigt: <Bold>{data.childTickets}</Bold>
      </InfoLine>
      <InfoLine>
        Summe gesamt: <Bold>{data.priceOfTickets} Euro </Bold>
      </InfoLine>
      <InfoBox_Column>
        <ChangeButton onClick={handleTripChange}>Umbuchen</ChangeButton>
        <ChangeButton onClick={handleBording}>Bording</ChangeButton>
      </InfoBox_Column>
      {/* <InfoBox_Column>
        <ChangeButton>Ticket {ticketStatus} machen</ChangeButton>
      </InfoBox_Column> */}
    </>
  );
}

import { useRouter } from "next/router";
import Router from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { withSessionSsr } from "@/lib/session";
import styled from "styled-components";
import Button from "@/components/elements/Button";
import LoginWindow from "@/components/LoginWindow";
import { InfoBox_Column } from "@/components/elements/InfoBox_Column/InfoBox_Column.styled";
import { InfoBox_Row } from "@/components/elements/InfoBox_Row/InfoBox_Row.styled";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TicketHead = styled.h2`
  margin: 0 0 1em 1em;
`;

const QRcode = styled.img`
  margin: 2em 0 2em 15%;
  width: 70%;
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

export default function Ticket({ loggedIn }) {
  const router = useRouter();
  const { slug, id } = router.query;
  // console.log("###  Ticket id:  -> ", id);
  // console.log("###  Ticket slug:  -> ", slug);
  const { data, isLoading } = useSWR(`/api/ticket/${slug}/${id}`, fetcher);
  // console.log("## -- DATA from /api/slug/id -----> ", data);

  const [showLogin, setShowLogin] = useState(false);
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
    // Ticket.findByIdAndUpdate(id, );
  }

  function handleLogin() {
    // console.log("Ich bin eingeloggt");
    setShowLogin(!showLogin);
  }

  async function handleLogOut() {
    console.log("Ich werde ausgeloggt");

    const url = "/api/auth/logout";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log("JSON: ", json);
    if (json.success) {
      console.log("LogOut: SUCCESS is OKAY!");
      // reloading the page
      Router.reload();
    }
  }

  function handleBording() {
    console.log("Fahrgast geht an Bord");
    now = new Date();
    console.log("Console-log --- Ticket benutzt am: ", now);
    const url = `/api/ticket/${slug}/${id}`;

    const response = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ boardingTime: now }),
    })
      .catch((error) => {
        console.log("Fehler beim Setzen der boardingTime: ", error);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("PUT-Daten empfangen: ", data);
      })
      .then(Router.reload());
  }

  if (!data.boardingTime) {
    ticketStatus = "gültig";
  } else {
    ticketStatus = `benutzt am ${data.boardingTime}`;
  }

  return (
    <>
      <InfoBox_Column>
        <QRcode src={data.codeURL} alt="QR-Code" />
      </InfoBox_Column>
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
      </InfoBox_Column>
      {!loggedIn && (
        <InfoBox_Column>
          <ChangeButton onClick={handleLogin}>
            🔑 Reederei-Login 🔑
          </ChangeButton>
        </InfoBox_Column>
      )}
      {loggedIn && (
        <InfoBox_Column>
          <ChangeButton onClick={handleBording}>Boarding</ChangeButton>
        </InfoBox_Column>
      )}
      {loggedIn && (
        <InfoBox_Column>
          <ChangeButton onClick={handleLogOut}>🔑 LogOut 🔑</ChangeButton>
        </InfoBox_Column>
      )}
      {showLogin && <LoginWindow />}
    </>
  );
}

export const getServerSideProps = withSessionSsr(async (context) => {
  const loggedIn = !!context.req.session.partnerId;
  return { props: { loggedIn } };
});

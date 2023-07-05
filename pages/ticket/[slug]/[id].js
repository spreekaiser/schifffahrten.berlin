import { useRouter } from "next/router";
import Router from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { withSessionSsr } from "@/lib/session";
import useLocalStorageState from "use-local-storage-state";
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
  // let boardingCompany;
  const [boardingCompany, setBoardingCompany] = useLocalStorageState(
    "boardingCompany",
    { defaultValue: "" }
  );
  const [boardingAuthority, setBoardingAuthority] = useLocalStorageState(
    "boardingAuthority",
    { defaultValue: false }
  );

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
  console.log("## ---> boardingCompany draußen: ", boardingCompany);
  console.log("## ---> boardingAuthority draußen: ", boardingAuthority);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    console.log("LoginWindow - Absenden login-Daten");

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const url = "/api/auth/login";
    // console.log("## ---> FormData in LoginWindow: ", data);
    // boardingCompany = data.company;
    setBoardingCompany(data.company);
    console.log("## ---> boardingCompany: ", boardingCompany);

    const company = data.company;
    if (company === slug) {
      console.log("Huurraaaaa - Zeit fürs Boarding");
      setBoardingAuthority(true);
    } else {
      setBoardingAuthority(false);
      console.log("## ---> boardingAuthority is false");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log("JSON: ", json);
    if (json.success) {
      // console.log("LoginWindow: SUCCESS is OKAY!");
      // reloading the page
      setShowLogin(!showLogin);
    }
  }

  async function handleLogOut() {
    console.log("Ich werde ausgeloggt");
    localStorage.clear();

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
    if (boardingCompany === slug) {
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
    } else {
      console.log("No boarding permission! Wrong boot company");
    }
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
      {loggedIn && boardingAuthority && (
        <InfoBox_Column>
          <ChangeButton onClick={handleBording}>Boarding</ChangeButton>
        </InfoBox_Column>
      )}
      {loggedIn && (
        <InfoBox_Column>
          <ChangeButton onClick={handleLogOut}>🔑 LogOut 🔑</ChangeButton>
        </InfoBox_Column>
      )}
      {showLogin && <LoginWindow onSubmit={handleLoginSubmit} />}
    </>
  );
}

export const getServerSideProps = withSessionSsr(async (context) => {
  const loggedIn = !!context.req.session.partnerId;
  return { props: { loggedIn } };
});

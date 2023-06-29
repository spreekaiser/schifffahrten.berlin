import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import { StyledLink } from "@/components/elements/Link/Link.styled";
import { BackTag } from "@/components/elements/BackTag/BackTag.styled";
import { CardWrapper } from "@/components/elements/CardWrapper/CardWrapper.styled";
import { HeadlineH1 } from "@/components/elements/HeadlineH1/HeadlineH1.styled";
import { InfoBox_Column } from "@/components/elements/InfoBox_Column/InfoBox_Column.styled";
import { InfoBox_Row } from "@/components/elements/InfoBox_Row/InfoBox_Row.styled";
import { InfoElement } from "@/components/elements/InfoElement/InfoElement.styled";
import Button from "../../../components/elements/Button";
import styles from "./booking-form.module.css";

const BuyButton = styled(Button)`
  margin: 1em 0 1em 0;
  position: relative;
  left: 80%;
  background-color: rgb(255, 85, 0);
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BookingForm() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(`/api/boattrip/${id}`, fetcher);

  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);

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
  // console.log("Boattrip in Booking-Form: ", data);

  const company = data.company.replace(/\s/g, "");
  // const company = data.company.replaceALL(" ", "_");
  console.log("Replaced Data: ", company);

  function handleAdultTickets(changedPrice) {
    // console.log("AdultTickets: ", changedPrice.target.valueAsNumber);
    const price = changedPrice.target.valueAsNumber * data.price;
    if (!price) {
      setAdultPrice(0);
    } else {
      setAdultPrice(price);
    }
  }

  function handleChildTickets(changedPrice) {
    const price = changedPrice.target.valueAsNumber * (data.price / 2);
    if (!price) {
      setChildPrice(0);
    } else {
      setChildPrice(price);
    }
  }

  function handleDatePicker(changedDate) {
    console.log("DatePicker: ", changedDate);
  }

  async function convertFormDataToJSON(formData) {
    const json = {};

    for (let i = 0; i < formData.length; i++) {
      const element = formData[i];
      if (element.tagName === "INPUT") {
        json[element.id] = element.value;
      }
    }
    return json;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("handleSumbit after 'Kaufen': ", event);

    const form = event.target;
    const formData = form.elements;
    // console.log("FormData  ---->  : ", formData);
    const url = "/api/ticket/";

    const ticketData = convertFormDataToJSON(formData);

    // console.log("TicketData  --++--++--- : ", await ticketData);
    // console.log(
    //   "# --> TicketData - adultTicket: ",
    //   await ticketData.adultTickets
    // );
    // console.log("# --> TicketData - tripId: ", await ticketData.tripId);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(await ticketData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("POST-Daten empfangen: ", data);

        // Redirect to ticket page with the ID from the database
        console.log("+++ tripId of posted data +++  : ", data._id);
        router.push(`/ticket/${data.company}/${data._id}`);
      })
      .catch((error) => {
        console.log("Fehler beim Fetch-Aufruf: ", error);
      });
  }

  return (
    <>
      <CardWrapper>
        <StyledLink href={`/boattrip/${id}`}>
          <BackTag>zurück</BackTag>
        </StyledLink>
        <HeadlineH1>{data.name}</HeadlineH1>
        <InfoBox_Column>
          <InfoElement>Ticket normal: {data.price} Euro</InfoElement>
          <InfoElement>Ticket ermäßigt: {data.price / 2} Euro</InfoElement>
        </InfoBox_Column>
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datum</legend>
            <InfoBox_Row>
              <input
                type="date"
                id="dateOfTrip"
                className={styles.inputData}
                onChange={handleDatePicker}
              ></input>
            </InfoBox_Row>
          </fieldset>
          <fieldset>
            <legend>Anzahl der Tickets</legend>
            <InfoBox_Row>
              <label htmlFor="adultTickets">Tickets normal</label>
              <input
                type="number"
                id="adultTickets"
                className="inputNumber"
                placeholder="1"
                onChange={handleAdultTickets}
              ></input>
            </InfoBox_Row>
            <InfoBox_Row>
              <label htmlFor="childTickets">Tickets ermäßigt</label>
              <input
                type="number"
                id="childTickets"
                className="inputNumber"
                placeholder="1"
                onChange={handleChildTickets}
              ></input>
            </InfoBox_Row>
          </fieldset>
          <InfoBox_Row>
            <InfoElement>Summe total: </InfoElement>
            <InfoElement>{adultPrice + childPrice} Euro</InfoElement>
          </InfoBox_Row>
          <input
            type="hidden"
            id="priceOfTickets"
            value={adultPrice + childPrice}
          />
          <fieldset>
            <legend>Persönliche Angaben</legend>
            <InfoBox_Row>
              <label htmlFor="firstName">Vorname:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Vorname"
              ></input>
            </InfoBox_Row>
            <InfoBox_Row>
              <label htmlFor="lastName">Nachname:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Nachname"
              ></input>
            </InfoBox_Row>
            <InfoBox_Row>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
              ></input>
            </InfoBox_Row>
          </fieldset>
          <input type="hidden" id="tripId" value={id} />
          <input type="hidden" id="tripName" value={data.name} />
          <input type="hidden" id="company" value={company} />
          <BuyButton type="submit">Kaufen</BuyButton>
        </form>
      </CardWrapper>
    </>
  );
}

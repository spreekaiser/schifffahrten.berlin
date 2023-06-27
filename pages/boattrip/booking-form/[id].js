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

  function handleAdultTickets(changedPrice) {
    console.log("AdultTickets: ", changedPrice.target.valueAsNumber);
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
  function handleSubmit(event) {
    event.preventDefault();
    console.log("handleSumbit after 'Kaufen': ", event);
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
                className="inputDate"
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
            id="priceTotal"
            value={adultPrice + childPrice}
          />
          <fieldset>
            <legend>Persönliche Angaben</legend>
            <InfoBox_Row>
              <label htmlFor="firstname">Vorname:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Vorname"
              ></input>
            </InfoBox_Row>
            <InfoBox_Row>
              <label htmlFor="lastname">Nachname:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
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
          <BuyButton type="submit">Kaufen</BuyButton>
        </form>
      </CardWrapper>
    </>
  );
}
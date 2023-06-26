import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import { StyledLink } from "../elements/Link/Link.styled";
import Button from "../elements/Button";

const BoatTripCard = styled.article`
  padding: 2em 2em;
`;

const BackTag = styled.h5`
  padding: 1.2%;
  display: inline;
  border: solid 0.2px;
  border-radius: 3px;
`;

const StyledHeadline = styled.h1`
  margin: 1.5em 0 0.5em 0;
`;

const Slogan = styled.h5`
  margin: 0 0 0.5em 0;
`;

const StyledImage = styled.img`
  width: 100%;
`;
const StyledLogo = styled.img`
  width: 25%;
  position: absolute;
  top: 25.5em;
  left: 15em;
`;

const InfoBox = styled.div`
  margin: 0.5em 0 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoElement = styled.span`
  font-size: larger;
`;

const InfoText = styled.p`
  font-size: medium;
`;

const BuyButton = styled(Button)`
  margin: 1em 0 1em 0;
  position: relative;
  left: 80%;
  background-color: rgb(255, 85, 0);
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BoatTrip({ id }) {
  // console.log("get id from url: ", id);
  const { data, isLoading } = useSWR(`/api/boattrip/${id}`, fetcher);

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }
  if (!data) {
    console.log("In components/BoatTrip is no data coming!");
    return;
  }
  console.log("Detail Boattrip: ", data);

  return (
    <>
      <BoatTripCard>
        <StyledLink href="/">
          <BackTag>zurück</BackTag>
        </StyledLink>
        <StyledHeadline>{data.name}</StyledHeadline>
        <Slogan>{data.descriptionShort}</Slogan>
        <StyledImage
          src={`/images/${data.imageName}.jpeg`}
          alt={data.imageName}
        />
        {/* <StyledLogo src={`/images/logos/${data.logo}.png`} alt={data.logo} /> */}
        <InfoBox>
          <InfoElement>{data.price} Euro</InfoElement>
          <InfoElement>{data.durationInMinutes} min</InfoElement>
        </InfoBox>
        <InfoBox>
          <InfoElement>Anbieter: {data.company}</InfoElement>
          {/* <InfoElement>{data.company}</InfoElement> */}
        </InfoBox>
        <InfoText>{data.descriptionLong}</InfoText>
        <StyledLink href={`/boattrip/booking-form/${id}`}>
          <BuyButton>Buchen</BuyButton>
        </StyledLink>
        {/* <Slogan>{data.locations}</Slogan> */}
      </BoatTripCard>
    </>
  );
}

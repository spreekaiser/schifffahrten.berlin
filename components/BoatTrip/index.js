import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import { StyledLink } from "../elements/Link/Link.styled";
import { BackTag } from "../elements/BackTag/BackTag.styled";
import { CardWrapper } from "../elements/CardWrapper/CardWrapper.styled";
import { HeadlineH1 } from "../elements/HeadlineH1/HeadlineH1.styled";
import { InfoBox_Row } from "../elements/InfoBox_Row/InfoBox_Row.styled";
import { InfoElement } from "../elements/InfoElement/InfoElement.styled";

import Button from "../elements/Button";

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
  // console.log("Detail Boattrip: ", data);

  return (
    <>
      <CardWrapper>
        <StyledLink href="/">
          <BackTag>zurück</BackTag>
        </StyledLink>
        <HeadlineH1>{data.name}</HeadlineH1>
        <Slogan>{data.descriptionShort}</Slogan>
        <StyledImage
          src={`/images/${data.imageName}.jpeg`}
          alt={data.imageName}
        />
        {/* <StyledLogo src={`/images/logos/${data.logo}.png`} alt={data.logo} /> */}
        <InfoBox_Row>
          <InfoElement>{data.price} Euro</InfoElement>
          <InfoElement>{data.durationInMinutes} min</InfoElement>
        </InfoBox_Row>
        <InfoBox_Row>
          <InfoElement>Anbieter: {data.company}</InfoElement>
          {/* <InfoElement>{data.company}</InfoElement> */}
        </InfoBox_Row>
        <InfoText>{data.descriptionLong}</InfoText>
        <StyledLink href={`/boattrip/booking-form/${id}`}>
          <BuyButton>Buchen</BuyButton>
        </StyledLink>
        {/* <Slogan>{data.locations}</Slogan> */}
      </CardWrapper>
    </>
  );
}

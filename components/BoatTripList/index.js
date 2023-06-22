import styled from "styled-components";
import Image from "next/image";
import Button from "../Button";

const RiverTag = styled.h5`
  margin: 1em 0 0 3%;
  /* border: solid 0.2px; */
`;

const StyledList = styled.ul`
  padding: 3%;
  list-style: none;
  display: flex;
  flex-flow: row;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  gap: 4%;
  /* border: solid 0.2px; */
  /* border-radius: 10px; */
`;

const ListItem = styled.li`
  flex: 0 0 35%;
  max-width: 250px;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ListBox = styled.div`
width`;

export default function BoatTripList({ data, river, onClick }) {
  console.log("data in BoatTripList: ", data);
  const cityTrips = data.filter((trip) => trip.tags.includes("City"));
  const sightseeingTrips = data.filter((trip) =>
    trip.tags.includes("Sightseeing")
  );
  const familyTrips = data.filter((trip) => trip.tags.includes("Familie"));
  const privatTrips = data.filter((trip) => trip.tags.includes("Privat"));

  return (
    <>
      <RiverTag onClick={onClick}>City: in der Innenstadt</RiverTag>
      <StyledList>
        {cityTrips.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <BoxImage
                src={`/images/${trip.imageName}.jpeg`}
                alt={`${trip.name}`}
              />
              <div>{trip.name}</div>
            </ListItem>
          );
        })}
      </StyledList>

      <RiverTag onClick={onClick}>Familie</RiverTag>
      <StyledList>
        {familyTrips.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <BoxImage
                src={`/images/${trip.imageName}.jpeg`}
                alt={`${trip.name}`}
              />
              <div>{trip.name}</div>
            </ListItem>
          );
        })}
      </StyledList>

      <RiverTag onClick={onClick}>Sightseeing</RiverTag>
      <StyledList>
        {sightseeingTrips.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <BoxImage
                src={`/images/${trip.imageName}.jpeg`}
                alt={`${trip.name}`}
              />
              <div>{trip.name}</div>
            </ListItem>
          );
        })}
      </StyledList>
      <RiverTag onClick={onClick}>Privat</RiverTag>
      <StyledList>
        {privatTrips.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <BoxImage
                src={`/images/${trip.imageName}.jpeg`}
                alt={`${trip.name}`}
              />
              <div>{trip.name}</div>
            </ListItem>
          );
        })}
      </StyledList>

      <StyledList>
        {data.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <BoxImage
                src={`/images/${trip.imageName}.jpeg`}
                alt={`${trip.name}`}
              />
              <div>{trip.name}</div>
            </ListItem>
          );
        })}
      </StyledList>
    </>
  );
}

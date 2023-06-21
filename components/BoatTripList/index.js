import styled from "styled-components";
import Image from "next/image";

const RiverTag = styled.h5`
  margin: 3em 0 0 3%;
`;

const StyledList = styled.ul`
  padding: 3%;
  list-style: none;
  display: flex;
  flex-flow: row;
  overflow-x: scroll;
  /* scroll-snap-type: x mandatory; */
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

export default function BoatTripList({ data, river }) {
  console.log("River in BoatTripList: ", river);
  return (
    <>
      <RiverTag>#Spree</RiverTag>
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

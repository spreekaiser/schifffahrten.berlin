import styled from "styled-components";
import StyledListColumn from "../elements/ListColumn";

const StyledHeadline = styled.h4`
  margin: -1em 0 0 3%;
`;

const ListItem = styled.li`
  flex: 0 0 35%;
  max-width: 250px;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export default function TripListColumn({
  data,
  menuTagFilter,
  listTagFilter,
  clearListTagFilter,
}) {
  console.log("data in TripListColumn: ", data);
  console.log("tagFilter in TripListColumn: ", listTagFilter);

  function filteredTrips(category) {
    let trips = data.filter((trip) => trip.listTags.includes(category));
    if (menuTagFilter.length > 0) {
      for (let i = 0; i < menuTagFilter.length; i++) {
        // console.log("tripsArray before Filter: ", trips);
        trips = trips.filter((element) =>
          element.menuTags.includes(menuTagFilter[i])
        );
        // console.log("tripsArray after Filter: ", trips);
      }

      // console.log("trips after for-loop: ", trips);
    } else {
      trips = data.filter((trip) => trip.listTags.includes(category));
      // console.log("riverFilter in esle: ", trips);
    }
    return trips;
  }

  const categoryTrips = filteredTrips(listTagFilter);
  //   console.log("trips in TripListColumn: ", trips);

  return (
    <>
      <StyledHeadline>Suchergebnisse für: {listTagFilter}</StyledHeadline>
      <StyledListColumn>
        {categoryTrips.map((trip) => {
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
      </StyledListColumn>
    </>
  );
}

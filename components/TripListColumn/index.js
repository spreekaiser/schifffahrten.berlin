import styled from "styled-components";
import StyledListColumn from "../elements/ListColumn";

const StyledHeadline = styled.h4`
  margin: 0 0 1em 15%;
  display: inline;
`;

const StyledTag = styled.h4`
  margin: 0 0 0 5%;
  display: inline;
`;

const DetailTag = styled.h5`
  margin: 1em 0 0 3%;
  padding: 1%;
  display: inline;
  border: solid 0.2px;
  border-radius: 3px;
`;

const ListItem = styled.li`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export default function TripListColumn({
  data,
  menuTagFilter,
  listTagFilter,
  clearMenuTagFilter,
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
      <StyledHeadline>Suchergebnisse für:</StyledHeadline>
      {menuTagFilter.length > 0 && (
        <>
          {menuTagFilter.map((filter) => (
            <StyledTag key={filter}>{filter}</StyledTag>
          ))}
          <DetailTag onClick={clearMenuTagFilter}>x</DetailTag>
        </>
      )}

      <StyledTag>{listTagFilter}</StyledTag>
      <DetailTag onClick={clearListTagFilter}>x</DetailTag>
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

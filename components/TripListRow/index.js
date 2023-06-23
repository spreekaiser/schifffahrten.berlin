import styled from "styled-components";
import StyledListRow from "../elements/ListRow";
import Button from "../elements/Button";

const DetailTag = styled.h5`
  margin: 1em 0 0 3%;
  padding: 1%;
  display: inline;
  border: solid 0.2px;
  border-radius: 3px;
`;

const ListItem = styled.li`
  flex: 0 0 35%;
  max-width: 250px;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const StyledHeadline = styled.h4`
  margin: -1em 0 0 3%;
`;

const FilterCrumbs = styled.div`
  margin: 0 0 3em 0;
  display: flex;
  justify-content: left;
`;

const CrumbTag = styled.h4`
  margin: 1em 0 0 3%;
  padding: 1%;
  display: inline;
`;

export default function TripListAll({
  data,
  riverFilter,
  menuTagFilter,
  addListTagFilter,
  clearMenuTagFilter,
}) {
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
  const cityTrips = filteredTrips("City");
  const familyTrips = filteredTrips("Familie");
  const sightseeingTrips = filteredTrips("Sightseeing");
  const privateTrips = filteredTrips("Privat");

  // console.log("data in TripListAll: ", data);
  // console.log("cityTrips: ", cityTrips, cityTrips.length);

  return (
    <>
      {menuTagFilter.length > 0 && (
        <>
          <StyledHeadline>Suchergebnisse für:</StyledHeadline>
          <FilterCrumbs>
            {menuTagFilter.map((filter) => (
              <CrumbTag key={filter}>{filter}</CrumbTag>
            ))}
            <DetailTag onClick={clearMenuTagFilter}>x</DetailTag>
          </FilterCrumbs>
        </>
      )}
      {cityTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>City</DetailTag>
          <StyledListRow>
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
          </StyledListRow>
        </>
      )}

      {familyTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Familie</DetailTag>
          <StyledListRow>
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
          </StyledListRow>
        </>
      )}

      {sightseeingTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Sightseeing</DetailTag>
          <StyledListRow>
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
          </StyledListRow>
        </>
      )}

      {privateTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Privat</DetailTag>
          <StyledListRow>
            {privateTrips.map((trip) => {
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
          </StyledListRow>
        </>
      )}
      <DetailTag>-- All Objects --</DetailTag>
      <StyledListRow>
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
      </StyledListRow>
    </>
  );
}
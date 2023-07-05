import useSWR from "swr";
import ListRow from "../ListRow";
import styled from "styled-components";
import StyledListRow from "../elements/ListRow";
import Link from "next/link";
import { DetailTag } from "../elements/DetailTag/DetailTag.styled";

const ListItem = styled.li`
  flex: 0 0 35%;
  max-width: 250px;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const FilterCrumbs = styled.div`
  margin: 0 0 0 0;
  display: flex;
  justify-content: left;
`;

const CrumbTag = styled.h4`
  margin: 0 0 1em 3%;
  padding: 1%;
  display: inline;
`;

const StyledText = styled.h5`
  margin: 2em 0 3em 3%;
`;

export default function TripListAll({
  menuTagFilter,
  addListTagFilter,
  clearMenuTagFilter,
}) {
  const { data, isLoading } = useSWR("/api/boattrip");
  if (isLoading) {
    return console.log("is loading in TripListRow_index");
  }
  if (!data) {
    return;
  }

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
      // console.log("menuTagFilter in esle: ", trips);
    }
    return trips;
  }
  const cityTrips = filteredTrips("City");
  const familyTrips = filteredTrips("Familie");
  const sightseeingTrips = filteredTrips("Sightseeing");
  const eventTrips = filteredTrips("Event");
  const landwehrkanalTrips = filteredTrips("Landwehrkanal");
  const naturTrips = filteredTrips("Natur");
  const partyTrips = filteredTrips("Party");
  const mueggelseeTrips = filteredTrips("Müggelsee");
  const fitnessTrips = filteredTrips("Fitness");
  const romantikTrips = filteredTrips("Romantik");

  // console.log("data in TripListAll: ", data);
  // console.log("cityTrips: ", cityTrips, cityTrips.length);

  return (
    <>
      {menuTagFilter.length > 0 && (
        <FilterCrumbs>
          <CrumbTag>Menu Filter*:</CrumbTag>
          {menuTagFilter.map((filter) => (
            <CrumbTag key={filter}>{filter}</CrumbTag>
          ))}
          <CrumbTag onClick={clearMenuTagFilter}>❌</CrumbTag>
        </FilterCrumbs>
      )}

      {cityTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>City</DetailTag>
          <ListRow tripsList={cityTrips} />
        </>
      )}

      {familyTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Familie</DetailTag>
          <ListRow tripsList={familyTrips} />
        </>
      )}

      {sightseeingTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Sightseeing</DetailTag>
          <ListRow tripsList={sightseeingTrips} />
        </>
      )}

      {eventTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Event</DetailTag>
          <ListRow tripsList={eventTrips} />
        </>
      )}

      {landwehrkanalTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Landwehrkanal</DetailTag>
          <ListRow tripsList={landwehrkanalTrips} />
        </>
      )}

      {naturTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Natur</DetailTag>
          <ListRow tripsList={naturTrips} />
        </>
      )}

      {partyTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Party</DetailTag>
          <ListRow tripsList={partyTrips} />
        </>
      )}

      {mueggelseeTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Müggelsee</DetailTag>
          <ListRow tripsList={mueggelseeTrips} />
        </>
      )}

      {fitnessTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Fitness</DetailTag>
          <ListRow tripsList={fitnessTrips} />
        </>
      )}

      {romantikTrips.length > 0 && (
        <>
          <DetailTag onClick={addListTagFilter}>Romantik</DetailTag>
          <ListRow tripsList={romantikTrips} />
        </>
      )}

      {menuTagFilter.length > 0 && (
        <StyledText>
          * Menu Filter können beliebig viele gesetzt werden, um die Suche auf
          den verschiedenen Listen bestmöglich einzugrenzen.
        </StyledText>
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

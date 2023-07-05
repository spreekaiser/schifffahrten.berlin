import Link from "next/link";
import styled from "styled-components";
import StyledListColumn from "../elements/ListColumn";

const FilterCrumbs = styled.div`
  margin: 0 0 0 11%;
  display: flex;
  justify-content: left;
`;

const CrumbTag = styled.h4`
  margin: 0 0 0 3%;
  padding: 1%;
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
  margin: 0 auto 2em auto;
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
      // console.log("menuTagFilter in TripListColumn: ", trips);
    }
    return trips;
  }

  const categoryTrips = filteredTrips(listTagFilter);
  //   console.log("trips in TripListColumn: ", trips);

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
      <FilterCrumbs>
        <CrumbTag>List Filter*:</CrumbTag>
        <CrumbTag>{listTagFilter}</CrumbTag>
        <CrumbTag onClick={clearListTagFilter}>❌</CrumbTag>
      </FilterCrumbs>
      <StyledListColumn>
        {categoryTrips.map((trip) => {
          return (
            <ListItem key={trip._id}>
              <Link href={`/boattrip/${trip._id}`}>
                <BoxImage
                  src={`/images/${trip.imageName}.jpeg`}
                  alt={`${trip.name}`}
                />
                <div>{trip.name}</div>
              </Link>
            </ListItem>
          );
        })}
      </StyledListColumn>
    </>
  );
}

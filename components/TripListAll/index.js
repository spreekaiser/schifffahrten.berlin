import styled from "styled-components";
import StyledListRow from "../elements/ListRow";
import Button from "../elements/Button";
import { useState, useEffect } from "react";

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

export default function TripListAll({ data, riverFilter, tagFilter, onClick }) {
  function filteredTrips(category) {
    let trips = data.filter((trip) => trip.tags.includes(category));
    if (riverFilter.length > 0) {
      for (let i = 0; i < riverFilter.length; i++) {
        console.log("tripsArray before Filter: ", trips);
        trips = trips.filter((element) =>
          element.river.includes(riverFilter[i])
        );
        console.log("tripsArray after Filter: ", trips);
      }

      console.log("trips after for-loop: ", trips);
    } else {
      trips = data.filter((trip) => trip.tags.includes(category));
      console.log("riverFilter in esle: ", trips);
    }
    return trips;
  }
  const cityTrips = filteredTrips("City");
  const familyTrips = filteredTrips("Familie");
  const sightseeingTrips = filteredTrips("Sightseeing");
  const privateTrips = filteredTrips("Privat");

  console.log("data in TripListAll: ", data);
  console.log("cityTrips: ", cityTrips, cityTrips.length);

  function clearRiverFilter() {
    return (riverFilter = []);
    // setRiverFilter([]);
  }

  return (
    <>
      {riverFilter.length > 0 && (
        <>
          <StyledHeadline>Suchergebnisse für:</StyledHeadline>
          <FilterCrumbs>
            <DetailTag onClick={clearRiverFilter}>x</DetailTag>
            {riverFilter.map((filter) => (
              <DetailTag key={filter}>{filter}</DetailTag>
            ))}
          </FilterCrumbs>
        </>
      )}
      {cityTrips.length > 0 && (
        <>
          <DetailTag onClick={onClick}>Berlin City</DetailTag>
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
          <DetailTag onClick={onClick}>Familie</DetailTag>
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
          <DetailTag onClick={onClick}>Sightseeing</DetailTag>
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
          <DetailTag onClick={onClick}>Privat</DetailTag>
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
      <DetailTag onClick={onClick}>-- All Objects --</DetailTag>
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

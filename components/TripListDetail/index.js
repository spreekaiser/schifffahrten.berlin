import styled from "styled-components";
import StyledListColum from "../elements/ListRow";

const StyledHeadline4 = styled.h4`
  margin-left: 3%;
`;

export default function TripListDetail({ data, menuTagFilter, onClick }) {
  //   console.log("TripListDertail: ", menuTagFilter);
  // const filteredList = data.filter((trip)=> trip.);

  return (
    <>
      <StyledHeadline4>{`Alles von der ${menuTagFilter}`}</StyledHeadline4>
      <StyledListColum>
        {/* {data.map((trip) => {
                    
                });} */}
      </StyledListColum>
    </>
  );
}

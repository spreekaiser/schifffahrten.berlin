import styled from "styled-components";
import StyledListColum from "../elements/ListRow";

const StyledHeadline4 = styled.h4`
  margin-left: 3%;
`;

export default function TripListDetail({ data, riverFilter, onClick }) {
  //   console.log("TripListDertail: ", riverFilter);
  // const filteredList = data.filter((trip)=> trip.);

  return (
    <>
      <StyledHeadline4>{`Alles von der ${riverFilter}`}</StyledHeadline4>
      <StyledListColum>
        {/* {data.map((trip) => {
                    
                });} */}
      </StyledListColum>
    </>
  );
}

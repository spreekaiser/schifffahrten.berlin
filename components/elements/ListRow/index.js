import styled from "styled-components";

export default function List({ children }) {
  return <StyledListRow>{children}</StyledListRow>;
}

const StyledListRow = styled.ul`
  margin-bottom: 1em;
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

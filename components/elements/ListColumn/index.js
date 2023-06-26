import styled from "styled-components";

export default function ListColumn({ children }) {
  return <StyledListColumn>{children}</StyledListColumn>;
}

const StyledListColumn = styled.ul`
  margin: 1em 0 1em 0;
  padding: 3%;
  list-style: none;
  display: flex;
  flex-flow: column;
`;

import styled from "styled-components";

export default function ListColumn({ children }) {
  return <StyledListColumn>{children}</StyledListColumn>;
}

const StyledListColumn = styled.ul`
  margin-bottom: 1em;
  padding: 3%;
  list-style: none;
  display: flex;
  flex-flow: column;
`;

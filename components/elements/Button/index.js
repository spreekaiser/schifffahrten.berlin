import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  padding: 0.5em;
`;

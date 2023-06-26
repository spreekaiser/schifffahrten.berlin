import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline;
  color: inherit;
  border: none;
  /* font-size: larger; */
  box-shadow: 0px 1px 5px -2px var(--color-granite);

  &:hover {
    cursor: pointer;
  }

  &:visited {
    color: inherit;
  }
`;

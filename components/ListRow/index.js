import StyledListRow from "../elements/ListRow";
import Link from "next/link";
import styled from "styled-components";

const ListItem = styled.li`
  flex: 0 0 35%;
  max-width: 250px;
`;

const BoxImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export default function ListRow({ tripsList }) {
  return (
    <StyledListRow>
      {tripsList.map((trip) => {
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
    </StyledListRow>
  );
}

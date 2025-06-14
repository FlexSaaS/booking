import styled from "styled-components";
import { getClientConfig } from "../lib/getClientConfig";

interface Props {
  client: ReturnType<typeof getClientConfig>;
}

function Header({ client }: Props) {
  return (
    <Container>
      <h1>{client.name}</h1>
      <p>{client.tagline}</p>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

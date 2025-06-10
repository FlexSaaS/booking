import styled from "styled-components";
import { getClientConfig } from "../lib/getClientConfig";

const client = getClientConfig();

function Header() {
  return (
    <Container>
      <h1>{client.name}</h1>
      <p>{client.tagline}</p>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  text-align: center;
  background-color: white;
  margin: 0;
  padding: 2rem 1rem;

  h1 {
    font-size: 2.5rem;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    margin: 0.5rem 0 0 0;
  }
`;
